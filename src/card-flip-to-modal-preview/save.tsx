/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

import {
	DEFAULT_PREVIEW_BACKGROUND_COLOR,
	DEFAULT_PREVIEW_BORDER_COLOR,
	DEFAULT_PREVIEW_BORDER_RADIUS,
	DEFAULT_PREVIEW_BORDER_STYLE,
	DEFAULT_PREVIEW_BORDER_WIDTH,
	DEFAULT_PREVIEW_MIN_HEIGHT,
	DEFAULT_PREVIEW_OPEN_ELEMENT_ID,
	DEFAULT_PREVIEW_TEXT_COLOR,
	getPreviewCardClassNames,
	getPreviewCardStyle,
	getPreviewMarginSides,
	getPreviewPaddingSides,
	getSafePreviewOpenElementId,
	type BorderStyleValue,
	type PreviewSpacingAttributes,
} from '../card-flip-to-modal/constants';

interface SaveAttributes extends PreviewSpacingAttributes {
	previewMinHeight?: number;
	previewHasShadow?: boolean;
	previewHasHoverLift?: boolean;
	previewBackgroundColor?: string;
	previewBorderColor?: string;
	previewBorderStyle?: BorderStyleValue;
	previewBorderRadius?: number;
	previewBorderWidth?: number;
	previewTextColor?: string;
	previewOpenElementId?: string;
}

interface SaveProps {
	attributes: SaveAttributes;
}

export default function save( { attributes }: SaveProps ) {
	const {
		previewMinHeight = DEFAULT_PREVIEW_MIN_HEIGHT,
		previewHasShadow = true,
		previewHasHoverLift = true,
		previewBackgroundColor = DEFAULT_PREVIEW_BACKGROUND_COLOR,
		previewBorderColor = DEFAULT_PREVIEW_BORDER_COLOR,
		previewBorderStyle = DEFAULT_PREVIEW_BORDER_STYLE,
		previewBorderRadius = DEFAULT_PREVIEW_BORDER_RADIUS,
		previewBorderWidth = DEFAULT_PREVIEW_BORDER_WIDTH,
		previewTextColor = DEFAULT_PREVIEW_TEXT_COLOR,
		previewOpenElementId = DEFAULT_PREVIEW_OPEN_ELEMENT_ID,
	} = attributes;

	const previewPaddingSides = getPreviewPaddingSides( attributes );
	const previewMarginSides = getPreviewMarginSides( attributes );
	const safePreviewOpenElementId = getSafePreviewOpenElementId(
		previewOpenElementId
	);

	const blockProps = useBlockProps.save( {
		className: [
			'gb-flip-card-modal__preview',
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
				previewBorderStyle,
				previewBorderRadius,
				previewBorderWidth,
				previewTextColor,
				previewPadding: previewPaddingSides,
				previewMargin: previewMarginSides,
			} ),
		},
		...( safePreviewOpenElementId
			? { 'data-modal-open-element-id': safePreviewOpenElementId }
			: {} ),
	} );

	return (
		<div { ...blockProps }>
			<div className="gb-flip-card-modal__preview-inner">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
