/**
 * Tests for modal focus trapping helpers.
 */
import { getFocusableElements, modalFocus } from '../modal-focus';

function createTabEvent( shiftKey = false ): KeyboardEvent {
	return new KeyboardEvent( 'keydown', {
		key: 'Tab',
		shiftKey,
		bubbles: true,
		cancelable: true,
	} );
}

function stubElementSize(
	element: HTMLElement,
	width: number,
	height: number
): void {
	Object.defineProperty( element, 'offsetWidth', {
		configurable: true,
		get: () => width,
	} );
	Object.defineProperty( element, 'offsetHeight', {
		configurable: true,
		get: () => height,
	} );
}

function createVisibleControl(
	tagName: string,
	attributes: Record< string, string > = {}
): HTMLElement {
	const element = document.createElement( tagName );

	Object.entries( attributes ).forEach( ( [ name, value ] ) => {
		element.setAttribute( name, value );
	} );

	stubElementSize( element, 40, 20 );

	return element;
}

describe( 'getFocusableElements', () => {
	let container: HTMLElement;

	beforeEach( () => {
		container = document.createElement( 'div' );
		document.body.appendChild( container );
	} );

	afterEach( () => {
		container.remove();
	} );

	it( 'returns an empty array when the container is null', () => {
		expect( getFocusableElements( null ) ).toEqual( [] );
	} );

	it( 'returns an empty array when there are no matching descendants', () => {
		container.appendChild( document.createElement( 'p' ) );

		expect( getFocusableElements( container ) ).toEqual( [] );
	} );

	it( 'includes common keyboard-focusable controls', () => {
		const link = createVisibleControl( 'a', { href: '#content' } );
		const button = createVisibleControl( 'button' );
		const input = createVisibleControl( 'input' );
		const textarea = createVisibleControl( 'textarea' );
		const select = createVisibleControl( 'select' );
		const tabbableDiv = createVisibleControl( 'div', { tabindex: '0' } );

		container.append( link, button, input, textarea, select, tabbableDiv );

		expect( getFocusableElements( container ) ).toEqual( [
			link,
			button,
			input,
			textarea,
			select,
			tabbableDiv,
		] );
	} );

	it( 'includes media, iframe, summary, and contenteditable elements', () => {
		const audio = createVisibleControl( 'audio', { controls: '' } );
		const video = createVisibleControl( 'video', { controls: '' } );
		const iframe = createVisibleControl( 'iframe' );
		const summary = createVisibleControl( 'summary' );
		const editable = createVisibleControl( 'div', {
			contenteditable: 'true',
		} );
		const audioWithoutControls = createVisibleControl( 'audio' );
		const notEditable = createVisibleControl( 'div', {
			contenteditable: 'false',
		} );

		container.append(
			audio,
			video,
			iframe,
			summary,
			editable,
			audioWithoutControls,
			notEditable
		);

		expect( getFocusableElements( container ) ).toEqual( [
			audio,
			video,
			iframe,
			summary,
			editable,
		] );
	} );

	it( 'excludes disabled form controls and negative tabindex elements', () => {
		const enabledButton = createVisibleControl( 'button' );
		const disabledButton = createVisibleControl( 'button' );
		disabledButton.setAttribute( 'disabled', 'disabled' );
		const disabledInput = createVisibleControl( 'input' );
		disabledInput.setAttribute( 'disabled', 'disabled' );
		const skippedDiv = createVisibleControl( 'div', { tabindex: '-1' } );
		const tabbableDiv = createVisibleControl( 'div', { tabindex: '0' } );

		container.append(
			enabledButton,
			disabledButton,
			disabledInput,
			skippedDiv,
			tabbableDiv
		);

		expect( getFocusableElements( container ) ).toEqual( [
			enabledButton,
			tabbableDiv,
		] );
	} );

	it( 'excludes elements that are display none or visibility hidden', () => {
		const visibleButton = createVisibleControl( 'button' );
		const displayNoneButton = createVisibleControl( 'button' );
		displayNoneButton.style.display = 'none';
		const visibilityHiddenButton = createVisibleControl( 'button' );
		visibilityHiddenButton.style.visibility = 'hidden';

		container.append(
			visibleButton,
			displayNoneButton,
			visibilityHiddenButton
		);

		expect( getFocusableElements( container ) ).toEqual( [ visibleButton ] );
	} );

	it( 'includes the active element even when it has zero size', () => {
		const zeroSizeButton = createVisibleControl( 'button' );
		stubElementSize( zeroSizeButton, 0, 0 );
		container.appendChild( zeroSizeButton );
		zeroSizeButton.focus();

		expect( getFocusableElements( container ) ).toEqual( [
			zeroSizeButton,
		] );
	} );

	it( 'excludes zero-size elements that are not active', () => {
		const zeroSizeButton = createVisibleControl( 'button' );
		stubElementSize( zeroSizeButton, 0, 0 );
		container.appendChild( zeroSizeButton );

		expect( getFocusableElements( container ) ).toEqual( [] );
	} );
} );

