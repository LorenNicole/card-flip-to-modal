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

const TEMPLATE = [
	[
		'core/heading',
		{
			level: 2,
			content: 'Modal Content',
		},
	],
	[
		'core/paragraph',
		{
			content: 'This is where expanded custom modal content will appear.',
		},
	],
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
				<InnerBlocks 
					allowedBlocks={ ALLOWED_BLOCKS } 
					template={ TEMPLATE } 
					templateLock={false}
				/>
			</div>
		</div>
	);
}