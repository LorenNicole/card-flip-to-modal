import type { CSSProperties } from 'react';

export const ModalSize = Object.freeze( {
	SMALL: 'small',
	MEDIUM: 'medium',
	LARGE: 'large',
	CUSTOM: 'custom',
} as const );

export type CSSVariableStyle = CSSProperties & {
	[ key: `--${ string }` ]: string | number | undefined;
};

export type ModalSizeValue = ( typeof ModalSize )[ keyof typeof ModalSize ];

export interface ModalSizeOption {
	label: string;
	value: ModalSizeValue;
}

export type ModalWidthStyle = CSSVariableStyle | undefined;

export const DEFAULT_MODAL_SIZE: ModalSizeValue = ModalSize.MEDIUM;
export const DEFAULT_CUSTOM_MODAL_WIDTH = '720px';

export const DEFAULT_FLIP_ANIMATION_ENABLED = true;
export const DEFAULT_FLIP_ANIMATION_DURATION_MS = 700;
export const MIN_FLIP_ANIMATION_DURATION_MS = 300;
export const MAX_FLIP_ANIMATION_DURATION_MS = 10000;
export const FLIP_ANIMATION_DURATION_STEP_MS = 50;

const VALID_CSS_SIZE_PATTERN =
	/^(?:\d+(?:\.\d+)?(?:px|rem|em|vw|vh|vmin|vmax|%|ch)|clamp\([^)]+\)|min\([^)]+\)|max\([^)]+\)|calc\([^)]+\))$/i;

export const DEFAULT_PREVIEW_MIN_HEIGHT = 220;
export const MIN_PREVIEW_MIN_HEIGHT = 120;
export const MAX_PREVIEW_MIN_HEIGHT = 600;
export const PREVIEW_MIN_HEIGHT_STEP = 10;
export const DEFAULT_PREVIEW_BACKGROUND_COLOR = '#ffffff';
export const DEFAULT_PREVIEW_BORDER_COLOR = '#d0d0d0';
export const DEFAULT_PREVIEW_TEXT_COLOR = '#111111';

export const DEFAULT_PREVIEW_BORDER_RADIUS = 0;
export const DEFAULT_MODAL_BORDER_RADIUS = 0;
export const MIN_CARD_MODAL_BORDER_RADIUS = 0;
export const MAX_CARD_MODAL_BORDER_RADIUS = 48;
export const CARD_MODAL_BORDER_RADIUS_STEP = 1;

export const DEFAULT_PREVIEW_BORDER_WIDTH = 1;
export const DEFAULT_MODAL_BORDER_WIDTH = 1;
export const MIN_CARD_MODAL_BORDER_WIDTH = 0;
export const MAX_CARD_MODAL_BORDER_WIDTH = 12;
export const CARD_MODAL_BORDER_WIDTH_STEP = 1;

export const BorderStyle = Object.freeze( {
	SOLID: 'solid',
	DASHED: 'dashed',
	DOTTED: 'dotted',
	DOUBLE: 'double',
	NONE: 'none',
} as const );

export type BorderStyleValue = ( typeof BorderStyle )[ keyof typeof BorderStyle ];

export interface BorderStyleOption {
	label: string;
	value: BorderStyleValue;
}

export const DEFAULT_PREVIEW_BORDER_STYLE: BorderStyleValue = BorderStyle.SOLID;
export const DEFAULT_MODAL_BORDER_STYLE: BorderStyleValue = BorderStyle.NONE;
export const DEFAULT_MODAL_BORDER_COLOR = '#d0d0d0';
export const DEFAULT_MODAL_BACKGROUND_COLOR = '#ffffff';

export interface SpacingSides {
	top: number;
	right: number;
	bottom: number;
	left: number;
}

export interface BoxControlSideValues {
	top?: string;
	right?: string;
	bottom?: string;
	left?: string;
}

export const MIN_SPACING = 0;
export const MAX_SPACING = 96;
export const SPACING_STEP = 4;

export const DEFAULT_PREVIEW_PADDING: SpacingSides = {
	top: 24,
	right: 24,
	bottom: 24,
	left: 24,
};

export const DEFAULT_PREVIEW_MARGIN: SpacingSides = {
	top: 0,
	right: 0,
	bottom: 0,
	left: 0,
};

export const DEFAULT_MODAL_PADDING: SpacingSides = {
	top: 32,
	right: 32,
	bottom: 32,
	left: 32,
};

