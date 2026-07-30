import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	Notice,
	PanelBody,
	SelectControl,
	TextControl,
	RangeControl,
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
	getSafeCustomModalWidth,
	isValidCssSize,
	isModalSizeValue,
	DEFAULT_PREVIEW_MIN_HEIGHT,
	MAX_PREVIEW_MIN_HEIGHT,
	MIN_PREVIEW_MIN_HEIGHT,
	PREVIEW_MIN_HEIGHT_STEP,
	getPreviewCardClassNames,
	getPreviewCardStyle,
	getSafeNumber,
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
	previewMinHeight?: number;
	previewHasShadow?: boolean;
	previewHasHoverLift?: boolean;
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

export default function Edit( { attributes, setAttributes }: EditProps ) {
	const {
		modalSize = DEFAULT_MODAL_SIZE,
		customModalWidth = DEFAULT_CUSTOM_MODAL_WIDTH,
		previewMinHeight = DEFAULT_PREVIEW_MIN_HEIGHT,
		previewHasShadow = true,
		previewHasHoverLift = true,
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