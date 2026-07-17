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
];

const TEMPLATE = [
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

export default function Edit() {
	const blockProps = useBlockProps( {
		className: 'gb-flip-card-modal__preview',
	} );

	return (
		<div { ...blockProps }>
			<div className="gb-flip-card-modal__preview-inner">
				<InnerBlocks 
					allowedBlocks={ ALLOWED_BLOCKS } 
					template={ TEMPLATE } 
					templateLock={false}
				/>
			</div>
		</div>
	);
}