export const DEFAULT_MODAL_MARGIN: SpacingSides = {
	top: 0,
	right: 0,
	bottom: 0,
	left: 0,
};

export const SPACING_BOX_CONTROL_UNITS = [
	{
		value: 'px',
		label: 'px',
		max: MAX_SPACING,
		step: SPACING_STEP,
	},
];

export function getSafeSpacingSides(
	sides: Partial< SpacingSides >,
	defaults: SpacingSides
): SpacingSides {
	return {
		top: getSafeNumber(
			sides.top,
			defaults.top,
			MIN_SPACING,
			MAX_SPACING
		),
		right: getSafeNumber(
			sides.right,
			defaults.right,
			MIN_SPACING,
			MAX_SPACING
		),
		bottom: getSafeNumber(
			sides.bottom,
			defaults.bottom,
			MIN_SPACING,
			MAX_SPACING
		),
		left: getSafeNumber(
			sides.left,
			defaults.left,
			MIN_SPACING,
			MAX_SPACING
		),
	};
}

export function getSpacingShorthand( sides: SpacingSides ): string {
	const { top, right, bottom, left } = sides;

	if (
		top === right &&
		right === bottom &&
		bottom === left
	) {
		return `${ top }px`;
	}

	return `${ top }px ${ right }px ${ bottom }px ${ left }px`;
}

export function spacingSidesToBoxControlValue(
	sides: SpacingSides
): BoxControlSideValues {
	return {
		top: `${ sides.top }px`,
		right: `${ sides.right }px`,
		bottom: `${ sides.bottom }px`,
		left: `${ sides.left }px`,
	};
}

function parseSpacingSideValue(
	value: string | undefined,
	defaultValue: number
): number {
	if ( typeof value !== 'string' || value.trim() === '' ) {
		return defaultValue;
	}

	const parsedValue = Number.parseFloat( value );

	return getSafeNumber(
		parsedValue,
		defaultValue,
		MIN_SPACING,
		MAX_SPACING
	);
}

export function boxControlValueToSpacingSides(
	value: BoxControlSideValues | undefined,
	defaults: SpacingSides
): SpacingSides {
	return {
		top: parseSpacingSideValue( value?.top, defaults.top ),
		right: parseSpacingSideValue( value?.right, defaults.right ),
		bottom: parseSpacingSideValue( value?.bottom, defaults.bottom ),
		left: parseSpacingSideValue( value?.left, defaults.left ),
	};
}

export type SpacingAttributePrefix =
	| 'previewPadding'
	| 'previewMargin'
	| 'modalPadding'
	| 'modalMargin';

export function spacingSidesToAttributes(
	prefix: SpacingAttributePrefix,
	sides: SpacingSides
): Record< string, number > {
	return {
		[ `${ prefix }Top` ]: sides.top,
		[ `${ prefix }Right` ]: sides.right,
		[ `${ prefix }Bottom` ]: sides.bottom,
		[ `${ prefix }Left` ]: sides.left,
	};
}

export interface PreviewSpacingAttributes {
	previewPaddingTop?: number;
	previewPaddingRight?: number;
	previewPaddingBottom?: number;
	previewPaddingLeft?: number;
	previewMarginTop?: number;
	previewMarginRight?: number;
	previewMarginBottom?: number;
	previewMarginLeft?: number;
}

export interface ModalSpacingAttributes {
	modalPaddingTop?: number;
	modalPaddingRight?: number;
	modalPaddingBottom?: number;
	modalPaddingLeft?: number;
	modalMarginTop?: number;
	modalMarginRight?: number;
	modalMarginBottom?: number;
	modalMarginLeft?: number;
}

export function getPreviewPaddingSides(
	attributes: PreviewSpacingAttributes
): SpacingSides {
	return getSafeSpacingSides(
		{
			top: attributes.previewPaddingTop,
			right: attributes.previewPaddingRight,
			bottom: attributes.previewPaddingBottom,
			left: attributes.previewPaddingLeft,
		},
		DEFAULT_PREVIEW_PADDING
	);
}

export function getPreviewMarginSides(
	attributes: PreviewSpacingAttributes
): SpacingSides {
	return getSafeSpacingSides(
		{
			top: attributes.previewMarginTop,
			right: attributes.previewMarginRight,
			bottom: attributes.previewMarginBottom,
			left: attributes.previewMarginLeft,
		},
		DEFAULT_PREVIEW_MARGIN
	);
}

