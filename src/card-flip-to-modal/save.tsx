/**
 * WordPress dependencies
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

import {
	getPreviewCardStyle,
	getBooleanDataAttribute,
	getSafeFlipAnimationDuration,
	getPreviewCardClassNames,
	DEFAULT_PREVIEW_MIN_HEIGHT,
	DEFAULT_PREVIEW_BACKGROUND_COLOR,
	DEFAULT_PREVIEW_BORDER_COLOR,
	DEFAULT_PREVIEW_TEXT_COLOR,
	DEFAULT_FLIP_ANIMATION_DURATION_MS,
	DEFAULT_FLIP_ANIMATION_ENABLED,
} from './constants';

interface SaveAttributes {
	previewMinHeight?: number;
	previewHasShadow?: boolean;
	previewHasHoverLift?: boolean;
	previewBackgroundColor?: string;
	previewBorderColor?: string;
	previewTextColor?: string;
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
		previewMinHeight = DEFAULT_PREVIEW_MIN_HEIGHT,
		previewHasShadow = true,
		previewHasHoverLift = true,
		previewBackgroundColor = DEFAULT_PREVIEW_BACKGROUND_COLOR,
		previewBorderColor = DEFAULT_PREVIEW_BORDER_COLOR,
		previewTextColor = DEFAULT_PREVIEW_TEXT_COLOR,
		flipAnimationEnabled = DEFAULT_FLIP_ANIMATION_ENABLED,
		flipAnimationDuration = DEFAULT_FLIP_ANIMATION_DURATION_MS,
	} = attributes;

	const safeFlipAnimationDuration = getSafeFlipAnimationDuration( flipAnimationDuration );

	const blockProps = useBlockProps.save( {
		className: [
			'gb-flip-card-modal',
			...getPreviewCardClassNames( {
				previewHasShadow,
				previewHasHoverLift,
			} ),
		].join( ' ' ),
		style: {
			...getPreviewCardStyle( {
				previewMinHeight,
				previewBackgroundColor,
				previewBorderColor,
				previewTextColor,
			} ),
		},
		'data-flip-animation-enabled': getBooleanDataAttribute(flipAnimationEnabled),
		'data-flip-animation-duration': safeFlipAnimationDuration,
		} );

	return (
		<div { ...blockProps }>
			<InnerBlocks.Content />
		</div>
	);
}