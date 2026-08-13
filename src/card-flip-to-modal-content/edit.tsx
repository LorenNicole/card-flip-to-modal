/**
 * WordPress dependencies
 */
import {
	InspectorControls,
	InnerBlocks,
	useBlockProps,
} from '@wordpress/block-editor';

import {
	Notice,
	PanelBody,
	RangeControl,
	SelectControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';

import {
	BORDER_STYLE_OPTIONS,
	CARD_MODAL_BORDER_RADIUS_STEP,
	CARD_MODAL_BORDER_WIDTH_STEP,
	CLOSE_BUTTON_BORDER_RADIUS_STEP,
	CLOSE_BUTTON_POSITION_OPTIONS,
	CLOSE_BUTTON_SIZE_STEP,
	DEFAULT_CLOSE_BUTTON_BACKGROUND_COLOR,
	DEFAULT_CLOSE_BUTTON_BORDER_COLOR,
	DEFAULT_CLOSE_BUTTON_BORDER_RADIUS,
	DEFAULT_CLOSE_BUTTON_POSITION,
	DEFAULT_CLOSE_BUTTON_SIZE,
	DEFAULT_CLOSE_BUTTON_TEXT_COLOR,
	DEFAULT_CUSTOM_MODAL_WIDTH,
	DEFAULT_CLOSE_BUTTON_ARIA_LABEL,
	DEFAULT_CLOSE_BUTTON_TEXT,
	DEFAULT_MODAL_ARIA_LABEL,
	DEFAULT_MODAL_BACKGROUND_COLOR,
	DEFAULT_MODAL_BORDER_COLOR,
	DEFAULT_MODAL_BORDER_RADIUS,
	DEFAULT_MODAL_BORDER_STYLE,
	DEFAULT_MODAL_BORDER_WIDTH,
	DEFAULT_MODAL_CLOSE_ON_BACKDROP_CLICK,
	DEFAULT_MODAL_LOCK_PAGE_SCROLL,
	DEFAULT_MODAL_MARGIN,
	DEFAULT_MODAL_PADDING,
	DEFAULT_MODAL_SHOW_CLOSE_BUTTON,
	DEFAULT_MODAL_SIZE,
	MAX_CARD_MODAL_BORDER_RADIUS,
	MAX_CARD_MODAL_BORDER_WIDTH,
	MAX_CLOSE_BUTTON_BORDER_RADIUS,
	MAX_CLOSE_BUTTON_SIZE,
	MIN_CARD_MODAL_BORDER_RADIUS,
	MIN_CARD_MODAL_BORDER_WIDTH,
	MIN_CLOSE_BUTTON_BORDER_RADIUS,
	MIN_CLOSE_BUTTON_SIZE,
	MODAL_SIZE_OPTIONS,
	type BorderStyleValue,
	type CloseButtonPositionValue,
	type ModalSizeValue,
	getCloseButtonStyle,
	getModalMarginSides,
	getModalPaddingSides,
	getModalShellStyle,
	getModalSizeClassName,
	getSafeBorderStyle,
	getSafeCloseButtonAriaLabel,
	getSafeCloseButtonPosition,
	getSafeCloseButtonText,
	getSafeCustomModalWidth,
	getSafeNumber,
	getSpacingShorthand,
	isValidCssSize,
	spacingSidesToAttributes,
	type ModalSpacingAttributes,
} from '../card-flip-to-modal/constants';
import { ModalCloseButton } from '../card-flip-to-modal/close-button';
import { CompactColorControl } from '../card-flip-to-modal/compact-color-control';
import { SpacingBoxControl } from '../card-flip-to-modal/spacing-box-control';

const ALLOWED_BLOCKS = [
	'core/image',
	'core/heading',
	'core/paragraph',
	'core/list',
	'core/buttons',
	'core/video',
	'core/group',
	'core/columns',
	'core/column',
	'core/shortcode',
	'core/latest-posts',
];

const TEMPLATE: [ string, Record< string, unknown >? ][] = [
	[
		'core/heading',
		{
			level: 2,
			content: 'Modal Content',
			textAlign: 'center',
		},
	],
	[
		'core/paragraph',
		{
			content: 'This is where expanded custom modal content will appear.',
			align: 'center',
		},
	],
];

interface EditAttributes extends ModalSpacingAttributes {
	modalSize?: ModalSizeValue;
	customModalWidth?: string;
	modalBorderRadius?: number;
	modalBorderStyle?: BorderStyleValue;
	modalBorderColor?: string;
	modalBorderWidth?: number;
	modalBackgroundColor?: string;
	modalAriaLabel?: string;
	modalCloseOnBackdropClick?: boolean;
	modalShowCloseButton?: boolean;
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

interface EditProps {
	attributes: EditAttributes;
	setAttributes: ( attributes: Partial< EditAttributes > ) => void;
}

export default function Edit( { attributes, setAttributes }: EditProps ) {
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
		modalShowCloseButton = DEFAULT_MODAL_SHOW_CLOSE_BUTTON,
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
	
	const customWidthIsValid = isValidCssSize( customModalWidth );
	
	const safeCustomModalWidth = getSafeCustomModalWidth( customModalWidth );
	const safeModalBorderStyle = getSafeBorderStyle(
		modalBorderStyle,
		DEFAULT_MODAL_BORDER_STYLE
	);
	const safeModalBorderWidth = getSafeNumber(
		modalBorderWidth,
		DEFAULT_MODAL_BORDER_WIDTH,
		MIN_CARD_MODAL_BORDER_WIDTH,
		MAX_CARD_MODAL_BORDER_WIDTH
	);
	const safeModalBorderRadius = getSafeNumber(
		modalBorderRadius,
		DEFAULT_MODAL_BORDER_RADIUS,
		MIN_CARD_MODAL_BORDER_RADIUS,
		MAX_CARD_MODAL_BORDER_RADIUS
	);
	const modalPaddingSides = getModalPaddingSides( attributes );
	const modalMarginSides = getModalMarginSides( attributes );
	const modalPaddingShorthand = getSpacingShorthand( modalPaddingSides );
	const modalMarginShorthand = getSpacingShorthand( modalMarginSides );
	const modalShellStyle = {
		...getModalShellStyle( {
			modalSize,
			customModalWidth: safeCustomModalWidth,
			modalBorderRadius: safeModalBorderRadius,
			modalBorderStyle: safeModalBorderStyle,
			modalBorderColor,
			modalBorderWidth: safeModalBorderWidth,
			modalBackgroundColor,
			modalPadding: modalPaddingSides,
			modalMargin: modalMarginSides,
		} ),
		borderWidth: `${ safeModalBorderWidth }px`,
		borderStyle: safeModalBorderStyle,
		borderColor: modalBorderColor,
		borderRadius: `${ safeModalBorderRadius }px`,
		backgroundColor: modalBackgroundColor,
		padding: modalPaddingShorthand,
		margin: modalMarginShorthand,
	};
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

	const blockProps = useBlockProps( {
		className: [
			'gb-flip-card-modal__editor-dialog-preview',
			getModalSizeClassName( modalSize ),
		].join( ' ' ),
		style: modalShellStyle,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Modal Settings', 'card-flip-to-modal' ) }
					className="gb-flip-card-modal__inspector-settings-panel"
					initialOpen={ true }
				>
					<SelectControl
						label={ __( 'Modal width', 'card-flip-to-modal' ) }
						value={ modalSize }
						options={ MODAL_SIZE_OPTIONS }
						onChange={ ( value ) =>
							setAttributes( {
								modalSize: value as ModalSizeValue,
							} )
						}
					/>

					{ modalSize === 'custom' && (
						<>
							<TextControl
								label={ __(
									'Custom modal width',
									'card-flip-to-modal'
								) }
								value={ customModalWidth }
								onChange={ ( value ) =>
									setAttributes( {
										customModalWidth: value,
									} )
								}
								help={ __(
									'Use a valid CSS width such as 720px, 80vw, 45rem, 60%, clamp(320px, 80vw, 1000px), or calc(100vw - 4rem).',
									'card-flip-to-modal'
								) }
							/>

							{ ! customWidthIsValid && (
								<Notice
									status="warning"
									isDismissible={ false }
								>
									{ __(
										'Enter a valid CSS width. The default width will be used until this value is valid.',
										'card-flip-to-modal'
									) }
								</Notice>
							) }
						</>
					) }

					<CompactColorControl
						label={ __( 'Background color', 'card-flip-to-modal' ) }
						value={ modalBackgroundColor }
						defaultValue={ DEFAULT_MODAL_BACKGROUND_COLOR }
						onChange={ ( value ) =>
							setAttributes( {
								modalBackgroundColor: value,
							} )
						}
					/>

					<SpacingBoxControl
						label={ __( 'Padding', 'card-flip-to-modal' ) }
						values={ modalPaddingSides }
						defaults={ DEFAULT_MODAL_PADDING }
						onChange={ ( sides ) =>
							setAttributes(
								spacingSidesToAttributes(
									'modalPadding',
									sides
								)
							)
						}
					/>

					<SpacingBoxControl
						className="gb-flip-card-modal__inspector-control--spaced"
						label={ __( 'Margin', 'card-flip-to-modal' ) }
						values={ modalMarginSides }
						defaults={ DEFAULT_MODAL_MARGIN }
						onChange={ ( sides ) =>
							setAttributes(
								spacingSidesToAttributes(
									'modalMargin',
									sides
								)
							)
						}
					/>

					<SelectControl
						className="gb-flip-card-modal__inspector-control--spaced"
						label={ __( 'Border style', 'card-flip-to-modal' ) }
						value={ safeModalBorderStyle }
						options={ BORDER_STYLE_OPTIONS }
						onChange={ ( value ) =>
							setAttributes( {
								modalBorderStyle: value as BorderStyleValue,
							} )
						}
					/>

					<CompactColorControl
						label={ __( 'Border color', 'card-flip-to-modal' ) }
						value={ modalBorderColor }
						defaultValue={ DEFAULT_MODAL_BORDER_COLOR }
						onChange={ ( value ) =>
							setAttributes( {
								modalBorderColor: value,
							} )
						}
					/>

					<RangeControl
						className="gb-flip-card-modal__inspector-control--spaced"
						label={ __( 'Border thickness', 'card-flip-to-modal' ) }
						value={ safeModalBorderWidth }
						onChange={ ( value ) =>
							setAttributes( {
								modalBorderWidth: getSafeNumber(
									value,
									DEFAULT_MODAL_BORDER_WIDTH,
									MIN_CARD_MODAL_BORDER_WIDTH,
									MAX_CARD_MODAL_BORDER_WIDTH
								),
							} )
						}
						min={ MIN_CARD_MODAL_BORDER_WIDTH }
						max={ MAX_CARD_MODAL_BORDER_WIDTH }
						step={ CARD_MODAL_BORDER_WIDTH_STEP }
					/>

					<RangeControl
						label={ __( 'Border radius', 'card-flip-to-modal' ) }
						value={ safeModalBorderRadius }
						onChange={ ( value ) =>
							setAttributes( {
								modalBorderRadius: getSafeNumber(
									value,
									DEFAULT_MODAL_BORDER_RADIUS,
									MIN_CARD_MODAL_BORDER_RADIUS,
									MAX_CARD_MODAL_BORDER_RADIUS
								),
							} )
						}
						min={ MIN_CARD_MODAL_BORDER_RADIUS }
						max={ MAX_CARD_MODAL_BORDER_RADIUS }
						step={ CARD_MODAL_BORDER_RADIUS_STEP }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Modal Behavior Settings', 'card-flip-to-modal' ) }
					className="gb-flip-card-modal__inspector-settings-panel"
					initialOpen={ false }
				>
					<ToggleControl
						label={ __( 'Close when clicking backdrop', 'card-flip-to-modal' ) }
						checked={ modalCloseOnBackdropClick }
						onChange={ ( value ) =>
							setAttributes( { modalCloseOnBackdropClick: value } )
						}
						help={ __(
							'Allow visitors to close the modal by clicking outside the modal content.',
							'card-flip-to-modal'
						) }
					/>

					<ToggleControl
						label={ __( 'Show close button', 'card-flip-to-modal' ) }
						checked={ modalShowCloseButton }
						onChange={ ( value ) =>
							setAttributes( { modalShowCloseButton: value } )
						}
						help={ __(
							'Display the close button inside the modal.',
							'card-flip-to-modal'
						) }
					/>

					<ToggleControl
						label={ __( 'Lock page scroll while modal is open', 'card-flip-to-modal' ) }
						checked={ modalLockPageScroll }
						onChange={ ( value ) =>
							setAttributes( { modalLockPageScroll: value } )
						}
						help={ __(
							'Prevent the page behind the modal from scrolling while the modal is open.',
							'card-flip-to-modal'
						) }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Accessibility Settings', 'card-flip-to-modal' ) }
					className="gb-flip-card-modal__inspector-settings-panel"
					initialOpen={ false }
				>
					<TextControl
						label={ __( 'Modal label', 'card-flip-to-modal' ) }
						value={ modalAriaLabel }
						onChange={ ( value ) =>
							setAttributes( {
								modalAriaLabel: value || DEFAULT_MODAL_ARIA_LABEL,
							} )
						}
						help={ __(
							'Describe the purpose of the modal for screen readers. If left blank, the default label will be used.',
							'card-flip-to-modal'
						) }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Close Button Settings', 'card-flip-to-modal' ) }
					className="gb-flip-card-modal__inspector-settings-panel"
					initialOpen={ false }
				>
					<TextControl
						label={ __( 'Close button text', 'card-flip-to-modal' ) }
						value={ closeButtonText }
						onChange={ ( value ) =>
							setAttributes( {
								closeButtonText: value,
							} )
						}
						help={ __(
							'Controls the visible close button text or symbol. If left blank, the default symbol will be used.',
							'card-flip-to-modal'
						) }
					/>

					<TextControl
						label={ __( 'Close button accessible label', 'card-flip-to-modal' ) }
						value={ closeButtonAriaLabel }
						onChange={ ( value ) =>
							setAttributes( {
								closeButtonAriaLabel: value,
							} )
						}
						help={ __(
							'Describes the close button for screen readers. If left blank, the default label will be used.',
							'card-flip-to-modal'
						) }
					/>

					<SelectControl
						label={ __( 'Close button position', 'card-flip-to-modal' ) }
						value={ safeCloseButtonPosition }
						options={ CLOSE_BUTTON_POSITION_OPTIONS }
						onChange={ ( value ) =>
							setAttributes( {
								closeButtonPosition: value as CloseButtonPositionValue,
							} )
						}
						help={ __(
							'Choose where the close button appears inside the modal.',
							'card-flip-to-modal'
						) }
					/>

					<RangeControl
						label={ __( 'Close button size', 'card-flip-to-modal' ) }
						value={ closeButtonSize }
						onChange={ ( value ) =>
							setAttributes( {
								closeButtonSize: value || DEFAULT_CLOSE_BUTTON_SIZE,
							} )
						}
						min={ MIN_CLOSE_BUTTON_SIZE }
						max={ MAX_CLOSE_BUTTON_SIZE }
						step={ CLOSE_BUTTON_SIZE_STEP }
					/>

					<RangeControl
						label={ __( 'Close button border radius', 'card-flip-to-modal' ) }
						value={ closeButtonBorderRadius }
						onChange={ ( value ) =>
							setAttributes( {
								closeButtonBorderRadius:
									value ?? DEFAULT_CLOSE_BUTTON_BORDER_RADIUS,
							} )
						}
						min={ MIN_CLOSE_BUTTON_BORDER_RADIUS }
						max={ MAX_CLOSE_BUTTON_BORDER_RADIUS }
						step={ CLOSE_BUTTON_BORDER_RADIUS_STEP }
					/>

					<CompactColorControl
						label={ __( 'Background color', 'card-flip-to-modal' ) }
						value={ closeButtonBackgroundColor }
						defaultValue={ DEFAULT_CLOSE_BUTTON_BACKGROUND_COLOR }
						onChange={ ( value ) =>
							setAttributes( {
								closeButtonBackgroundColor: value,
							} )
						}
					/>

					<CompactColorControl
						label={ __( 'Text color', 'card-flip-to-modal' ) }
						value={ closeButtonTextColor }
						defaultValue={ DEFAULT_CLOSE_BUTTON_TEXT_COLOR }
						onChange={ ( value ) =>
							setAttributes( {
								closeButtonTextColor: value,
							} )
						}
					/>

					<CompactColorControl
						label={ __( 'Border color', 'card-flip-to-modal' ) }
						value={ closeButtonBorderColor }
						defaultValue={ DEFAULT_CLOSE_BUTTON_BORDER_COLOR }
						onChange={ ( value ) =>
							setAttributes( {
								closeButtonBorderColor: value,
							} )
						}
					/>
				</PanelBody>
			</InspectorControls>

			<p className="gb-flip-card-modal__editor-preview-label">
				{ __(
					'Below is the Modal preview (not actual size).',
					'card-flip-to-modal'
				) }
			</p>

			<div { ...blockProps }>
				{ modalShowCloseButton && (
					<ModalCloseButton
						closeButtonPosition={ safeCloseButtonPosition }
						text={ safeCloseButtonText }
						ariaLabel={ safeCloseButtonAriaLabel }
						style={ closeButtonStyle }
						className="gb-flip-card-modal__editor-close-preview"
						tabIndex={ -1 }
					/>
				) }

				<div className="gb-flip-card-modal__content">
					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
						template={ TEMPLATE }
						templateLock={ false }
					/>
				</div>
			</div>
		</>
	);
}