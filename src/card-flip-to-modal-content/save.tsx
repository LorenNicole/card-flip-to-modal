/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

import {
	DEFAULT_CUSTOM_MODAL_WIDTH,
	DEFAULT_CLOSE_BUTTON_ARIA_LABEL,
	DEFAULT_CLOSE_BUTTON_TEXT,
	DEFAULT_MODAL_ARIA_LABEL,
	DEFAULT_MODAL_CLOSE_ON_BACKDROP_CLICK,
	DEFAULT_MODAL_LOCK_PAGE_SCROLL,
	DEFAULT_MODAL_SHOW_CLOSE_BUTTON,
	DEFAULT_MODAL_SIZE,
	type ModalSizeValue,
	getBooleanDataAttribute,
	getModalSizeClassName,
	getModalWidthStyle,
	getSafeCloseButtonAriaLabel,
	getSafeCloseButtonText,
	getSafeCustomModalWidth,
	getSafeModalAriaLabel,
} from '../card-flip-to-modal/constants';

interface SaveAttributes {
	modalSize?: ModalSizeValue;
	customModalWidth?: string;
	modalAriaLabel?: string;
	modalCloseOnBackdropClick?: boolean;
	modalShowCloseButton?: boolean;
	modalLockPageScroll?: boolean;
	closeButtonText?: string;
	closeButtonAriaLabel?: string;
}

interface SaveProps {
	attributes: SaveAttributes;
}

export default function save( { attributes }: SaveProps ) {
	const {
		modalSize = DEFAULT_MODAL_SIZE,
		customModalWidth = DEFAULT_CUSTOM_MODAL_WIDTH,
		modalAriaLabel = DEFAULT_MODAL_ARIA_LABEL,
		modalCloseOnBackdropClick = DEFAULT_MODAL_CLOSE_ON_BACKDROP_CLICK,
		modalShowCloseButton = DEFAULT_MODAL_SHOW_CLOSE_BUTTON,
		modalLockPageScroll = DEFAULT_MODAL_LOCK_PAGE_SCROLL,
		closeButtonText = DEFAULT_CLOSE_BUTTON_TEXT,
		closeButtonAriaLabel = DEFAULT_CLOSE_BUTTON_ARIA_LABEL,
	} = attributes;

	const safeCustomModalWidth = getSafeCustomModalWidth( customModalWidth );
	const safeModalAriaLabel = getSafeModalAriaLabel( modalAriaLabel );
	const safeCloseButtonText = getSafeCloseButtonText( closeButtonText );
	const safeCloseButtonAriaLabel =
		getSafeCloseButtonAriaLabel( closeButtonAriaLabel );
	
	const blockProps = useBlockProps.save( {
		className: getModalSizeClassName( modalSize ),
		style: getModalWidthStyle( modalSize, safeCustomModalWidth ),
		'data-modal-close-on-backdrop-click':
			getBooleanDataAttribute( modalCloseOnBackdropClick ),
		'data-modal-show-close-button':
			getBooleanDataAttribute( modalShowCloseButton ),
		'data-modal-lock-page-scroll':
			getBooleanDataAttribute( modalLockPageScroll ),
	} );


	return (
		<div { ...blockProps }>
			<div className="gb-flip-card-modal__backdrop" hidden></div>

			<div
				className="gb-flip-card-modal__dialog"
				role="dialog"
				aria-modal="true"
				aria-label={ safeModalAriaLabel }
				tabIndex={ -1 }
				hidden
			>
				<button
					className="gb-flip-card-modal__close"
					type="button"
					aria-label={ safeCloseButtonAriaLabel }
				>
					{ safeCloseButtonText }
				</button>

				<div className="gb-flip-card-modal__content">
					<InnerBlocks.Content />
				</div>
			</div>
		</div>
	);
}