export function getModalPaddingSides(
	attributes: ModalSpacingAttributes
): SpacingSides {
	return getSafeSpacingSides(
		{
			top: attributes.modalPaddingTop,
			right: attributes.modalPaddingRight,
			bottom: attributes.modalPaddingBottom,
			left: attributes.modalPaddingLeft,
		},
		DEFAULT_MODAL_PADDING
	);
}

export function getModalMarginSides(
	attributes: ModalSpacingAttributes
): SpacingSides {
	return getSafeSpacingSides(
		{
			top: attributes.modalMarginTop,
			right: attributes.modalMarginRight,
			bottom: attributes.modalMarginBottom,
			left: attributes.modalMarginLeft,
		},
		DEFAULT_MODAL_MARGIN
	);
}

export const DEFAULT_MODAL_CLOSE_ON_BACKDROP_CLICK = false;
export const DEFAULT_MODAL_LOCK_PAGE_SCROLL = true;

export function getBooleanDataAttribute( value: boolean ): string {
	return value ? 'true' : 'false';
}

export function isModalSizeValue( value: unknown ): value is ModalSizeValue {
	return (
		typeof value === 'string' &&
		( Object.values( ModalSize ) as string[] ).includes( value )
	);
}

export function getModalSizeClassName(
	modalSize: unknown = DEFAULT_MODAL_SIZE
): string {
	const safeModalSize = isModalSizeValue( modalSize )
		? modalSize
		: DEFAULT_MODAL_SIZE;

	return `gb-flip-card-modal--size-${ safeModalSize }`;
}

export function isValidCssSize( value: unknown ): value is string {
	if ( typeof value !== 'string' ) {
		return false;
	}

	return VALID_CSS_SIZE_PATTERN.test( value.trim() );
}

export function getSafeCustomModalWidth(
	customModalWidth: unknown = DEFAULT_CUSTOM_MODAL_WIDTH
): string {
	if ( isValidCssSize( customModalWidth ) ) {
		return customModalWidth.trim();
	}

	return DEFAULT_CUSTOM_MODAL_WIDTH;
}

export function getModalWidthStyle(
	modalSize: unknown,
	customModalWidth: unknown
): ModalWidthStyle {
	if ( modalSize !== ModalSize.CUSTOM ) {
		return undefined;
	}

	return {
		'--gb-flip-card-modal-width':
			getSafeCustomModalWidth( customModalWidth ),
	};
}

export function isBorderStyleValue( value: unknown ): value is BorderStyleValue {
	return (
		typeof value === 'string' &&
		( Object.values( BorderStyle ) as string[] ).includes( value )
	);
}

export function getSafeBorderStyle(
	borderStyle: unknown = DEFAULT_PREVIEW_BORDER_STYLE,
	defaultValue: BorderStyleValue = DEFAULT_PREVIEW_BORDER_STYLE
): BorderStyleValue {
	if ( isBorderStyleValue( borderStyle ) ) {
		return borderStyle;
	}

	return defaultValue;
}

export interface ModalShellStyleOptions {
	modalSize?: ModalSizeValue;
	customModalWidth?: string;
	modalBorderRadius?: number;
	modalBorderStyle?: BorderStyleValue;
	modalBorderColor?: string;
	modalBorderWidth?: number;
	modalBackgroundColor?: string;
	modalPadding?: Partial< SpacingSides >;
	modalMargin?: Partial< SpacingSides >;
}

