/**
 * WordPress dependencies
 */
import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';

import {
	PanelBody,
	RangeControl,
	SelectControl,
	ToggleControl,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';

import {
	CARD_MODAL_BORDER_RADIUS_STEP,
	CARD_MODAL_BORDER_WIDTH_STEP,
	DEFAULT_PREVIEW_BACKGROUND_COLOR,
	DEFAULT_PREVIEW_BORDER_COLOR,
	DEFAULT_PREVIEW_BORDER_RADIUS,
	DEFAULT_PREVIEW_BORDER_STYLE,
	DEFAULT_PREVIEW_BORDER_WIDTH,
	DEFAULT_PREVIEW_MARGIN,
	DEFAULT_PREVIEW_MIN_HEIGHT,
	DEFAULT_PREVIEW_PADDING,
	DEFAULT_PREVIEW_TEXT_COLOR,
	MAX_CARD_MODAL_BORDER_RADIUS,
	MAX_CARD_MODAL_BORDER_WIDTH,
	MIN_CARD_MODAL_BORDER_RADIUS,
	MIN_CARD_MODAL_BORDER_WIDTH,
	getPreviewCardClassNames,
	getPreviewCardStyle,
	getPreviewMarginSides,
	getPreviewPaddingSides,
	getSafeBorderStyle,
	getSafeNumber,
	getSpacingShorthand,
	MAX_PREVIEW_MIN_HEIGHT,
	MIN_PREVIEW_MIN_HEIGHT,
	PREVIEW_MIN_HEIGHT_STEP,
	spacingSidesToAttributes,
	type BorderStyleValue,
	type PreviewSpacingAttributes,
} from '../card-flip-to-modal/constants';
import { CompactColorControl } from '../card-flip-to-modal/compact-color-control';
import { getBorderStyleOptions } from '../card-flip-to-modal/editor-options';
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
			level: 3,
			content: 'Card Flip to Modal',
		},
	],
	[
		'core/paragraph',
		{
			content: 'Click to open the modal content.',
		},
	],
];

interface EditAttributes extends PreviewSpacingAttributes {
	previewMinHeight?: number;
	previewHasShadow?: boolean;
	previewHasHoverLift?: boolean;
	previewBackgroundColor?: string;
	previewBorderColor?: string;
	previewBorderStyle?: BorderStyleValue;
	previewBorderRadius?: number;
	previewBorderWidth?: number;
	previewTextColor?: string;
}

interface EditProps {
	attributes: EditAttributes;
	setAttributes: ( attributes: Partial< EditAttributes > ) => void;
}

