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

export const MODAL_SIZE_OPTIONS: ModalSizeOption[] = [
	{
		label: 'Small',
		value: ModalSize.SMALL,
	},
	{
		label: 'Medium',
		value: ModalSize.MEDIUM,
	},
	{
		label: 'Large',
		value: ModalSize.LARGE,
	},
	{
		label: 'Custom',
		value: ModalSize.CUSTOM,
	},
];

const VALID_CSS_SIZE_PATTERN =
	/^(?:\d+(?:\.\d+)?(?:px|rem|em|vw|vh|vmin|vmax|%|ch)|clamp\([^)]+\)|min\([^)]+\)|max\([^)]+\)|calc\([^)]+\))$/i;

export const DEFAULT_PREVIEW_MIN_HEIGHT = 220;
export const MIN_PREVIEW_MIN_HEIGHT = 120;
export const MAX_PREVIEW_MIN_HEIGHT = 600;
export const PREVIEW_MIN_HEIGHT_STEP = 10;
export const DEFAULT_PREVIEW_BACKGROUND_COLOR = '#f7f7f7';
export const DEFAULT_PREVIEW_BORDER_COLOR = '#d0d0d0';
export const DEFAULT_PREVIEW_TEXT_COLOR = '#111111';

export const DEFAULT_MODAL_CLOSE_ON_BACKDROP_CLICK = false;
export const DEFAULT_MODAL_SHOW_CLOSE_BUTTON = true;
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

export interface PreviewCardStyleOptions {
	previewMinHeight?: number;
	previewBackgroundColor?: string;
	previewBorderColor?: string;
	previewTextColor?: string;
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
	previewTextColor = DEFAULT_PREVIEW_TEXT_COLOR,
}: PreviewCardStyleOptions ): CSSVariableStyle {
	const safeMinHeight = getSafeNumber(
		previewMinHeight,
		DEFAULT_PREVIEW_MIN_HEIGHT,
		MIN_PREVIEW_MIN_HEIGHT,
		MAX_PREVIEW_MIN_HEIGHT
	);

	return {
		'--gb-flip-card-preview-min-height': `${ safeMinHeight }px`,
		'--gb-flip-card-preview-background-color': previewBackgroundColor,
		'--gb-flip-card-preview-border-color': previewBorderColor,
		'--gb-flip-card-preview-text-color': previewTextColor,
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

export const CLOSE_BUTTON_POSITION_OPTIONS: CloseButtonPositionOption[] = [
	{
		label: 'Top right',
		value: CloseButtonPosition.TOP_RIGHT,
	},
	{
		label: 'Top left',
		value: CloseButtonPosition.TOP_LEFT,
	},
];

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