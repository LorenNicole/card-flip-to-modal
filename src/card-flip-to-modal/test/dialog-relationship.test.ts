/**
 * Tests for runtime preview/dialog ARIA relationships.
 */
import {
	wireDialogAccessibleName,
	wirePreviewDialogRelationship,
} from '../dialog-relationship';

describe( 'wirePreviewDialogRelationship', () => {
	let preview: HTMLElement;
	let dialog: HTMLElement;

	beforeEach( () => {
		preview = document.createElement( 'div' );
		dialog = document.createElement( 'div' );
	} );

	it( 'assigns a unique dialog id and aria-controls when none exists', () => {
		wirePreviewDialogRelationship( preview, dialog );

		expect( dialog.id ).toMatch( /^gb-flip-card-modal-dialog-\d+$/ );
		expect( preview.getAttribute( 'aria-controls' ) ).toBe( dialog.id );
	} );

	it( 'reuses an existing dialog id', () => {
		dialog.id = 'existing-dialog';

		wirePreviewDialogRelationship( preview, dialog );

		expect( dialog.id ).toBe( 'existing-dialog' );
		expect( preview.getAttribute( 'aria-controls' ) ).toBe(
			'existing-dialog'
		);
	} );

	it( 'assigns distinct ids to separate dialogs', () => {
		const secondPreview = document.createElement( 'div' );
		const secondDialog = document.createElement( 'div' );

		wirePreviewDialogRelationship( preview, dialog );
		wirePreviewDialogRelationship( secondPreview, secondDialog );

		expect( dialog.id ).not.toBe( secondDialog.id );
		expect( preview.getAttribute( 'aria-controls' ) ).toBe( dialog.id );
		expect( secondPreview.getAttribute( 'aria-controls' ) ).toBe(
			secondDialog.id
		);
	} );
} );

describe( 'wireDialogAccessibleName', () => {
	let dialog: HTMLElement;
	let content: HTMLElement;

	beforeEach( () => {
		dialog = document.createElement( 'div' );
		dialog.setAttribute( 'aria-label', 'Card modal content' );
		content = document.createElement( 'div' );
		content.className = 'gb-flip-card-modal__content';
		dialog.appendChild( content );
	} );

	it( 'keeps aria-label when there is no heading', () => {
		const paragraph = document.createElement( 'p' );
		paragraph.textContent = 'Details';
		content.appendChild( paragraph );

		wireDialogAccessibleName( dialog );

		expect( dialog.hasAttribute( 'aria-labelledby' ) ).toBe( false );
		expect( dialog.getAttribute( 'aria-label' ) ).toBe(
			'Card modal content'
		);
	} );

	it( 'keeps aria-label when the first heading is empty', () => {
		const heading = document.createElement( 'h2' );
		content.appendChild( heading );

		wireDialogAccessibleName( dialog );

		expect( dialog.hasAttribute( 'aria-labelledby' ) ).toBe( false );
		expect( dialog.getAttribute( 'aria-label' ) ).toBe(
			'Card modal content'
		);
	} );

	it( 'uses the first heading as aria-labelledby and removes aria-label', () => {
		const heading = document.createElement( 'h2' );
		heading.textContent = 'Team member';
		content.appendChild( heading );

		wireDialogAccessibleName( dialog );

		expect( heading.id ).toMatch( /^gb-flip-card-modal-title-\d+$/ );
		expect( dialog.getAttribute( 'aria-labelledby' ) ).toBe( heading.id );
		expect( dialog.hasAttribute( 'aria-label' ) ).toBe( false );
	} );

	it( 'reuses an existing heading id', () => {
		const heading = document.createElement( 'h3' );
		heading.id = 'existing-title';
		heading.textContent = 'Bio';
		content.appendChild( heading );

		wireDialogAccessibleName( dialog );

		expect( heading.id ).toBe( 'existing-title' );
		expect( dialog.getAttribute( 'aria-labelledby' ) ).toBe(
			'existing-title'
		);
	} );
} );
