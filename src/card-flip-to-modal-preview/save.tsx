/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

import {
	DEFAULT_PREVIEW_BACKGROUND_COLOR,
	DEFAULT_PREVIEW_BORDER_COLOR,
	DEFAULT_PREVIEW_BORDER_RADIUS,
	DEFAULT_PREVIEW_BORDER_STYLE,
	DEFAULT_PREVIEW_MIN_HEIGHT,
	DEFAULT_PREVIEW_TEXT_COLOR,
	getPreviewCardClassNames,
	getPreviewCardStyle,
	type BorderStyleValue,
} from '../card-flip-to-modal/constants';

interface SaveAttributes {
	previewMinHeight?: number;
	previewHasShadow?: boolean;
	previewHasHoverLift?: boolean;
	previewBackgroundColor?: string;
	previewBorderColor?: string;
	previewBorderStyle?: BorderStyleValue;
	previewBorderRadius?: number;
	previewTextColor?: string;
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
		previewTextColor = DEFAULT_PREVIEW_TEXT_COLOR,
	} = attributes;

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
				previewTextColor,
			} ),
		},
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
