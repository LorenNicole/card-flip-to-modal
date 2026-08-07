/**
 * WordPress dependencies
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

import {
	getBooleanDataAttribute,
	getSafeFlipAnimationDuration,
	DEFAULT_FLIP_ANIMATION_DURATION_MS,
	DEFAULT_FLIP_ANIMATION_ENABLED,
} from './constants';

interface SaveAttributes {
	flipAnimationEnabled?: boolean;
	flipAnimationDuration?: number;
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
		flipAnimationEnabled = DEFAULT_FLIP_ANIMATION_ENABLED,
		flipAnimationDuration = DEFAULT_FLIP_ANIMATION_DURATION_MS,
	} = attributes;

	const safeFlipAnimationDuration = getSafeFlipAnimationDuration( flipAnimationDuration );

	const blockProps = useBlockProps.save( {
		className: 'gb-flip-card-modal',
		'data-flip-animation-enabled': getBooleanDataAttribute( flipAnimationEnabled ),
		'data-flip-animation-duration': safeFlipAnimationDuration,
	} );

	return (
		<div { ...blockProps }>
			<InnerBlocks.Content />
		</div>
	);
}
