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
	ModalSize,
	type ModalSizeOption,
	type ModalSizeValue,
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
	DEFAULT_FLIP_ANIMATION_DURATION_MS,
	DEFAULT_FLIP_ANIMATION_ENABLED,
	FLIP_ANIMATION_DURATION_STEP_MS,
	MAX_FLIP_ANIMATION_DURATION_MS,
	MIN_FLIP_ANIMATION_DURATION_MS,
	getSafeFlipAnimationDuration,
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
	previewMinHeight?: number;
	previewHasShadow?: boolean;
	previewHasHoverLift?: boolean;
	previewBackgroundColor?: string;
	previewBorderColor?: string;
	previewTextColor?: string;
	flipAnimationEnabled?: boolean;
	flipAnimationDuration?: number;
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
		flipAnimationEnabled = DEFAULT_FLIP_ANIMATION_ENABLED,
		flipAnimationDuration = DEFAULT_FLIP_ANIMATION_DURATION_MS,
	} = attributes;

	const safePreviewMinHeight = getSafeNumber(
		previewMinHeight,
		DEFAULT_PREVIEW_MIN_HEIGHT,
		MIN_PREVIEW_MIN_HEIGHT,
		MAX_PREVIEW_MIN_HEIGHT
	);

	const safeFlipAnimationDuration = getSafeFlipAnimationDuration( flipAnimationDuration );

	const blockProps = useBlockProps( {
		className: [
			'gb-flip-card-modal',
			'gb-flip-card-modal--editor',
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
					title={ __( 'Animation Settings', 'card-flip-to-modal' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __( 'Enable flip animation', 'card-flip-to-modal' ) }
						checked={ flipAnimationEnabled }
						onChange={ ( value ) =>
							setAttributes( {
								flipAnimationEnabled: value,
							} )
						}
						help={ __(
							'When enabled, the preview card flips and grows into the modal.',
							'card-flip-to-modal'
						) }
					/>

					<RangeControl
						label={ __( 'Animation duration', 'card-flip-to-modal' ) }
						value={ safeFlipAnimationDuration }
						onChange={ ( value ) =>
							setAttributes( {
								flipAnimationDuration:
									value || DEFAULT_FLIP_ANIMATION_DURATION_MS,
							} )
						}
						min={ MIN_FLIP_ANIMATION_DURATION_MS }
						max={ MAX_FLIP_ANIMATION_DURATION_MS }
						step={ FLIP_ANIMATION_DURATION_STEP_MS }
						disabled={ ! flipAnimationEnabled }
						help={ __(
							'Controls how long the flip/grow animation takes in milliseconds.',
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