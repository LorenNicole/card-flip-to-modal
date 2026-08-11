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
	SelectControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';

import {
	CLOSE_BUTTON_POSITION_OPTIONS,
	DEFAULT_CLOSE_BUTTON_POSITION,
	DEFAULT_CUSTOM_MODAL_WIDTH,
	DEFAULT_CLOSE_BUTTON_ARIA_LABEL,
	DEFAULT_CLOSE_BUTTON_TEXT,
	DEFAULT_MODAL_ARIA_LABEL,
	DEFAULT_MODAL_CLOSE_ON_BACKDROP_CLICK,
	DEFAULT_MODAL_LOCK_PAGE_SCROLL,
	DEFAULT_MODAL_SHOW_CLOSE_BUTTON,
	DEFAULT_MODAL_SIZE,
	MODAL_SIZE_OPTIONS,
	type CloseButtonPositionValue,
	type ModalSizeValue,
	getCloseButtonPositionClassName,
	getModalSizeClassName,
	getModalWidthStyle,
	getSafeCloseButtonAriaLabel,
	getSafeCloseButtonPosition,
	getSafeCloseButtonText,
	getSafeCustomModalWidth,
	isValidCssSize,
} from '../card-flip-to-modal/constants';

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
		},
	],
	[
		'core/paragraph',
		{
			content: 'This is where expanded custom modal content will appear.',
		},
	],
];

interface EditAttributes {
	modalSize?: ModalSizeValue;
	customModalWidth?: string;
	modalAriaLabel?: string;
	modalCloseOnBackdropClick?: boolean;
	modalShowCloseButton?: boolean;
	modalLockPageScroll?: boolean;
	closeButtonText?: string;
	closeButtonAriaLabel?: string;
	closeButtonPosition?: CloseButtonPositionValue;
}

interface EditProps {
	attributes: EditAttributes;
	setAttributes: ( attributes: Partial< EditAttributes > ) => void;
}

export default function Edit( { attributes, setAttributes }: EditProps ) {
	const {
		modalSize = DEFAULT_MODAL_SIZE,
		customModalWidth = DEFAULT_CUSTOM_MODAL_WIDTH,
		modalAriaLabel = DEFAULT_MODAL_ARIA_LABEL,
		modalCloseOnBackdropClick = DEFAULT_MODAL_CLOSE_ON_BACKDROP_CLICK,
		modalShowCloseButton = DEFAULT_MODAL_SHOW_CLOSE_BUTTON,
		modalLockPageScroll = DEFAULT_MODAL_LOCK_PAGE_SCROLL,
		closeButtonText = DEFAULT_CLOSE_BUTTON_TEXT,
		closeButtonAriaLabel = DEFAULT_CLOSE_BUTTON_ARIA_LABEL,
		closeButtonPosition = DEFAULT_CLOSE_BUTTON_POSITION,
	} = attributes;
	
	const customWidthIsValid = isValidCssSize( customModalWidth );
	
	const safeCustomModalWidth = getSafeCustomModalWidth( customModalWidth );
	const safeCloseButtonText = getSafeCloseButtonText( closeButtonText );
	const safeCloseButtonAriaLabel =
		getSafeCloseButtonAriaLabel( closeButtonAriaLabel );
	const safeCloseButtonPosition =
		getSafeCloseButtonPosition( closeButtonPosition );

	const blockProps = useBlockProps( {
		className: [
			'gb-flip-card-modal__editor-modal-preview',
			getModalSizeClassName( modalSize ),
		].join( ' ' ),
		style: getModalWidthStyle( modalSize, safeCustomModalWidth ),
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Modal Settings', 'card-flip-to-modal' ) }
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
				</PanelBody>

				<PanelBody
					title={ __( 'Modal Behavior Settings', 'card-flip-to-modal' ) }
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
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				
				<button
					className={ [
						'gb-flip-card-modal__close',
						'gb-flip-card-modal__editor-close-preview',
						getCloseButtonPositionClassName( safeCloseButtonPosition ),
					].join( ' ' ) }
					type="button"
					aria-label={ safeCloseButtonAriaLabel }
					tabIndex={ -1 }
				>
					{ safeCloseButtonText }
				</button>

				<div className="gb-flip-card-modal__editor-section-header">
					<strong>Expanded Modal Content</strong>
					<p>
						This content appears inside the modal after the preview area is
						clicked. Add longer text, images, buttons, lists, or other
						supported content here.
					</p>
				</div>

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