export function getModalShellStyle( {
	modalSize = DEFAULT_MODAL_SIZE,
	customModalWidth = DEFAULT_CUSTOM_MODAL_WIDTH,
	modalBorderRadius = DEFAULT_MODAL_BORDER_RADIUS,
	modalBorderStyle = DEFAULT_MODAL_BORDER_STYLE,
	modalBorderColor = DEFAULT_MODAL_BORDER_COLOR,
	modalBorderWidth = DEFAULT_MODAL_BORDER_WIDTH,
	modalBackgroundColor = DEFAULT_MODAL_BACKGROUND_COLOR,
	modalPadding = {},
	modalMargin = {},
}: ModalShellStyleOptions ): CSSVariableStyle {
	const safeModalBorderRadius = getSafeNumber(
		modalBorderRadius,
		DEFAULT_MODAL_BORDER_RADIUS,
		MIN_CARD_MODAL_BORDER_RADIUS,
		MAX_CARD_MODAL_BORDER_RADIUS
	);

	const safeModalBorderWidth = getSafeNumber(
		modalBorderWidth,
		DEFAULT_MODAL_BORDER_WIDTH,
		MIN_CARD_MODAL_BORDER_WIDTH,
		MAX_CARD_MODAL_BORDER_WIDTH
	);

	const safeModalPadding = getSafeSpacingSides(
		modalPadding,
		DEFAULT_MODAL_PADDING
	);
	const safeModalMargin = getSafeSpacingSides(
		modalMargin,
		DEFAULT_MODAL_MARGIN
	);

	const style: CSSVariableStyle = {
		'--gb-flip-card-modal-border-radius': `${ safeModalBorderRadius }px`,
		'--gb-flip-card-modal-border-style': getSafeBorderStyle(
			modalBorderStyle,
			DEFAULT_MODAL_BORDER_STYLE
		),
		'--gb-flip-card-modal-border-color': modalBorderColor,
		'--gb-flip-card-modal-border-width': `${ safeModalBorderWidth }px`,
		'--gb-flip-card-modal-background-color': modalBackgroundColor,
		'--gb-flip-card-modal-padding': getSpacingShorthand(
			safeModalPadding
		),
		'--gb-flip-card-modal-margin': getSpacingShorthand(
			safeModalMargin
		),
	};

	if ( modalSize === ModalSize.CUSTOM ) {
		style[ '--gb-flip-card-modal-width' ] =
			getSafeCustomModalWidth( customModalWidth );
	}

	return style;
}

export interface PreviewCardStyleOptions {
	previewMinHeight?: number;
	previewBackgroundColor?: string;
	previewBorderColor?: string;
	previewBorderStyle?: BorderStyleValue;
	previewBorderRadius?: number;
	previewBorderWidth?: number;
	previewTextColor?: string;
	previewPadding?: Partial< SpacingSides >;
	previewMargin?: Partial< SpacingSides >;
}

export interface PreviewCardClassNameOptions {
	previewHasShadow?: boolean;
	previewHasHoverLift?: boolean;
}

export function getSafeNumber(
	value: unknown,
	defaultValue: number,
	minValue: number,
	maxValue: number
): number {
	const parsedValue = Number( value );

	if ( Number.isNaN( parsedValue ) ) {
		return defaultValue;
	}

	return Math.min( Math.max( parsedValue, minValue ), maxValue );
}

export function getPreviewCardStyle( {
	previewMinHeight = DEFAULT_PREVIEW_MIN_HEIGHT,
	previewBackgroundColor = DEFAULT_PREVIEW_BACKGROUND_COLOR,
	previewBorderColor = DEFAULT_PREVIEW_BORDER_COLOR,
	previewBorderStyle = DEFAULT_PREVIEW_BORDER_STYLE,
	previewBorderRadius = DEFAULT_PREVIEW_BORDER_RADIUS,
	previewBorderWidth = DEFAULT_PREVIEW_BORDER_WIDTH,
	previewTextColor = DEFAULT_PREVIEW_TEXT_COLOR,
	previewPadding = {},
	previewMargin = {},
}: PreviewCardStyleOptions ): CSSVariableStyle {
	const safeMinHeight = getSafeNumber(
		previewMinHeight,
		DEFAULT_PREVIEW_MIN_HEIGHT,
		MIN_PREVIEW_MIN_HEIGHT,
		MAX_PREVIEW_MIN_HEIGHT
	);

	const safePreviewBorderRadius = getSafeNumber(
		previewBorderRadius,
		DEFAULT_PREVIEW_BORDER_RADIUS,
		MIN_CARD_MODAL_BORDER_RADIUS,
		MAX_CARD_MODAL_BORDER_RADIUS
	);

	const safePreviewBorderWidth = getSafeNumber(
		previewBorderWidth,
		DEFAULT_PREVIEW_BORDER_WIDTH,
		MIN_CARD_MODAL_BORDER_WIDTH,
		MAX_CARD_MODAL_BORDER_WIDTH
	);
	const safePreviewPadding = getSafeSpacingSides(
		previewPadding,
		DEFAULT_PREVIEW_PADDING
	);
	const safePreviewMargin = getSafeSpacingSides(
		previewMargin,
		DEFAULT_PREVIEW_MARGIN
	);

	return {
		'--gb-flip-card-preview-min-height': `${ safeMinHeight }px`,
		'--gb-flip-card-preview-background-color': previewBackgroundColor,
		'--gb-flip-card-preview-border-color': previewBorderColor,
		'--gb-flip-card-preview-border-style':
			getSafeBorderStyle( previewBorderStyle ),
		'--gb-flip-card-preview-border-radius': `${ safePreviewBorderRadius }px`,
		'--gb-flip-card-preview-border-width': `${ safePreviewBorderWidth }px`,
		'--gb-flip-card-preview-text-color': previewTextColor,
		'--gb-flip-card-preview-padding': getSpacingShorthand(
			safePreviewPadding
		),
		'--gb-flip-card-preview-margin': getSpacingShorthand(
			safePreviewMargin
		),
	};
}