export default function Edit( { attributes, setAttributes }: EditProps ) {
	const {
		previewMinHeight = DEFAULT_PREVIEW_MIN_HEIGHT,
		previewHasShadow = true,
		previewHasHoverLift = true,
		previewBackgroundColor = DEFAULT_PREVIEW_BACKGROUND_COLOR,
		previewBorderColor = DEFAULT_PREVIEW_BORDER_COLOR,
		previewBorderStyle = DEFAULT_PREVIEW_BORDER_STYLE,
		previewBorderRadius = DEFAULT_PREVIEW_BORDER_RADIUS,
		previewBorderWidth = DEFAULT_PREVIEW_BORDER_WIDTH,
		previewTextColor = DEFAULT_PREVIEW_TEXT_COLOR,
	} = attributes;

	const safePreviewMinHeight = getSafeNumber(
		previewMinHeight,
		DEFAULT_PREVIEW_MIN_HEIGHT,
		MIN_PREVIEW_MIN_HEIGHT,
		MAX_PREVIEW_MIN_HEIGHT
	);
	const safePreviewBorderStyle = getSafeBorderStyle( previewBorderStyle );
	const safePreviewBorderWidth = getSafeNumber(
		previewBorderWidth,
		DEFAULT_PREVIEW_BORDER_WIDTH,
		MIN_CARD_MODAL_BORDER_WIDTH,
		MAX_CARD_MODAL_BORDER_WIDTH
	);
	const safePreviewBorderRadius = getSafeNumber(
		previewBorderRadius,
		DEFAULT_PREVIEW_BORDER_RADIUS,
		MIN_CARD_MODAL_BORDER_RADIUS,
		MAX_CARD_MODAL_BORDER_RADIUS
	);
	const previewPaddingSides = getPreviewPaddingSides( attributes );
	const previewMarginSides = getPreviewMarginSides( attributes );
	const previewPaddingShorthand = getSpacingShorthand(
		previewPaddingSides
	);
	const previewMarginShorthand = getSpacingShorthand(
		previewMarginSides
	);

	const blockProps = useBlockProps( {
		className: [
			'gb-flip-card-modal__preview',
			...getPreviewCardClassNames( {
				previewHasShadow,
				previewHasHoverLift,
			} ),
		].join( ' ' ),
		style: {
			...getPreviewCardStyle( {
				previewMinHeight: safePreviewMinHeight,
				previewBackgroundColor,
				previewBorderColor,
				previewBorderStyle: safePreviewBorderStyle,
				previewBorderRadius: safePreviewBorderRadius,
				previewBorderWidth: safePreviewBorderWidth,
				previewTextColor,
				previewPadding: previewPaddingSides,
				previewMargin: previewMarginSides,
			} ),
			borderWidth: `${ safePreviewBorderWidth }px`,
			borderStyle: safePreviewBorderStyle,
			borderColor: previewBorderColor,
			borderRadius: `${ safePreviewBorderRadius }px`,
			backgroundColor: previewBackgroundColor,
			padding: previewPaddingShorthand,
			margin: previewMarginShorthand,
		},
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Card Settings', 'card-flip-to-modal' ) }
					className="gb-flip-card-modal__inspector-settings-panel"
					initialOpen={ true }
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

					<SpacingBoxControl
						label={ __( 'Padding', 'card-flip-to-modal' ) }
						values={ previewPaddingSides }
						defaults={ DEFAULT_PREVIEW_PADDING }
						onChange={ ( sides ) =>
							setAttributes(
								spacingSidesToAttributes(
									'previewPadding',
									sides
								)
							)
						}
					/>

					<SpacingBoxControl
						className="gb-flip-card-modal__inspector-control--spaced"
						label={ __( 'Margin', 'card-flip-to-modal' ) }
						values={ previewMarginSides }
						defaults={ DEFAULT_PREVIEW_MARGIN }
						onChange={ ( sides ) =>
							setAttributes(
								spacingSidesToAttributes(
									'previewMargin',
									sides
								)
							)
						}
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

					<SelectControl
						className="gb-flip-card-modal__inspector-control--spaced"
						label={ __( 'Border style', 'card-flip-to-modal' ) }
						value={ safePreviewBorderStyle }
						options={ getBorderStyleOptions() }
						onChange={ ( value ) =>
							setAttributes( {
								previewBorderStyle: value as BorderStyleValue,
							} )
						}
					/>

					<RangeControl
						className="gb-flip-card-modal__inspector-control--spaced"
						label={ __( 'Border thickness', 'card-flip-to-modal' ) }
						value={ safePreviewBorderWidth }
						onChange={ ( value ) =>
							setAttributes( {
								previewBorderWidth: getSafeNumber(
									value,
									DEFAULT_PREVIEW_BORDER_WIDTH,
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
						value={ safePreviewBorderRadius }
						onChange={ ( value ) =>
							setAttributes( {
								previewBorderRadius: getSafeNumber(
									value,
									DEFAULT_PREVIEW_BORDER_RADIUS,
									MIN_CARD_MODAL_BORDER_RADIUS,
									MAX_CARD_MODAL_BORDER_RADIUS
								),
							} )
						}
						min={ MIN_CARD_MODAL_BORDER_RADIUS }
						max={ MAX_CARD_MODAL_BORDER_RADIUS }
						step={ CARD_MODAL_BORDER_RADIUS_STEP }
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
			</InspectorControls>

			<p className="gb-flip-card-modal__editor-preview-label">
				{ __( 'Below is the Card preview.', 'card-flip-to-modal' ) }
			</p>

			<div { ...blockProps }>
				<div className="gb-flip-card-modal__preview-inner">
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
