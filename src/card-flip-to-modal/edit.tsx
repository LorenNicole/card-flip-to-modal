import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	Button,
	ColorIndicator,
	ColorPicker,
	Dropdown,
	Notice,
	PanelBody,
	RangeControl,
	SelectControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import {
	DEFAULT_CUSTOM_MODAL_WIDTH,
	DEFAULT_MODAL_SIZE,
	MODAL_SIZE_OPTIONS,
	ModalSize,
	type ModalSizeOption,
	type ModalSizeValue,
	getModalSizeClassName,
	getModalWidthStyle,
	DEFAULT_MODAL_CLOSE_ON_BACKDROP_CLICK,
	DEFAULT_MODAL_LOCK_PAGE_SCROLL,
	DEFAULT_MODAL_SHOW_CLOSE_BUTTON,
	getSafeCustomModalWidth,
	isValidCssSize,
	isModalSizeValue,
	DEFAULT_PREVIEW_MIN_HEIGHT,
	MAX_PREVIEW_MIN_HEIGHT,
	MIN_PREVIEW_MIN_HEIGHT,
	PREVIEW_MIN_HEIGHT_STEP,
	DEFAULT_PREVIEW_BACKGROUND_COLOR,
	DEFAULT_PREVIEW_BORDER_COLOR,
	DEFAULT_PREVIEW_TEXT_COLOR,
	getPreviewCardClassNames,
	getPreviewCardStyle,
	getSafeNumber,
	DEFAULT_MODAL_ARIA_LABEL,
} from './constants';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The editor preview for the block.
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 */
interface EditAttributes {
	modalSize?: ModalSizeValue;
	customModalWidth?: string;
	modalCloseOnBackdropClick?: boolean;
	modalShowCloseButton?: boolean;
	modalLockPageScroll?: boolean;
	previewMinHeight?: number;
	previewHasShadow?: boolean;
	previewHasHoverLift?: boolean;
	previewBackgroundColor?: string;
	previewBorderColor?: string;
	previewTextColor?: string;
	modalAriaLabel?: string;
}

interface EditProps {
	attributes: EditAttributes;
	setAttributes: ( attributes: Partial< EditAttributes > ) => void;
}

type BlockTemplate = [ string ][];

const TEMPLATE: BlockTemplate = [
	[ 'fun-gutenberg-blocks/card-flip-to-modal-preview' ],
	[ 'fun-gutenberg-blocks/card-flip-to-modal-content' ],
];

const ALLOWED_BLOCKS = [
	'fun-gutenberg-blocks/card-flip-to-modal-preview',
	'fun-gutenberg-blocks/card-flip-to-modal-content',
];

function getModalSizeOptions() {
	return MODAL_SIZE_OPTIONS.map( ( option: ModalSizeOption ) => ( {
		label: __( option.label, 'card-flip-to-modal' ),
		value: option.value,
	} ) );
}

interface CompactColorControlProps {
	label: string;
	value: string;
	defaultValue: string;
	onChange: ( value: string ) => void;
}

function CompactColorControl( {
	label,
	value,
	defaultValue,
	onChange,
}: CompactColorControlProps ) {
	return (
		<div className="gb-flip-card-modal__compact-color-control">
			<div className="gb-flip-card-modal__compact-color-control-header">
				<span>{ label }</span>

				<ColorIndicator colorValue={ value } />
			</div>

			<div className="gb-flip-card-modal__compact-color-control-actions">
				<Dropdown
					renderToggle={ ( { isOpen, onToggle } ) => (
						<Button
							variant="secondary"
							onClick={ onToggle }
							aria-expanded={ isOpen }
						>
							{ __( 'Choose color', 'card-flip-to-modal' ) }
						</Button>
					) }
					renderContent={ () => (
						<ColorPicker
							color={ value }
							onChange={ ( color ) =>
								onChange( color || defaultValue )
							}
							enableAlpha={ false }
						/>
					) }
				/>

				<Button
					variant="tertiary"
					onClick={ () => onChange( defaultValue ) }
				>
					{ __( 'Reset', 'card-flip-to-modal' ) }
				</Button>
			</div>
		</div>
	);
}

