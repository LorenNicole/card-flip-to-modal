/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save() {
	const blockProps = useBlockProps.save();

	return (
		<div { ...blockProps }>
			<div className="gb-flip-card-modal__backdrop" hidden></div>

			<div
				className="gb-flip-card-modal__dialog"
				role="dialog"
				aria-modal="true"
				aria-label="Card modal content"
				tabIndex={ -1 }
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
					<InnerBlocks.Content />
				</div>
			</div>
		</div>
	);
}