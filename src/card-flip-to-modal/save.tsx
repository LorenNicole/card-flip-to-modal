/**
 * WordPress dependencies
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

import {
	type ModalSizeValue,
	getModalSizeClassName,
	getModalWidthStyle,
	getSafeCustomModalWidth,
	getPreviewCardClassNames,
	getPreviewCardStyle,
	getSafeModalAriaLabel,
	getBooleanDataAttribute,
	DEFAULT_PREVIEW_MIN_HEIGHT,
	DEFAULT_PREVIEW_BACKGROUND_COLOR,
	DEFAULT_PREVIEW_BORDER_COLOR,
	DEFAULT_PREVIEW_TEXT_COLOR,
	DEFAULT_MODAL_CLOSE_ON_BACKDROP_CLICK,
	DEFAULT_MODAL_LOCK_PAGE_SCROLL,
	DEFAULT_MODAL_SHOW_CLOSE_BUTTON,
	DEFAULT_CUSTOM_MODAL_WIDTH,
	DEFAULT_MODAL_SIZE,
	DEFAULT_MODAL_ARIA_LABEL,
} from './constants';

interface SaveAttributes {
	modalSize?: ModalSizeValue;
	customModalWidth?: string;
	previewMinHeight?: number;
	previewHasShadow?: boolean;
	previewHasHoverLift?: boolean;
	previewBackgroundColor?: string;
	previewBorderColor?: string;
	previewTextColor?: string;
	modalCloseOnBackdropClick?: boolean;
	modalShowCloseButton?: boolean;
	modalLockPageScroll?: boolean;
	modalAriaLabel?: string;
}

interface SaveProps {
	attributes: SaveAttributes;
}

/**
 * Saves the parent block wrapper.
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 * The preview and modal content are saved by the child blocks.
 */
export default function save( { attributes }: SaveProps ) {
	const {
		modalSize = DEFAULT_MODAL_SIZE,
		customModalWidth = DEFAULT_CUSTOM_MODAL_WIDTH,
		previewMinHeight = DEFAULT_PREVIEW_MIN_HEIGHT,
		previewHasShadow = true,
		previewHasHoverLift = true,
		previewBackgroundColor = DEFAULT_PREVIEW_BACKGROUND_COLOR,
		previewBorderColor = DEFAULT_PREVIEW_BORDER_COLOR,
		previewTextColor = DEFAULT_PREVIEW_TEXT_COLOR,
		modalCloseOnBackdropClick = DEFAULT_MODAL_CLOSE_ON_BACKDROP_CLICK,
		modalShowCloseButton = DEFAULT_MODAL_SHOW_CLOSE_BUTTON,
		modalLockPageScroll = DEFAULT_MODAL_LOCK_PAGE_SCROLL,
		modalAriaLabel = DEFAULT_MODAL_ARIA_LABEL,
	} = attributes;

	const safeCustomModalWidth =
		getSafeCustomModalWidth( customModalWidth );

	const safeModalAriaLabel = getSafeModalAriaLabel( modalAriaLabel );

	const blockProps = useBlockProps.save( {
		className: [
			'gb-flip-card-modal',
			getModalSizeClassName( modalSize ),
			...getPreviewCardClassNames( {
				previewHasShadow,
				previewHasHoverLift,
			} ),
		].join( ' ' ),
		style: {
			...getModalWidthStyle( modalSize, safeCustomModalWidth ),
			...getPreviewCardStyle( {
				previewMinHeight,
				previewBackgroundColor,
				previewBorderColor,
				previewTextColor,
			} ),
		},
		'data-modal-close-on-backdrop-click': getBooleanDataAttribute(
			modalCloseOnBackdropClick
		),
		'data-modal-show-close-button': getBooleanDataAttribute(
			modalShowCloseButton
		),
		'data-modal-lock-page-scroll': getBooleanDataAttribute(
			modalLockPageScroll
		),
		'aria-label': safeModalAriaLabel,
} );

	return (
		<div { ...blockProps }>
			<InnerBlocks.Content />
		</div>
	);
}