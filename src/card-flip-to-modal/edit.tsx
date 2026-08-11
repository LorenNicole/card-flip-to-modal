import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ToggleControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import {
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

export default function Edit( { attributes, setAttributes }: EditProps ) {
	const {
		flipAnimationEnabled = DEFAULT_FLIP_ANIMATION_ENABLED,
		flipAnimationDuration = DEFAULT_FLIP_ANIMATION_DURATION_MS,
	} = attributes;

	const safeFlipAnimationDuration = getSafeFlipAnimationDuration( flipAnimationDuration );

	const blockProps = useBlockProps( {
		className: [
			'gb-flip-card-modal',
			'gb-flip-card-modal--editor',
		].join( ' ' ),
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Animation Settings', 'card-flip-to-modal' ) }
					className="gb-flip-card-modal__inspector-settings-panel"
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
