/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.ts"
 * }
 * ```
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

/**
 * Front-end behavior for Card Flip to Modal.
 *
 * Stage B/C:
 * - Opens modal when preview card is clicked.
 * - Opens modal with Enter or Space when preview card has focus.
 * - Closes modal with close button.
 * - Closes modal with Escape.
 * - Does not close on backdrop click.
 * - Allows only one modal open at a time.
 * - Locks page scroll while modal is open.
 * - Returns focus to the preview card when closed.
 */

import { modalFocus } from './modal-focus';

import {
	DEFAULT_FLIP_ANIMATION_DURATION_MS,
	DEFAULT_FLIP_ANIMATION_ENABLED,
	DEFAULT_MODAL_ARIA_LABEL,
	getSafeFlipAnimationDuration,
	getSafeModalAriaLabel,
} from './constants';

const BLOCK_SELECTOR = '.wp-block-fun-gutenberg-blocks-card-flip-to-modal';
const OPEN_CLASS = 'gb-flip-card-modal--is-open';
const BODY_LOCK_CLASS = 'gb-flip-card-modal-lock-scroll';

const PREVIEW_FLIPPED_CLASS = 'gb-flip-card-modal__preview--flipped-open';
const ANIMATION_CLONE_CLASS = 'gb-flip-card-modal__animation-clone';
const ANIMATION_INNER_CLASS = 'gb-flip-card-modal__animation-inner';
const ANIMATION_FRONT_CLASS = 'gb-flip-card-modal__animation-front';
const ANIMATION_BACK_CLASS = 'gb-flip-card-modal__animation-back';
const ANIMATION_BACK_CONTENT_CLASS = 'gb-flip-card-modal__animation-back-content';

let activeBlock: HTMLElement | null = null;
let activeTrigger: HTMLElement | null = null;
let isAnimating = false;

interface BlockParts {
	preview: HTMLElement | null;
	backdrop: HTMLElement | null;
	dialog: HTMLElement | null;
	closeButton: HTMLButtonElement | null;
}

interface BlockSettings {
	modalCloseOnBackdropClick: boolean;
	modalShowCloseButton: boolean;
	modalLockPageScroll: boolean;
	modalAriaLabel: string;
	flipAnimationEnabled: boolean;
	flipAnimationDuration: number;
}

interface AnimationRect {
	top: number;
	left: number;
	width: number;
	height: number;
}

function shouldReduceMotion(): boolean {
	return window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;
}

function getNumberDataAttribute(
	element: HTMLElement,
	attributeName: string,
	defaultValue: number
): number {
	const value = element.dataset[ attributeName ];

	if ( typeof value !== 'string' ) {
		return defaultValue;
	}

	return getSafeFlipAnimationDuration( value );
}

function getRectFromElement( element: HTMLElement ): AnimationRect {
	const rect = element.getBoundingClientRect();

	return {
		top: rect.top,
		left: rect.left,
		width: rect.width,
		height: rect.height,
	};
}

function getFinalModalRect( dialog: HTMLElement ): AnimationRect {
	const wasHidden = dialog.hidden;
	const previousVisibility = dialog.style.visibility;
	const previousPointerEvents = dialog.style.pointerEvents;

	if ( wasHidden ) {
		dialog.hidden = false;
	}

	dialog.style.visibility = 'hidden';
	dialog.style.pointerEvents = 'none';

	const rect = dialog.getBoundingClientRect();

	const finalRect = {
		top: rect.top,
		left: rect.left,
		width: rect.width,
		height: rect.height,
	};

	dialog.style.visibility = previousVisibility;
	dialog.style.pointerEvents = previousPointerEvents;

	if ( wasHidden ) {
		dialog.hidden = true;
	}

	return finalRect;
}

function fadeOutAndRemoveClone( clone: HTMLElement ): Promise< void > {
	const fadeAnimation = clone.animate(
		[
			{
				opacity: '1',
			},
			{
				opacity: '0',
			},
		],
		{
			duration: 120,
			easing: 'ease-out',
			fill: 'forwards',
		}
	);

	return fadeAnimation.finished.then( () => {
		clone.remove();
	} );
}

function createAnimationClone(
	block: HTMLElement,
	preview: HTMLElement,
	startRect: AnimationRect,
	settings: BlockSettings
): HTMLElement {
	const clone = document.createElement( 'div' );
	const inner = document.createElement( 'div' );
	const front = document.createElement( 'div' );
	const back = document.createElement( 'div' );
	const backCloseButton = document.createElement( 'button' );
	const backContent = document.createElement( 'div' );

	const modalContent = block.querySelector< HTMLElement >(
		'.gb-flip-card-modal__content'
	);

	clone.className = ANIMATION_CLONE_CLASS;
	inner.className = ANIMATION_INNER_CLASS;
	front.className = ANIMATION_FRONT_CLASS;
	back.className = ANIMATION_BACK_CLASS;
	backContent.className = ANIMATION_BACK_CONTENT_CLASS;
	backCloseButton.className = 'gb-flip-card-modal__animation-close';
	backCloseButton.type = 'button';
	backCloseButton.setAttribute( 'aria-hidden', 'true' );
	backCloseButton.tabIndex = -1;
	backCloseButton.textContent = '×';

	front.innerHTML = preview.innerHTML;
	copyPreviewTypographyStyles( preview, front );

	if ( modalContent ) {
		backContent.innerHTML = modalContent.innerHTML;
	} else {
		backContent.textContent = 'Back';
	}

	if ( settings.modalShowCloseButton ) {
		back.append( backCloseButton );
	}
	
	back.append( backContent );	inner.append( front, back );

	clone.append( inner );

	clone.style.top = `${ startRect.top }px`;
	clone.style.left = `${ startRect.left }px`;
	clone.style.width = `${ startRect.width }px`;
	clone.style.height = `${ startRect.height }px`;

	const previewStyles = window.getComputedStyle( preview );

	clone.style.setProperty(
		'--gb-flip-card-animation-background-color',
		previewStyles.backgroundColor
	);

	clone.style.setProperty(
		'--gb-flip-card-animation-border-color',
		previewStyles.borderColor
	);

	clone.style.setProperty(
		'--gb-flip-card-animation-text-color',
		previewStyles.color
	);

	document.body.appendChild( clone );

	return clone;
}

function copyPreviewTypographyStyles(
	source: HTMLElement,
	target: HTMLElement
): void {
	const sourceStyles = window.getComputedStyle( source );

	target.style.fontFamily = sourceStyles.fontFamily;
	target.style.fontSize = sourceStyles.fontSize;
	target.style.fontWeight = sourceStyles.fontWeight;
	target.style.lineHeight = sourceStyles.lineHeight;
	target.style.letterSpacing = sourceStyles.letterSpacing;
	target.style.textAlign = sourceStyles.textAlign;
}

function animateClone(
	clone: HTMLElement,
	fromRect: AnimationRect,
	toRect: AnimationRect,
	direction: 'open' | 'close',
	duration: number
): Promise< void > {
	const inner = clone.querySelector< HTMLElement >(
		`.${ ANIMATION_INNER_CLASS }`
	);

	const backContent = clone.querySelector< HTMLElement >(
		`.${ ANIMATION_BACK_CONTENT_CLASS }`
	);

	if ( ! inner ) {
		return Promise.resolve();
	}

	clone.style.top = `${ fromRect.top }px`;
	clone.style.left = `${ fromRect.left }px`;
	clone.style.width = `${ fromRect.width }px`;
	clone.style.height = `${ fromRect.height }px`;

	const cloneAnimation = clone.animate(
		[
			{
				top: `${ fromRect.top }px`,
				left: `${ fromRect.left }px`,
				width: `${ fromRect.width }px`,
				height: `${ fromRect.height }px`,
			},
			{
				top: `${ toRect.top }px`,
				left: `${ toRect.left }px`,
				width: `${ toRect.width }px`,
				height: `${ toRect.height }px`,
			},
		],
		{
			duration,
			easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
			fill: 'forwards',
		}
	);

	const flipAnimation = inner.animate(
		[
			{
				transform:
					direction === 'open'
						? 'rotateY(0deg)'
						: 'rotateY(-180deg)',
			},
			{
				transform:
					direction === 'open'
						? 'rotateY(-180deg)'
						: 'rotateY(0deg)',
			},
		],
		{
			duration,
			easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
			fill: 'forwards',
		}
	);

	const animations: Promise< Animation >[] = [
		cloneAnimation.finished,
		flipAnimation.finished,
	];

	if ( backContent ) {
		const contentKeyframes =
			direction === 'open'
				? [
						{
							offset: 0,
							opacity: '0',
							transform: 'scale(0.68) translateY(16px)',
						},
						{
							offset: 0.42,
							opacity: '0',
							transform: 'scale(0.74) translateY(12px)',
						},
						{
							offset: 1,
							opacity: '1',
							transform: 'scale(1) translateY(0)',
						},
				  ]
				: [
						{
							offset: 0,
							opacity: '1',
							transform: 'scale(1) translateY(0)',
						},
						{
							offset: 0.58,
							opacity: '0',
							transform: 'scale(0.74) translateY(12px)',
						},
						{
							offset: 1,
							opacity: '0',
							transform: 'scale(0.68) translateY(16px)',
						},
				  ];
	
		const contentAnimation = backContent.animate( contentKeyframes, {
			duration,
			easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
			fill: 'forwards',
		} );
	
		animations.push( contentAnimation.finished );
	}

	return Promise.all( animations ).then( () => undefined );
}

function getBooleanDataAttribute(
	element: HTMLElement,
	attributeName: string,
	defaultValue: boolean
): boolean {
	const value = element.dataset[ attributeName ];

	if ( value === 'true' ) {
		return true;
	}

	if ( value === 'false' ) {
		return false;
	}

	return defaultValue;
}

function getModalAriaLabel( block: HTMLElement ): string {
	const dialog = block.querySelector< HTMLElement >(
		'.gb-flip-card-modal__dialog'
	);

	if ( dialog ) {
		const fromDialog =
			dialog.getAttribute( 'aria-label' ) ||
			dialog.dataset.modalAriaLabel;

		if ( fromDialog ) {
			return getSafeModalAriaLabel( fromDialog );
		}
	}

	// Legacy: label stored on parent before attribute move
	const fromParent =
		block.getAttribute( 'aria-label' ) ||
		block.dataset.modalAriaLabel;

	return getSafeModalAriaLabel( fromParent || DEFAULT_MODAL_ARIA_LABEL );
}

function getModalBehaviorSettingsElement( block: HTMLElement ): HTMLElement {
	const contentBlock = block.querySelector< HTMLElement >(
		'.wp-block-fun-gutenberg-blocks-card-flip-to-modal-content'
	);

	if ( ! contentBlock ) {
		return block;
	}

	const hasBehaviorOnContent =
		contentBlock.dataset.modalCloseOnBackdropClick !== undefined ||
		contentBlock.dataset.modalShowCloseButton !== undefined ||
		contentBlock.dataset.modalLockPageScroll !== undefined;

	return hasBehaviorOnContent ? contentBlock : block;
}

function getBlockSettings( block: HTMLElement ): BlockSettings {
	const behaviorElement = getModalBehaviorSettingsElement( block );

	return {
		modalCloseOnBackdropClick: getBooleanDataAttribute(
			behaviorElement,
			'modalCloseOnBackdropClick',
			false
		),
		modalShowCloseButton: getBooleanDataAttribute(
			behaviorElement,
			'modalShowCloseButton',
			true
		),
		modalLockPageScroll: getBooleanDataAttribute(
			behaviorElement,
			'modalLockPageScroll',
			true
		),
		modalAriaLabel: getModalAriaLabel( block ),
		flipAnimationEnabled: getBooleanDataAttribute(
			block,
			'flipAnimationEnabled',
			DEFAULT_FLIP_ANIMATION_ENABLED
		),
		flipAnimationDuration: getNumberDataAttribute(
			block,
			'flipAnimationDuration',
			DEFAULT_FLIP_ANIMATION_DURATION_MS
		),
	};
}

function getBlockParts( block: HTMLElement ): BlockParts {
	return {
		preview: block.querySelector< HTMLElement >(
			'.gb-flip-card-modal__preview'
		),
		backdrop: block.querySelector< HTMLElement >(
			'.gb-flip-card-modal__backdrop'
		),
		dialog: block.querySelector< HTMLElement >(
			'.gb-flip-card-modal__dialog'
		),
		closeButton: block.querySelector< HTMLButtonElement >(
			'.gb-flip-card-modal__close'
		),
	};
}

function lockPageScroll(): void {
	document.body.classList.add( BODY_LOCK_CLASS );
}

function unlockPageScroll(): void {
	document.body.classList.remove( BODY_LOCK_CLASS );
}

function closeModal( block: HTMLElement | null = activeBlock ): void {
	if ( ! block || isAnimating ) {
		return;
	}

	const settings = getBlockSettings( block );
	const { preview, backdrop, dialog } = getBlockParts( block );

	if ( ! preview || ! backdrop || ! dialog ) {
		block.classList.remove( OPEN_CLASS );

		if ( settings.modalLockPageScroll ) {
			unlockPageScroll();
		}

		activeBlock = null;
		activeTrigger = null;

		return;
	}

	const safePreview = preview;
	const safeBackdrop = backdrop;
	const safeDialog = dialog;
	const safeBlock = block;

	function finishClose(): void {
		safeBlock.classList.remove( OPEN_CLASS );
		safePreview.setAttribute( 'aria-expanded', 'false' );
		safePreview.classList.remove( PREVIEW_FLIPPED_CLASS );

		safeBackdrop.hidden = true;
		safeDialog.hidden = true;

		if ( settings.modalLockPageScroll ) {
			unlockPageScroll();
		}

		if ( activeTrigger ) {
			activeTrigger.focus();
		}

		if ( safeBlock === activeBlock ) {
			activeBlock = null;
			activeTrigger = null;
		}
	}

	if ( shouldReduceMotion() || ! settings.flipAnimationEnabled ) {
		finishClose();
		return;
	}

	isAnimating = true;

	const startRect = getFinalModalRect( safeDialog );
	const finalRect = getRectFromElement( safePreview );
	const clone = createAnimationClone( safeBlock, safePreview, startRect, settings );

	safeDialog.hidden = true;

	animateClone(
		clone,
		startRect,
		finalRect,
		'close',
		settings.flipAnimationDuration
	)
		.then( () => {
			finishClose();
	
			return new Promise< void >( ( resolve ) => {
				window.requestAnimationFrame( () => {
					fadeOutAndRemoveClone( clone ).then( resolve );
				} );
			} );
		} )
		.finally( () => {
			isAnimating = false;
		} );
}

function closeAnyOpenModal(): void {
	if ( activeBlock ) {
		closeModal( activeBlock );
	}
}

function openModal( block: HTMLElement, trigger?: HTMLElement ): void {
	const { preview, backdrop, dialog, closeButton } = getBlockParts( block );
	const settings = getBlockSettings( block );

	if ( ! preview || ! backdrop || ! dialog || isAnimating ) {
		return;
	}

	closeAnyOpenModal();

	activeBlock = block;
	activeTrigger = trigger || preview;

	block.classList.add( OPEN_CLASS );
	preview.setAttribute( 'aria-expanded', 'true' );
	dialog.setAttribute( 'aria-label', settings.modalAriaLabel );

	backdrop.hidden = false;
	dialog.hidden = true;

	if ( settings.modalLockPageScroll ) {
		lockPageScroll();
	}

	if ( shouldReduceMotion() || ! settings.flipAnimationEnabled ) {
		dialog.hidden = false;

		if ( settings.modalShowCloseButton && closeButton ) {
			closeButton.focus();
			return;
		}

		dialog.setAttribute( 'tabindex', '-1' );
		dialog.focus();
		return;
	}

	isAnimating = true;
	preview.classList.add( PREVIEW_FLIPPED_CLASS );

	const startRect = getRectFromElement( preview );
	const finalRect = getFinalModalRect( dialog );
	const clone = createAnimationClone( block, preview, startRect, settings );

	animateClone( clone, startRect, finalRect, 'open', settings.flipAnimationDuration )
		.then( () => {
			dialog.style.opacity = '0';
			dialog.hidden = false;
			
			window.requestAnimationFrame( () => {
				dialog.style.opacity = '';
				clone.remove();
			} );

			if ( settings.modalShowCloseButton && closeButton ) {
				closeButton.focus();
				return;
			}

			dialog.setAttribute( 'tabindex', '-1' );
			dialog.focus();
		} )
		.finally( () => {
			isAnimating = false;
		} );
}

function handlePreviewKeydown(
	event: KeyboardEvent,
	block: HTMLElement,
	preview: HTMLElement
): void {
	if ( event.key !== 'Enter' && event.key !== ' ' ) {
		return;
	}

	event.preventDefault();
	openModal( block, preview );
}

function handleDocumentKeydown( event: KeyboardEvent ): void {
	if ( ! activeBlock ) {
		return;
	}

	if ( event.key === 'Escape' ) {
		closeModal( activeBlock );
		return;
	}

	const { dialog, closeButton } = getBlockParts( activeBlock );
	const settings = getBlockSettings( activeBlock );

	modalFocus( 
		event, 
		dialog, 
		settings.modalShowCloseButton ? closeButton : dialog
	);
}

function initCardFlipToModalBlock( block: HTMLElement ): void {
	const { preview, closeButton, backdrop } = getBlockParts( block );
	const settings = getBlockSettings( block );

	if ( ! preview ) {
		return;
	}

	preview.addEventListener( 'click', () => {
		openModal( block, preview );
	} );

	preview.addEventListener( 'keydown', ( event ) => {
		handlePreviewKeydown( event, block, preview );
	} );

	// The close button lives inside this block's modal,
	// but it is still part of the same block instance.
	if ( closeButton ) {
		closeButton.addEventListener( 'click', () => {
			closeModal( block );
		} );
	}

	if ( backdrop && settings.modalCloseOnBackdropClick ) {
		backdrop.addEventListener( 'click', () => {
			closeModal( block );
		} );
	}
}

document.addEventListener( 'DOMContentLoaded', () => {
	document
		.querySelectorAll< HTMLElement >( BLOCK_SELECTOR )
		.forEach( initCardFlipToModalBlock );

	document.addEventListener( 'keydown', handleDocumentKeydown );
} );