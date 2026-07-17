/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

const ALLOWED_BLOCKS = [
	'core/image',
	'core/heading',
	'core/paragraph',
	'core/list',
	'core/buttons',
	'core/video',
];

export default function Edit() {
	const blockProps = useBlockProps( {
		className: 'gb-flip-card-modal__editor-modal-preview',
	} );

	return (
		<div { ...blockProps }>
			<div className="gb-flip-card-modal__editor-label">
				Modal Content Preview
			</div>

			<div className="gb-flip-card-modal__content">
				<InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } />
			</div>
		</div>
	);
}