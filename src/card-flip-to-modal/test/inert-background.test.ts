/**
 * Tests for collecting page regions that should be inert behind a modal dialog.
 */
import { getBackgroundElementsToInert } from '../modal-focus';

describe( 'getBackgroundElementsToInert', () => {
	let header: HTMLElement;
	let footer: HTMLElement;
	let preview: HTMLElement;
	let backdrop: HTMLElement;
	let dialog: HTMLElement;
	let alreadyInert: HTMLElement;

	beforeEach( () => {
		document.body.innerHTML = '';

		header = document.createElement( 'header' );
		footer = document.createElement( 'footer' );
		alreadyInert = document.createElement( 'aside' );
		alreadyInert.inert = true;

		const main = document.createElement( 'main' );
		const block = document.createElement( 'div' );
		preview = document.createElement( 'div' );
		const contentRoot = document.createElement( 'div' );
		backdrop = document.createElement( 'div' );
		dialog = document.createElement( 'div' );

		contentRoot.append( backdrop, dialog );
		block.append( preview, contentRoot );
		main.appendChild( block );
		document.body.append( header, alreadyInert, main, footer );
	} );

	afterEach( () => {
		document.body.innerHTML = '';
	} );

	it( 'returns an empty array when the dialog is null', () => {
		expect( getBackgroundElementsToInert( null, backdrop ) ).toEqual( [] );
	} );

	it( 'collects ancestor siblings and excludes the dialog, backdrop, and ancestors', () => {
		const elements = getBackgroundElementsToInert( dialog, backdrop );

		expect( elements ).toEqual(
			expect.arrayContaining( [ header, preview, footer ] )
		);
		expect( elements ).not.toContain( dialog );
		expect( elements ).not.toContain( backdrop );
		expect( elements ).not.toContain( dialog.parentElement );
		expect( elements ).not.toContain( document.body );
		expect( elements ).not.toContain( document.documentElement );
	} );

	it( 'skips elements that are already inert', () => {
		const elements = getBackgroundElementsToInert( dialog, backdrop );

		expect( elements ).not.toContain( alreadyInert );
	} );

	it( 'still collects preview when no backdrop is provided', () => {
		const elements = getBackgroundElementsToInert( dialog, null );

		expect( elements ).toContain( preview );
		expect( elements ).toContain( backdrop );
		expect( elements ).not.toContain( dialog );
	} );
} );
