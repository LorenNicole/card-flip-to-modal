export const ModalSize = Object.freeze( {
	SMALL: 'small',
	MEDIUM: 'medium',
	LARGE: 'large',
	CUSTOM: 'custom',
} as const );

export type ModalSizeValue = ( typeof ModalSize )[ keyof typeof ModalSize ];

export interface ModalSizeOption {
	label: string;
	value: ModalSizeValue;
}

export type ModalWidthStyle =
	| {
			'--gb-flip-card-modal-width': string;
	  }
	| undefined;

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