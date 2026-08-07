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
	ToggleControl,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';

import {
	DEFAULT_PREVIEW_BACKGROUND_COLOR,
	DEFAULT_PREVIEW_BORDER_COLOR,
	DEFAULT_PREVIEW_MIN_HEIGHT,
	DEFAULT_PREVIEW_TEXT_COLOR,
	getPreviewCardClassNames,
	getPreviewCardStyle,
	getSafeNumber,
	MAX_PREVIEW_MIN_HEIGHT,
	MIN_PREVIEW_MIN_HEIGHT,
	PREVIEW_MIN_HEIGHT_STEP,
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
		previewTextColor = DEFAULT_PREVIEW_TEXT_COLOR,
	} = attributes;

	const safePreviewMinHeight = getSafeNumber(
		previewMinHeight,
		DEFAULT_PREVIEW_MIN_HEIGHT,
		MIN_PREVIEW_MIN_HEIGHT,
		MAX_PREVIEW_MIN_HEIGHT
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
				previewTextColor,
			} ),
		},
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Preview Card Settings', 'card-flip-to-modal' ) }
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

			<div { ...blockProps }>
				<div className="gb-flip-card-modal__editor-section-header">
					<strong>Preview Area</strong>
					<p>
						This content appears on the page before the modal opens.
						Visitors click this area to open the modal.
					</p>
				</div>

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
