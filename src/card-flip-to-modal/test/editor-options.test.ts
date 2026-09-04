/**
 * Tests for translated inspector option lists.
 */
import {
	getBorderStyleOptions,
	getCloseButtonPositionOptions,
	getModalSizeOptions,
} from '../editor-options';
import { BorderStyle, CloseButtonPosition, ModalSize } from '../constants';

describe( 'editor options', () => {
	it( 'returns modal size values with labels', () => {
		const options = getModalSizeOptions();

		expect( options.map( ( option ) => option.value ) ).toEqual( [
			ModalSize.SMALL,
			ModalSize.MEDIUM,
			ModalSize.LARGE,
			ModalSize.CUSTOM,
		] );
		expect( options.every( ( option ) => option.label.length > 0 ) ).toBe(
			true
		);
	} );

	it( 'returns border style values with labels', () => {
		expect(
			getBorderStyleOptions().map( ( option ) => option.value )
		).toEqual( Object.values( BorderStyle ) );
	} );

	it( 'returns close button position values with labels', () => {
		expect(
			getCloseButtonPositionOptions().map( ( option ) => option.value )
		).toEqual( Object.values( CloseButtonPosition ) );
	} );
} );
