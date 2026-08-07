/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

import {
	DEFAULT_CUSTOM_MODAL_WIDTH,
	DEFAULT_MODAL_ARIA_LABEL,
	DEFAULT_MODAL_SIZE,
	type ModalSizeValue,
	getModalSizeClassName,
	getModalWidthStyle,
	getSafeCustomModalWidth,
	getSafeModalAriaLabel,
} from '../card-flip-to-modal/constants';

interface SaveAttributes {
	modalSize?: ModalSizeValue;
	customModalWidth?: string;
	modalAriaLabel?: string;
}

interface SaveProps {
	attributes: SaveAttributes;
}

export default function save( { attributes }: SaveProps ) {
	const {
		modalSize = DEFAULT_MODAL_SIZE,
		customModalWidth = DEFAULT_CUSTOM_MODAL_WIDTH,
		modalAriaLabel = DEFAULT_MODAL_ARIA_LABEL,
	} = attributes;

	const safeCustomModalWidth = getSafeCustomModalWidth( customModalWidth );
	const safeModalAriaLabel = getSafeModalAriaLabel( modalAriaLabel );
	
	const blockProps = useBlockProps.save( {
		className: getModalSizeClassName( modalSize ),
		style: getModalWidthStyle( modalSize, safeCustomModalWidth ),
	} );


	return (
		<div { ...blockProps }>
			<div className="gb-flip-card-modal__backdrop" hidden></div>

			<div
				className="gb-flip-card-modal__dialog"
				role="dialog"
				aria-modal="true"
				aria-label={ safeModalAriaLabel }
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