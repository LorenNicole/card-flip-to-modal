/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save() {
	const blockProps = useBlockProps.save( {
		className: 'gb-flip-card-modal__preview',
		role: 'button',
		tabIndex: 0,
		'aria-haspopup': 'dialog',
		'aria-expanded': 'false',
	} );

	return (
		<div { ...blockProps }>
			<div className="gb-flip-card-modal__preview-inner">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}