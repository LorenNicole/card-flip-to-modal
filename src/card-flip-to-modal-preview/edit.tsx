/**
 * WordPress dependencies
 */
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
	PanelBody,
	RangeControl,
	SelectControl,
	ToggleControl,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';

import {
	BORDER_STYLE_OPTIONS,
	CARD_MODAL_BORDER_RADIUS_STEP,
	DEFAULT_PREVIEW_BACKGROUND_COLOR,
	DEFAULT_PREVIEW_BORDER_COLOR,
	DEFAULT_PREVIEW_BORDER_RADIUS,
	DEFAULT_PREVIEW_BORDER_STYLE,
	DEFAULT_PREVIEW_MIN_HEIGHT,
	DEFAULT_PREVIEW_TEXT_COLOR,
	MAX_CARD_MODAL_BORDER_RADIUS,
	MIN_CARD_MODAL_BORDER_RADIUS,
	getPreviewCardClassNames,
	getPreviewCardStyle,
	getSafeBorderStyle,
	getSafeNumber,
	MAX_PREVIEW_MIN_HEIGHT,
	MIN_PREVIEW_MIN_HEIGHT,
	PREVIEW_MIN_HEIGHT_STEP,
	type BorderStyleValue,
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

interface EditAttributes {
	previewMinHeight?: number;
	previewHasShadow?: boolean;
	previewHasHoverLift?: boolean;
	previewBackgroundColor?: string;
	previewBorderColor?: string;
	previewBorderStyle?: BorderStyleValue;
	previewBorderRadius?: number;
	previewTextColor?: string;
}

interface EditProps {
	attributes: EditAttributes;
	setAttributes: ( attributes: Partial< EditAttributes > ) => void;
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
		previewMinHeight = DEFAULT_PREVIEW_MIN_HEIGHT,
		previewHasShadow = true,
		previewHasHoverLift = true,
		previewBackgroundColor = DEFAULT_PREVIEW_BACKGROUND_COLOR,
		previewBorderColor = DEFAULT_PREVIEW_BORDER_COLOR,
		previewBorderStyle = DEFAULT_PREVIEW_BORDER_STYLE,
		previewBorderRadius = DEFAULT_PREVIEW_BORDER_RADIUS,
		previewTextColor = DEFAULT_PREVIEW_TEXT_COLOR,
	} = attributes;

	const safePreviewMinHeight = getSafeNumber(
		previewMinHeight,
		DEFAULT_PREVIEW_MIN_HEIGHT,
		MIN_PREVIEW_MIN_HEIGHT,
		MAX_PREVIEW_MIN_HEIGHT
	);
	const safePreviewBorderStyle = getSafeBorderStyle( previewBorderStyle );

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
				previewBorderRadius,
				previewTextColor,
			} ),
		},
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Card Settings', 'card-flip-to-modal' ) }
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
						label={ __( 'Border style', 'card-flip-to-modal' ) }
						value={ safePreviewBorderStyle }
						options={ BORDER_STYLE_OPTIONS }
						onChange={ ( value ) =>
							setAttributes( {
								previewBorderStyle: value as BorderStyleValue,
							} )
						}
					/>

					<RangeControl
						label={ __( 'Border radius', 'card-flip-to-modal' ) }
						value={ previewBorderRadius }
						onChange={ ( value ) =>
							setAttributes( {
								previewBorderRadius:
									value ?? DEFAULT_PREVIEW_BORDER_RADIUS,
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
