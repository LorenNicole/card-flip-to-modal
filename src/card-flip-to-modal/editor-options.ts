/**
 * Translated inspector option lists.
 *
 * Kept out of constants.ts so the frontend view script does not bundle
 * `@wordpress/i18n`.
 */
import { __ } from '@wordpress/i18n';

import {
	BorderStyle,
	CloseButtonPosition,
	ModalSize,
	type BorderStyleOption,
	type CloseButtonPositionOption,
	type ModalSizeOption,
} from './constants';

export function getModalSizeOptions(): ModalSizeOption[] {
	return [
		{
			label: __( 'Small', 'card-flip-to-modal' ),
			value: ModalSize.SMALL,
		},
		{
			label: __( 'Medium', 'card-flip-to-modal' ),
			value: ModalSize.MEDIUM,
		},
		{
			label: __( 'Large', 'card-flip-to-modal' ),
			value: ModalSize.LARGE,
		},
		{
			label: __( 'Custom', 'card-flip-to-modal' ),
			value: ModalSize.CUSTOM,
		},
	];
}

export function getBorderStyleOptions(): BorderStyleOption[] {
	return [
		{
			label: __( 'Solid', 'card-flip-to-modal' ),
			value: BorderStyle.SOLID,
		},
		{
			label: __( 'Dashed', 'card-flip-to-modal' ),
			value: BorderStyle.DASHED,
		},
		{
			label: __( 'Dotted', 'card-flip-to-modal' ),
			value: BorderStyle.DOTTED,
		},
		{
			label: __( 'Double', 'card-flip-to-modal' ),
			value: BorderStyle.DOUBLE,
		},
		{
			label: __( 'None', 'card-flip-to-modal' ),
			value: BorderStyle.NONE,
		},
	];
}

export function getCloseButtonPositionOptions(): CloseButtonPositionOption[] {
	return [
		{
			label: __( 'Top right', 'card-flip-to-modal' ),
			value: CloseButtonPosition.TOP_RIGHT,
		},
		{
			label: __( 'Top left', 'card-flip-to-modal' ),
			value: CloseButtonPosition.TOP_LEFT,
		},
	];
}
