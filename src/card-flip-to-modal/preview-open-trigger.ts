import { getSafePreviewOpenElementId } from './constants';

const NATIVE_OPEN_CONTROL_SELECTOR = 'button, summary, input, select, textarea';
const LINK_SELECTOR = 'a[href]';
const HEADING_SELECTOR = 'h1, h2, h3, h4, h5, h6';
const BUTTON_BLOCK_LINK_SELECTOR = ':scope > .wp-block-button__link';

export const PREVIEW_OPEN_TRIGGER_CLASS = 'gb-flip-card-modal__open-trigger';

/**
 * Escapes an HTML ID for use in a CSS selector.
 *
 * IDs are already limited to [A-Za-z][\w:.-]*; colons and dots still have
 * special meaning in querySelector.
 *
 * @param htmlId Sanitized HTML ID.
 * @return Selector-safe ID fragment.
 */
function escapeHtmlIdForSelector( htmlId: string ): string {
	if ( typeof CSS !== 'undefined' && typeof CSS.escape === 'function' ) {
		return CSS.escape( htmlId );
	}

	return htmlId.replace( /([^\w-])/g, '\\$1' );
}

/**
 * Resolves the element that should open the modal for a preview card.
 *
 * Empty, invalid, or missing IDs do not open the modal. Lookup is scoped to
 * this preview so another card cannot steal the trigger.
 *
 * @param preview Preview card element.
 * @return Trigger element inside the preview, or null when none is found.
 */
export function getPreviewOpenTrigger(
	preview: HTMLElement
): HTMLElement | null {
	const openElementId = getSafePreviewOpenElementId(
		preview.getAttribute( 'data-modal-open-element-id' )
	);

	if ( ! openElementId ) {
		return null;
	}

	const matched = preview.querySelector< HTMLElement >(
		`#${ escapeHtmlIdForSelector( openElementId ) }`
	);

	if ( ! matched ) {
		return null;
	}

	return resolveButtonBlockTrigger( matched );
}

/**
 * Uses the inner control when the HTML anchor is on a Button block wrapper.
 *
 * core/button writes the anchor id on `div.wp-block-button`, not on the
 * `<button>`. Binding the wrapper would add a second tab stop beside the
 * real control. A wrapper with more than one direct button link stays the
 * trigger so this does not guess among several controls.
 *
 * @param element Element that carries the open-element id.
 * @return Inner button link, or the original element.
 */
function resolveButtonBlockTrigger( element: HTMLElement ): HTMLElement {
	if ( isNativeOpenControl( element ) || isHeadingTrigger( element ) ) {
		return element;
	}

	const controls = element.querySelectorAll< HTMLElement >(
		BUTTON_BLOCK_LINK_SELECTOR
	);

	if ( controls.length === 1 ) {
		return controls[ 0 ];
	}

	return element;
}

/**
 * Whether the trigger is a native control that already activates on click.
 *
 * @param trigger Candidate open trigger.
 * @return True when role="button" and tabindex should not be added.
 */
export function isNativeOpenControl( trigger: HTMLElement ): boolean {
	return (
		trigger.matches( NATIVE_OPEN_CONTROL_SELECTOR ) ||
		trigger.matches( LINK_SELECTOR )
	);
}

/**
 * Whether the trigger is a heading.
 *
 * Headings must not receive role="button", which would replace their heading
 * role in the accessibility tree.
 *
 * @param trigger Candidate open trigger.
 * @return True when the element is h1–h6.
 */
export function isHeadingTrigger( trigger: HTMLElement ): boolean {
	return trigger.matches( HEADING_SELECTOR );
}

/**
 * Removes wrapper button semantics and, when a trigger exists, prepares it.
 *
 * @param preview Preview card wrapper.
 * @param trigger Resolved open trigger, or null when the modal should not open.
 */
export function preparePreviewOpenTrigger(
	preview: HTMLElement,
	trigger: HTMLElement | null
): void {
	preview.removeAttribute( 'role' );
	preview.removeAttribute( 'tabindex' );
	preview.removeAttribute( 'aria-haspopup' );
	preview.removeAttribute( 'aria-expanded' );
	preview.removeAttribute( 'aria-controls' );

	if ( ! trigger ) {
		return;
	}

	trigger.classList.add( PREVIEW_OPEN_TRIGGER_CLASS );
	trigger.setAttribute( 'aria-haspopup', 'dialog' );
	trigger.setAttribute( 'aria-expanded', 'false' );

	if ( isNativeOpenControl( trigger ) ) {
		return;
	}

	trigger.setAttribute( 'tabindex', '0' );

	if ( ! isHeadingTrigger( trigger ) ) {
		trigger.setAttribute( 'role', 'button' );
	}
}

/**
 * Whether this keydown should open the modal on the trigger.
 *
 * Native buttons already fire click on Enter/Space. Links fire click on Enter
 * but not Space.
 *
 * @param trigger Open trigger.
 * @param event   Keydown event.
 * @return True when the view script should open the modal.
 */
export function shouldHandleOpenKeydown(
	trigger: HTMLElement,
	event: KeyboardEvent
): boolean {
	if ( event.key !== 'Enter' && event.key !== ' ' ) {
		return false;
	}

	const isNativeButton = trigger.matches( NATIVE_OPEN_CONTROL_SELECTOR );
	const isLink = trigger.matches( LINK_SELECTOR );

	if ( event.key === ' ' ) {
		return ! isNativeButton;
	}

	return ! isNativeButton && ! isLink;
}

/**
 * Whether the open click should prevent the browser default (link navigation).
 *
 * @param trigger Open trigger.
 * @return True for links with an href.
 */
export function shouldPreventOpenClickDefault( trigger: HTMLElement ): boolean {
	return trigger.matches( LINK_SELECTOR );
}
