/**
 * WordPress dependencies
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

import {
	DEFAULT_CUSTOM_MODAL_WIDTH,
	DEFAULT_MODAL_SIZE,
	type ModalSizeValue,
	getModalSizeClassName,
	getModalWidthStyle,
	getSafeCustomModalWidth,
} from './constants';

interface SaveAttributes {
	modalSize?: ModalSizeValue;
	customModalWidth?: string;
}

interface SaveProps {
	attributes: SaveAttributes;
}

/**
 * Saves the parent block wrapper.
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 * The preview and modal content are saved by the child blocks.
 */
export default function save( { attributes }: SaveProps ) {
	const {
		modalSize = DEFAULT_MODAL_SIZE,
		customModalWidth = DEFAULT_CUSTOM_MODAL_WIDTH,
	} = attributes;

	const safeCustomModalWidth =
		getSafeCustomModalWidth( customModalWidth );

	const blockProps = useBlockProps.save( {
		className: [
			'gb-flip-card-modal',
			getModalSizeClassName( modalSize ),
		].join( ' ' ),
		style: getModalWidthStyle( modalSize, safeCustomModalWidth ),
	} );

	return (
		<div { ...blockProps }>
			<InnerBlocks.Content />
		</div>
	);
}