/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

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
export default function Edit() {
	const blockProps = useBlockProps( {
		className: 'gb-flip-card-modal gb-flip-card-modal--editor',
	} );

	return (
		<div { ...blockProps }>
			<div className="gb-flip-card-modal__preview">
				<div className="gb-flip-card-modal__preview-inner">
					<h3 className="gb-flip-card-modal__preview-title">
						Card Flip to Modal
					</h3>
					<p className="gb-flip-card-modal__preview-text">
						Click to open the modal content.
					</p>
				</div>
			</div>

			<div className="gb-flip-card-modal__editor-modal-preview">
				<div className="gb-flip-card-modal__editor-label">
					Modal Content Preview
				</div>

				<div className="gb-flip-card-modal__content">
					<h2>Modal Content</h2>
					<p>
						This is where expanded modal content will appear in a
						later stage.
					</p>
				</div>
			</div>
		</div>
	);
}
