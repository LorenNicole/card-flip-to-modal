/**
 * WordPress dependencies
 */
import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';

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
 *
 * Stage A:
 * - Shows the preview card
 * - Shows a non-interactive modal content preview below it
 */
const TEMPLATE = [
	[ 'fun-gutenberg-blocks/card-flip-to-modal-preview' ],
	[ 'fun-gutenberg-blocks/card-flip-to-modal-content' ],
];

const ALLOWED_BLOCKS = [
	'fun-gutenberg-blocks/card-flip-to-modal-preview',
	'fun-gutenberg-blocks/card-flip-to-modal-content',
];

export default function Edit() {
	const blockProps = useBlockProps( {
		className: 'gb-flip-card-modal gb-flip-card-modal--editor',
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title="Card Flip to Modal" initialOpen={ true }>
					<p>
						Edit the preview card and modal content directly in the
						block. Modal open/close behavior runs on the front end.
					</p>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<InnerBlocks
					allowedBlocks={ ALLOWED_BLOCKS }
					template={ TEMPLATE }
					templateLock={'all'}
				/>
			</div>
		</>
	);
}