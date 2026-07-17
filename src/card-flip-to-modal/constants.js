export const ModalSize = Object.freeze( {
	SMALL: 'small',
	MEDIUM: 'medium',
	LARGE: 'large',
	CUSTOM: 'custom',
} );

export const DEFAULT_MODAL_SIZE = ModalSize.MEDIUM;
export const DEFAULT_CUSTOM_MODAL_WIDTH = '720px';

export const MODAL_SIZE_OPTIONS = [
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

export function getModalSizeClassName( modalSize = DEFAULT_MODAL_SIZE ) {
	const allowedSizes = Object.values( ModalSize );
	const safeModalSize = allowedSizes.includes( modalSize )
		? modalSize
		: DEFAULT_MODAL_SIZE;

	return `gb-flip-card-modal--size-${ safeModalSize }`;
}

export function isValidCssSize( value ) {
	if ( typeof value !== 'string' ) {
		return false;
	}

	return VALID_CSS_SIZE_PATTERN.test( value.trim() );
}

export function getSafeCustomModalWidth(
	customModalWidth = DEFAULT_CUSTOM_MODAL_WIDTH
) {
	if ( isValidCssSize( customModalWidth ) ) {
		return customModalWidth.trim();
	}

	return DEFAULT_CUSTOM_MODAL_WIDTH;
}

export function getModalWidthStyle( modalSize, customModalWidth ) {
	if ( modalSize !== ModalSize.CUSTOM ) {
		return undefined;
	}

	return {
		'--gb-flip-card-modal-width':
			getSafeCustomModalWidth( customModalWidth ),
	};
}