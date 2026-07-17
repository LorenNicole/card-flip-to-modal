/**
 * WordPress dependencies
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Saves the block markup to post content.
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * Stage A:
 * - Static preview card
 * - Hidden backdrop
 * - Hidden modal dialog
 * - Close button
 * - No JavaScript behavior yet
 */
export default function save() {
	const blockProps = useBlockProps.save( {
		className: 'gb-flip-card-modal',
	} );

	return (
		<div { ...blockProps }>
			<div
				className="gb-flip-card-modal__preview"
				role="button"
				tabIndex="0"
				aria-haspopup="dialog"
				aria-expanded="false"
			>
				<div className="gb-flip-card-modal__preview-inner">
					<h3 className="gb-flip-card-modal__preview-title">
						Card Flip to Modal
					</h3>
					<p className="gb-flip-card-modal__preview-text">
						Click to open the modal content.
					</p>
				</div>
			</div>

			<div className="gb-flip-card-modal__backdrop" hidden></div>

			<div
				className="gb-flip-card-modal__dialog"
				role="dialog"
				aria-modal="true"
				aria-label="Card modal content"
				hidden
			>
				<button
					className="gb-flip-card-modal__close"
					type="button"
					aria-label="Close modal"
				>
					×
				</button>

				<div className="gb-flip-card-modal__content">
					<h2>Modal Content</h2>
					<p>
						This is where expanded custom modal content will appear.
					</p>
				</div>
			</div>
		</div>
	);
}