describe( 'modalFocus', () => {
	let container: HTMLElement;

	beforeEach( () => {
		container = document.createElement( 'div' );
		container.tabIndex = -1;
		document.body.appendChild( container );
	} );

	afterEach( () => {
		container.remove();
	} );

	it( 'does nothing when the key is not Tab', () => {
		const firstButton = createVisibleControl( 'button' );
		const lastButton = createVisibleControl( 'button' );
		container.append( firstButton, lastButton );
		lastButton.focus();

		const event = new KeyboardEvent( 'keydown', {
			key: 'Escape',
			bubbles: true,
			cancelable: true,
		} );
		const preventDefault = jest.spyOn( event, 'preventDefault' );

		modalFocus( event, container );

		expect( preventDefault ).not.toHaveBeenCalled();
		expect( document.activeElement ).toBe( lastButton );
	} );

	it( 'does nothing when the container is null', () => {
		const event = createTabEvent();
		const preventDefault = jest.spyOn( event, 'preventDefault' );

		modalFocus( event, null );

		expect( preventDefault ).not.toHaveBeenCalled();
	} );

	it( 'focuses the fallback when there are no tabbable elements', () => {
		const fallback = createVisibleControl( 'button' );
		document.body.appendChild( fallback );

		const event = createTabEvent();
		const preventDefault = jest.spyOn( event, 'preventDefault' );

		modalFocus( event, container, fallback );

		expect( preventDefault ).toHaveBeenCalledTimes( 1 );
		expect( document.activeElement ).toBe( fallback );

		fallback.remove();
	} );

	it( 'focuses the container when there are no tabbable elements and no fallback', () => {
		const event = createTabEvent();
		const preventDefault = jest.spyOn( event, 'preventDefault' );

		modalFocus( event, container );

		expect( preventDefault ).toHaveBeenCalledTimes( 1 );
		expect( document.activeElement ).toBe( container );
	} );

	it( 'wraps Tab from the last tabbable element to the first', () => {
		const firstButton = createVisibleControl( 'button' );
		const middleButton = createVisibleControl( 'button' );
		const lastButton = createVisibleControl( 'button' );
		container.append( firstButton, middleButton, lastButton );
		lastButton.focus();

		const event = createTabEvent();
		const preventDefault = jest.spyOn( event, 'preventDefault' );

		modalFocus( event, container );

		expect( preventDefault ).toHaveBeenCalledTimes( 1 );
		expect( document.activeElement ).toBe( firstButton );
	} );

	it( 'wraps Shift+Tab from the first tabbable element to the last', () => {
		const firstButton = createVisibleControl( 'button' );
		const middleButton = createVisibleControl( 'button' );
		const lastButton = createVisibleControl( 'button' );
		container.append( firstButton, middleButton, lastButton );
		firstButton.focus();

		const event = createTabEvent( true );
		const preventDefault = jest.spyOn( event, 'preventDefault' );

		modalFocus( event, container );

		expect( preventDefault ).toHaveBeenCalledTimes( 1 );
		expect( document.activeElement ).toBe( lastButton );
	} );

	it( 'does not wrap Tab when focus is not on the last element', () => {
		const firstButton = createVisibleControl( 'button' );
		const middleButton = createVisibleControl( 'button' );
		const lastButton = createVisibleControl( 'button' );
		container.append( firstButton, middleButton, lastButton );
		middleButton.focus();

		const event = createTabEvent();
		const preventDefault = jest.spyOn( event, 'preventDefault' );

		modalFocus( event, container );

		expect( preventDefault ).not.toHaveBeenCalled();
		expect( document.activeElement ).toBe( middleButton );
	} );

	it( 'does not wrap Shift+Tab when focus is not on the first element', () => {
		const firstButton = createVisibleControl( 'button' );
		const middleButton = createVisibleControl( 'button' );
		const lastButton = createVisibleControl( 'button' );
		container.append( firstButton, middleButton, lastButton );
		middleButton.focus();

		const event = createTabEvent( true );
		const preventDefault = jest.spyOn( event, 'preventDefault' );

		modalFocus( event, container );

		expect( preventDefault ).not.toHaveBeenCalled();
		expect( document.activeElement ).toBe( middleButton );
	} );
} );
