/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

import {
	DEFAULT_CUSTOM_MODAL_WIDTH,
	DEFAULT_CLOSE_BUTTON_ARIA_LABEL,
	DEFAULT_CLOSE_BUTTON_BACKGROUND_COLOR,
	DEFAULT_CLOSE_BUTTON_BORDER_COLOR,
	DEFAULT_CLOSE_BUTTON_BORDER_RADIUS,
	DEFAULT_CLOSE_BUTTON_POSITION,
	DEFAULT_CLOSE_BUTTON_SIZE,
	DEFAULT_CLOSE_BUTTON_TEXT,
	DEFAULT_CLOSE_BUTTON_TEXT_COLOR,
	DEFAULT_MODAL_ARIA_LABEL,
	DEFAULT_MODAL_BACKGROUND_COLOR,
	DEFAULT_MODAL_BORDER_COLOR,
	DEFAULT_MODAL_BORDER_RADIUS,
	DEFAULT_MODAL_BORDER_STYLE,
	DEFAULT_MODAL_BORDER_WIDTH,
	DEFAULT_MODAL_CLOSE_ON_BACKDROP_CLICK,
	DEFAULT_MODAL_LOCK_PAGE_SCROLL,
	DEFAULT_MODAL_SIZE,
	type BorderStyleValue,
	type CloseButtonPositionValue,
	type ModalSizeValue,
	getBooleanDataAttribute,
	getCloseButtonStyle,
	getModalShellStyle,
	getModalSizeClassName,
	getModalMarginSides,
	getModalPaddingSides,
	getSafeBorderStyle,
	getSafeCloseButtonAriaLabel,
	getSafeCloseButtonPosition,
	getSafeCloseButtonText,
	getSafeCustomModalWidth,
	getSafeModalAriaLabel,
	type ModalSpacingAttributes,
} from '../card-flip-to-modal/constants';
import { ModalCloseButton } from '../card-flip-to-modal/close-button';

interface SaveAttributes extends ModalSpacingAttributes {
	modalSize?: ModalSizeValue;
	customModalWidth?: string;
	modalBorderRadius?: number;
	modalBorderStyle?: BorderStyleValue;
	modalBorderColor?: string;
	modalBorderWidth?: number;
	modalBackgroundColor?: string;
	modalAriaLabel?: string;
	modalCloseOnBackdropClick?: boolean;
	modalLockPageScroll?: boolean;
	closeButtonText?: string;
	closeButtonAriaLabel?: string;
	closeButtonPosition?: CloseButtonPositionValue;
	closeButtonSize?: number;
	closeButtonBackgroundColor?: string;
	closeButtonTextColor?: string;
	closeButtonBorderColor?: string;
	closeButtonBorderRadius?: number;
}

interface SaveProps {
	attributes: SaveAttributes;
}

export default function save( { attributes }: SaveProps ) {
	const {
		modalSize = DEFAULT_MODAL_SIZE,
		customModalWidth = DEFAULT_CUSTOM_MODAL_WIDTH,
		modalBorderRadius = DEFAULT_MODAL_BORDER_RADIUS,
		modalBorderStyle = DEFAULT_MODAL_BORDER_STYLE,
		modalBorderColor = DEFAULT_MODAL_BORDER_COLOR,
		modalBorderWidth = DEFAULT_MODAL_BORDER_WIDTH,
		modalBackgroundColor = DEFAULT_MODAL_BACKGROUND_COLOR,
		modalAriaLabel = DEFAULT_MODAL_ARIA_LABEL,
		modalCloseOnBackdropClick = DEFAULT_MODAL_CLOSE_ON_BACKDROP_CLICK,
		modalLockPageScroll = DEFAULT_MODAL_LOCK_PAGE_SCROLL,
		closeButtonText = DEFAULT_CLOSE_BUTTON_TEXT,
		closeButtonAriaLabel = DEFAULT_CLOSE_BUTTON_ARIA_LABEL,
		closeButtonPosition = DEFAULT_CLOSE_BUTTON_POSITION,
		closeButtonSize = DEFAULT_CLOSE_BUTTON_SIZE,
		closeButtonBackgroundColor = DEFAULT_CLOSE_BUTTON_BACKGROUND_COLOR,
		closeButtonTextColor = DEFAULT_CLOSE_BUTTON_TEXT_COLOR,
		closeButtonBorderColor = DEFAULT_CLOSE_BUTTON_BORDER_COLOR,
		closeButtonBorderRadius = DEFAULT_CLOSE_BUTTON_BORDER_RADIUS,
	} = attributes;

	const modalPaddingSides = getModalPaddingSides( attributes );
	const modalMarginSides = getModalMarginSides( attributes );

	const safeCustomModalWidth = getSafeCustomModalWidth( customModalWidth );
	const safeModalBorderStyle = getSafeBorderStyle(
		modalBorderStyle,
		DEFAULT_MODAL_BORDER_STYLE
	);
	const safeModalAriaLabel = getSafeModalAriaLabel( modalAriaLabel );
	const safeCloseButtonText = getSafeCloseButtonText( closeButtonText );
	const safeCloseButtonAriaLabel =
		getSafeCloseButtonAriaLabel( closeButtonAriaLabel );
	const safeCloseButtonPosition =
		getSafeCloseButtonPosition( closeButtonPosition );
	const closeButtonStyle = getCloseButtonStyle( {
		closeButtonSize,
		closeButtonBackgroundColor,
		closeButtonTextColor,
		closeButtonBorderColor,
		closeButtonBorderRadius,
	} );
	
	const blockProps = useBlockProps.save( {
		className: [
			'gb-flip-card-modal__content-root',
			getModalSizeClassName( modalSize ),
		].join( ' ' ),
		style: getModalShellStyle( {
			modalSize,
			customModalWidth: safeCustomModalWidth,
			modalBorderRadius,
			modalBorderStyle: safeModalBorderStyle,
			modalBorderColor,
			modalBorderWidth,
			modalBackgroundColor,
			modalPadding: modalPaddingSides,
			modalMargin: modalMarginSides,
		} ),
		'data-modal-close-on-backdrop-click':
			getBooleanDataAttribute( modalCloseOnBackdropClick ),
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
				<ModalCloseButton
					closeButtonPosition={ safeCloseButtonPosition }
					text={ safeCloseButtonText }
					ariaLabel={ safeCloseButtonAriaLabel }
					style={ closeButtonStyle }
				/>

				<div className="gb-flip-card-modal__content">
					<InnerBlocks.Content />
				</div>
			</div>
		</div>
	);
}