export function getPreviewCardClassNames( {
	previewHasShadow = true,
	previewHasHoverLift = true,
}: PreviewCardClassNameOptions ): string[] {
	return [
		previewHasShadow ? 'gb-flip-card-modal--preview-shadow' : '',
		previewHasHoverLift ? 'gb-flip-card-modal--preview-hover-lift' : '',
	].filter( ( className ) => className !== '' );
}

export const DEFAULT_PREVIEW_OPEN_ELEMENT_ID = '';

const VALID_HTML_ID_PATTERN = /^[A-Za-z][\w:.-]*$/;

export function getDefaultPreviewOpenElementId( clientId: string ): string {
	return `gb-flip-card-open-${ clientId }`;
}

export function getSafePreviewOpenElementId(
	previewOpenElementId: unknown = DEFAULT_PREVIEW_OPEN_ELEMENT_ID
): string {
	if ( typeof previewOpenElementId !== 'string' ) {
		return DEFAULT_PREVIEW_OPEN_ELEMENT_ID;
	}

	const trimmedPreviewOpenElementId = previewOpenElementId.trim();

	if ( ! VALID_HTML_ID_PATTERN.test( trimmedPreviewOpenElementId ) ) {
		return DEFAULT_PREVIEW_OPEN_ELEMENT_ID;
	}

	return trimmedPreviewOpenElementId;
}

export const DEFAULT_MODAL_ARIA_LABEL = 'Card modal content';

export function getSafeModalAriaLabel(
	modalAriaLabel: unknown = DEFAULT_MODAL_ARIA_LABEL
): string {
	if ( typeof modalAriaLabel !== 'string' ) {
		return DEFAULT_MODAL_ARIA_LABEL;
	}

	const trimmedModalAriaLabel = modalAriaLabel.trim();

	if ( ! trimmedModalAriaLabel ) {
		return DEFAULT_MODAL_ARIA_LABEL;
	}

	return trimmedModalAriaLabel;
}

export const DEFAULT_CLOSE_BUTTON_TEXT = '×';
export const DEFAULT_CLOSE_BUTTON_ARIA_LABEL = 'Close modal';

export function getSafeCloseButtonText(
	closeButtonText: unknown = DEFAULT_CLOSE_BUTTON_TEXT
): string {
	if ( typeof closeButtonText !== 'string' ) {
		return DEFAULT_CLOSE_BUTTON_TEXT;
	}

	const trimmedCloseButtonText = closeButtonText.trim();

	if ( ! trimmedCloseButtonText ) {
		return DEFAULT_CLOSE_BUTTON_TEXT;
	}

	return trimmedCloseButtonText;
}

export function getSafeCloseButtonAriaLabel(
	closeButtonAriaLabel: unknown = DEFAULT_CLOSE_BUTTON_ARIA_LABEL
): string {
	if ( typeof closeButtonAriaLabel !== 'string' ) {
		return DEFAULT_CLOSE_BUTTON_ARIA_LABEL;
	}

	const trimmedCloseButtonAriaLabel = closeButtonAriaLabel.trim();

	if ( ! trimmedCloseButtonAriaLabel ) {
		return DEFAULT_CLOSE_BUTTON_ARIA_LABEL;
	}

	return trimmedCloseButtonAriaLabel;
}

export const CloseButtonPosition = Object.freeze( {
	TOP_RIGHT: 'top-right',
	TOP_LEFT: 'top-left',
} as const );

export type CloseButtonPositionValue =
	( typeof CloseButtonPosition )[ keyof typeof CloseButtonPosition ];

