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
			<div className="gb-flip-card-modal__editor-section-header">
				<strong>Expanded Modal Content</strong>
				<p>
					This content appears inside the modal after the preview area is
					clicked. Add longer text, images, buttons, lists, or other
					supported content here.
				</p>
			</div>

			<div className="gb-flip-card-modal__content">
				<InnerBlocks
					allowedBlocks={ ALLOWED_BLOCKS }
					template={ TEMPLATE }
					templateLock={ false }
				/>
			</div>
		</div>
	);
}