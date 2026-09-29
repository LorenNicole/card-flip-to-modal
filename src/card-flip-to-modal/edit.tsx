/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

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
type BlockTemplate = [ string ][];

const TEMPLATE: BlockTemplate = [
	[ 'fun-gutenberg-blocks/card-flip-to-modal-preview' ],
	[ 'fun-gutenberg-blocks/card-flip-to-modal-content' ],
];

const ALLOWED_BLOCKS = [
	'fun-gutenberg-blocks/card-flip-to-modal-preview',
	'fun-gutenberg-blocks/card-flip-to-modal-content',
];

export default function Edit() {
	const blockProps = useBlockProps( {
		className: [
			'gb-flip-card-modal',
			'gb-flip-card-modal--editor',
		].join( ' ' ),
	} );

	return (
		<div { ...blockProps }>
			<InnerBlocks
				allowedBlocks={ ALLOWED_BLOCKS }
				template={ TEMPLATE }
				templateLock="all"
			/>
		</div>
	);
}