export interface CloseButtonPositionOption {
	label: string;
	value: CloseButtonPositionValue;
}

export const DEFAULT_CLOSE_BUTTON_POSITION: CloseButtonPositionValue =
	CloseButtonPosition.TOP_RIGHT;

export function isCloseButtonPositionValue(
	value: unknown
): value is CloseButtonPositionValue {
	return (
		typeof value === 'string' &&
		( Object.values( CloseButtonPosition ) as string[] ).includes( value )
	);
}

export function getSafeCloseButtonPosition(
	closeButtonPosition: unknown = DEFAULT_CLOSE_BUTTON_POSITION
): CloseButtonPositionValue {
	if ( isCloseButtonPositionValue( closeButtonPosition ) ) {
		return closeButtonPosition;
	}

	return DEFAULT_CLOSE_BUTTON_POSITION;
}

export function getCloseButtonPositionClassName(
	closeButtonPosition: unknown = DEFAULT_CLOSE_BUTTON_POSITION
): string {
	const safeCloseButtonPosition =
		getSafeCloseButtonPosition( closeButtonPosition );

	return `gb-flip-card-modal__close--${ safeCloseButtonPosition }`;
}

export const DEFAULT_CLOSE_BUTTON_SIZE = 36;
export const MIN_CLOSE_BUTTON_SIZE = 24;
export const MAX_CLOSE_BUTTON_SIZE = 72;
export const CLOSE_BUTTON_SIZE_STEP = 2;

export const DEFAULT_CLOSE_BUTTON_BACKGROUND_COLOR = '#ffffff';
export const DEFAULT_CLOSE_BUTTON_TEXT_COLOR = '#111111';
export const DEFAULT_CLOSE_BUTTON_BORDER_COLOR = '#d0d0d0';

export const DEFAULT_CLOSE_BUTTON_BORDER_RADIUS = 999;
export const MIN_CLOSE_BUTTON_BORDER_RADIUS = 0;
export const MAX_CLOSE_BUTTON_BORDER_RADIUS = 999;
export const CLOSE_BUTTON_BORDER_RADIUS_STEP = 1;

export interface CloseButtonStyleOptions {
	closeButtonSize?: number;
	closeButtonBackgroundColor?: string;
	closeButtonTextColor?: string;
	closeButtonBorderColor?: string;
	closeButtonBorderRadius?: number;
}

export function getCloseButtonStyle( {
	closeButtonSize = DEFAULT_CLOSE_BUTTON_SIZE,
	closeButtonBackgroundColor = DEFAULT_CLOSE_BUTTON_BACKGROUND_COLOR,
	closeButtonTextColor = DEFAULT_CLOSE_BUTTON_TEXT_COLOR,
	closeButtonBorderColor = DEFAULT_CLOSE_BUTTON_BORDER_COLOR,
	closeButtonBorderRadius = DEFAULT_CLOSE_BUTTON_BORDER_RADIUS,
}: CloseButtonStyleOptions ): CSSVariableStyle {
	const safeCloseButtonSize = getSafeNumber(
		closeButtonSize,
		DEFAULT_CLOSE_BUTTON_SIZE,
		MIN_CLOSE_BUTTON_SIZE,
		MAX_CLOSE_BUTTON_SIZE
	);

	const safeCloseButtonBorderRadius = getSafeNumber(
		closeButtonBorderRadius,
		DEFAULT_CLOSE_BUTTON_BORDER_RADIUS,
		MIN_CLOSE_BUTTON_BORDER_RADIUS,
		MAX_CLOSE_BUTTON_BORDER_RADIUS
	);

	return {
		'--gb-flip-card-close-button-size': `${ safeCloseButtonSize }px`,
		'--gb-flip-card-close-button-background-color':
			closeButtonBackgroundColor,
		'--gb-flip-card-close-button-text-color': closeButtonTextColor,
		'--gb-flip-card-close-button-border-color': closeButtonBorderColor,
		'--gb-flip-card-close-button-border-radius': `${ safeCloseButtonBorderRadius }px`,
	};
}

export function getSafeFlipAnimationDuration(
	value: unknown = DEFAULT_FLIP_ANIMATION_DURATION_MS
): number {
	return getSafeNumber(
		value,
		DEFAULT_FLIP_ANIMATION_DURATION_MS,
		MIN_FLIP_ANIMATION_DURATION_MS,
		MAX_FLIP_ANIMATION_DURATION_MS
	);
}