export default function Edit( { attributes, setAttributes }: EditProps ) {
	const {
		modalSize = DEFAULT_MODAL_SIZE,
		customModalWidth = DEFAULT_CUSTOM_MODAL_WIDTH,
		modalCloseOnBackdropClick = DEFAULT_MODAL_CLOSE_ON_BACKDROP_CLICK,
		modalShowCloseButton = DEFAULT_MODAL_SHOW_CLOSE_BUTTON,
		modalLockPageScroll = DEFAULT_MODAL_LOCK_PAGE_SCROLL,
		previewMinHeight = DEFAULT_PREVIEW_MIN_HEIGHT,
		previewHasShadow = true,
		previewHasHoverLift = true,
		previewBackgroundColor = DEFAULT_PREVIEW_BACKGROUND_COLOR,
		previewBorderColor = DEFAULT_PREVIEW_BORDER_COLOR,
		previewTextColor = DEFAULT_PREVIEW_TEXT_COLOR,
		modalAriaLabel = DEFAULT_MODAL_ARIA_LABEL,
	} = attributes;

	const safePreviewMinHeight = getSafeNumber(
		previewMinHeight,
		DEFAULT_PREVIEW_MIN_HEIGHT,
		MIN_PREVIEW_MIN_HEIGHT,
		MAX_PREVIEW_MIN_HEIGHT
	);

	const customWidthIsValid = isValidCssSize( customModalWidth );
	const safeCustomModalWidth =
		getSafeCustomModalWidth( customModalWidth );

		const blockProps = useBlockProps( {
			className: [
				'gb-flip-card-modal',
				'gb-flip-card-modal--editor',
				getModalSizeClassName( modalSize ),
				...getPreviewCardClassNames( {
					previewHasShadow,
					previewHasHoverLift,
				} ),
			].join( ' ' ),
			style: {
				...getModalWidthStyle( modalSize, safeCustomModalWidth ),
				...getPreviewCardStyle( {
					previewMinHeight: safePreviewMinHeight,
					previewBackgroundColor,
					previewBorderColor,
					previewTextColor,
				} ),
			},
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
						options={ getModalSizeOptions() }
						onChange={ ( value ) => {
							if ( ! isModalSizeValue( value ) ) {
								return;
							}

							setAttributes( { modalSize: value } );
						} }
						help={ __(
							'Choose how wide the modal appears on the front end.',
							'card-flip-to-modal'
						) }
					/>

					{ modalSize === ModalSize.CUSTOM && (
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
									'Use a valid CSS width such as 720px, 80vw, 45rem, 60%, or clamp(320px, 80vw, 1000px).',
									'card-flip-to-modal'
								) }
							/>

							{ ! customWidthIsValid && (
								<Notice
									status="warning"
									isDismissible={ false }
								>
									{ __(
										'Enter a valid CSS size. The modal will use 720px until this value is valid.',
										'card-flip-to-modal'
									) }
								</Notice>
							) }
						</>
					) }
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
					title={ __( 'Preview Card Settings', 'card-flip-to-modal' ) }
					initialOpen={ false }
				>
					<RangeControl
						label={ __( 'Minimum height', 'card-flip-to-modal' ) }
						value={ safePreviewMinHeight }
						min={ MIN_PREVIEW_MIN_HEIGHT }
						max={ MAX_PREVIEW_MIN_HEIGHT }
						step={ PREVIEW_MIN_HEIGHT_STEP }
						onChange={ ( value ) =>
							setAttributes( {
								previewMinHeight: getSafeNumber(
									value,
									DEFAULT_PREVIEW_MIN_HEIGHT,
									MIN_PREVIEW_MIN_HEIGHT,
									MAX_PREVIEW_MIN_HEIGHT
								),
							} )
						}
						help={ __(
							'Set the minimum height of the preview card in pixels.',
							'card-flip-to-modal'
						) }
					/>

					<ToggleControl
						label={ __( 'Card shadow', 'card-flip-to-modal' ) }
						checked={ previewHasShadow }
						onChange={ ( value ) =>
							setAttributes( { previewHasShadow: value } )
						}
					/>

					<ToggleControl
						label={ __( 'Hover lift effect', 'card-flip-to-modal' ) }
						checked={ previewHasHoverLift }
						onChange={ ( value ) =>
							setAttributes( { previewHasHoverLift: value } )
						}
					/>

					<CompactColorControl
						label={ __( 'Background color', 'card-flip-to-modal' ) }
						value={ previewBackgroundColor }
						defaultValue={ DEFAULT_PREVIEW_BACKGROUND_COLOR }
						onChange={ ( value ) =>
							setAttributes( {
								previewBackgroundColor: value,
							} )
						}
					/>

					<CompactColorControl
						label={ __( 'Border color', 'card-flip-to-modal' ) }
						value={ previewBorderColor }
						defaultValue={ DEFAULT_PREVIEW_BORDER_COLOR }
						onChange={ ( value ) =>
							setAttributes( {
								previewBorderColor: value,
							} )
						}
					/>

					<CompactColorControl
						label={ __( 'Text color', 'card-flip-to-modal' ) }
						value={ previewTextColor }
						defaultValue={ DEFAULT_PREVIEW_TEXT_COLOR }
						onChange={ ( value ) =>
							setAttributes( {
								previewTextColor: value,
							} )
						}
					/>
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
			</InspectorControls>

			<div { ...blockProps }>
				<InnerBlocks
					allowedBlocks={ ALLOWED_BLOCKS }
					template={ TEMPLATE }
					templateLock="all"
				/>
			</div>
		</>
	);
}