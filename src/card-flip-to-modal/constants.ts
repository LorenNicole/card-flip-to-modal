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
}: PreviewCardStyleOptions ): CSSVariableStyle {
	const safeMinHeight = getSafeNumber(
		previewMinHeight,
		DEFAULT_PREVIEW_MIN_HEIGHT,
		MIN_PREVIEW_MIN_HEIGHT,
		MAX_PREVIEW_MIN_HEIGHT
	);

	return {
		'--gb-flip-card-preview-min-height': `${ safeMinHeight }px`,
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