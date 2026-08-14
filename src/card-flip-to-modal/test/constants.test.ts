/**
 * Tests for sanitizers and style helpers used by the Card Flip to Modal blocks.
 */
import {
	BorderStyle,
	CloseButtonPosition,
	DEFAULT_CLOSE_BUTTON_ARIA_LABEL,
	DEFAULT_CLOSE_BUTTON_POSITION,
	DEFAULT_CLOSE_BUTTON_TEXT,
	DEFAULT_CUSTOM_MODAL_WIDTH,
	DEFAULT_FLIP_ANIMATION_DURATION_MS,
	DEFAULT_MODAL_ARIA_LABEL,
	DEFAULT_MODAL_SIZE,
	DEFAULT_PREVIEW_BORDER_STYLE,
	DEFAULT_PREVIEW_MARGIN,
	MAX_FLIP_ANIMATION_DURATION_MS,
	MIN_FLIP_ANIMATION_DURATION_MS,
	ModalSize,
	boxControlValueToSpacingSides,
	getBooleanDataAttribute,
	getCloseButtonPositionClassName,
	getModalSizeClassName,
	getModalWidthStyle,
	getPreviewCardClassNames,
	getSafeBorderStyle,
	getSafeCloseButtonAriaLabel,
	getSafeCloseButtonPosition,
	getSafeCloseButtonText,
	getSafeCustomModalWidth,
	getSafeFlipAnimationDuration,
	getSafeModalAriaLabel,
	getSafeNumber,
	getSpacingShorthand,
	isValidCssSize,
	spacingSidesToAttributes,
} from '../constants';

describe( 'getSafeNumber', () => {
	it( 'returns the parsed number when it is within range', () => {
		expect( getSafeNumber( 12, 10, 0, 20 ) ).toBe( 12 );
		expect( getSafeNumber( '8', 10, 0, 20 ) ).toBe( 8 );
	} );

	it( 'returns the default for NaN values', () => {
		expect( getSafeNumber( 'abc', 10, 0, 20 ) ).toBe( 10 );
		expect( getSafeNumber( undefined, 10, 0, 20 ) ).toBe( 10 );
	} );

	it( 'clamps values below the minimum and above the maximum', () => {
		expect( getSafeNumber( -5, 10, 0, 20 ) ).toBe( 0 );
		expect( getSafeNumber( 99, 10, 0, 20 ) ).toBe( 20 );
	} );
} );

describe( 'getSafeFlipAnimationDuration', () => {
	it( 'returns the default when the value is invalid', () => {
		expect( getSafeFlipAnimationDuration( 'slow' ) ).toBe(
			DEFAULT_FLIP_ANIMATION_DURATION_MS
		);
	} );

	it( 'clamps durations to the allowed range', () => {
		expect( getSafeFlipAnimationDuration( 50 ) ).toBe(
			MIN_FLIP_ANIMATION_DURATION_MS
		);
		expect( getSafeFlipAnimationDuration( 99999 ) ).toBe(
			MAX_FLIP_ANIMATION_DURATION_MS
		);
	} );

	it( 'returns a valid duration unchanged', () => {
		expect( getSafeFlipAnimationDuration( 700 ) ).toBe( 700 );
	} );
} );

describe( 'getSpacingShorthand', () => {
	it( 'returns a single value when all sides are equal', () => {
		expect(
			getSpacingShorthand( {
				top: 24,
				right: 24,
				bottom: 24,
				left: 24,
			} )
		).toBe( '24px' );
	} );

	it( 'returns a four-value shorthand when sides differ', () => {
		expect(
			getSpacingShorthand( {
				top: 8,
				right: 16,
				bottom: 24,
				left: 32,
			} )
		).toBe( '8px 16px 24px 32px' );
	} );
} );

describe( 'spacingSidesToAttributes', () => {
	it( 'maps spacing sides onto prefixed attributes', () => {
		expect(
			spacingSidesToAttributes( 'previewPadding', {
				top: 8,
				right: 12,
				bottom: 16,
				left: 20,
			} )
		).toEqual( {
			previewPaddingTop: 8,
			previewPaddingRight: 12,
			previewPaddingBottom: 16,
			previewPaddingLeft: 20,
		} );
	} );
} );

describe( 'boxControlValueToSpacingSides', () => {
	it( 'parses box-control pixel values', () => {
		expect(
			boxControlValueToSpacingSides(
				{
					top: '8px',
					right: '12px',
					bottom: '16px',
					left: '20px',
				},
				DEFAULT_PREVIEW_MARGIN
			)
		).toEqual( {
			top: 8,
			right: 12,
			bottom: 16,
			left: 20,
		} );
	} );

	it( 'falls back to defaults for missing or empty sides', () => {
		expect(
			boxControlValueToSpacingSides( undefined, DEFAULT_PREVIEW_MARGIN )
		).toEqual( DEFAULT_PREVIEW_MARGIN );

		expect(
			boxControlValueToSpacingSides(
				{
					top: '',
					right: '4px',
				},
				DEFAULT_PREVIEW_MARGIN
			)
		).toEqual( {
			top: DEFAULT_PREVIEW_MARGIN.top,
			right: 4,
			bottom: DEFAULT_PREVIEW_MARGIN.bottom,
			left: DEFAULT_PREVIEW_MARGIN.left,
		} );
	} );
} );

describe( 'isValidCssSize', () => {
	it( 'accepts valid CSS size values', () => {
		expect( isValidCssSize( '720px' ) ).toBe( true );
		expect( isValidCssSize( '80vw' ) ).toBe( true );
		expect( isValidCssSize( 'clamp(320px, 80vw, 1000px)' ) ).toBe( true );
	} );

	it( 'rejects invalid values', () => {
		expect( isValidCssSize( 'wide' ) ).toBe( false );
		expect( isValidCssSize( '100' ) ).toBe( false );
		expect( isValidCssSize( 720 ) ).toBe( false );
		expect( isValidCssSize( '' ) ).toBe( false );
	} );
} );

describe( 'getSafeCustomModalWidth', () => {
	it( 'returns trimmed valid widths', () => {
		expect( getSafeCustomModalWidth( '  45rem  ' ) ).toBe( '45rem' );
	} );

	it( 'returns the default for invalid widths', () => {
		expect( getSafeCustomModalWidth( 'not-a-size' ) ).toBe(
			DEFAULT_CUSTOM_MODAL_WIDTH
		);
	} );
} );

describe( 'getBooleanDataAttribute', () => {
	it( 'returns string booleans for data attributes', () => {
		expect( getBooleanDataAttribute( true ) ).toBe( 'true' );
		expect( getBooleanDataAttribute( false ) ).toBe( 'false' );
	} );
} );

describe( 'getModalSizeClassName', () => {
	it( 'returns the size class for a valid modal size', () => {
		expect( getModalSizeClassName( ModalSize.LARGE ) ).toBe(
			'gb-flip-card-modal--size-large'
		);
	} );

	it( 'falls back to the default size class for invalid values', () => {
		expect( getModalSizeClassName( 'huge' ) ).toBe(
			`gb-flip-card-modal--size-${ DEFAULT_MODAL_SIZE }`
		);
	} );
} );

describe( 'getModalWidthStyle', () => {
	it( 'returns undefined for preset sizes', () => {
		expect(
			getModalWidthStyle( ModalSize.MEDIUM, '900px' )
		).toBeUndefined();
	} );

	it( 'sets a custom width CSS variable for the custom size', () => {
		expect( getModalWidthStyle( ModalSize.CUSTOM, '80vw' ) ).toEqual( {
			'--gb-flip-card-modal-width': '80vw',
		} );
	} );

	it( 'uses the default custom width when the value is invalid', () => {
		expect( getModalWidthStyle( ModalSize.CUSTOM, 'nope' ) ).toEqual( {
			'--gb-flip-card-modal-width': DEFAULT_CUSTOM_MODAL_WIDTH,
		} );
	} );
} );

describe( 'getSafeBorderStyle', () => {
	it( 'returns a valid border style unchanged', () => {
		expect( getSafeBorderStyle( BorderStyle.DASHED ) ).toBe(
			BorderStyle.DASHED
		);
	} );

	it( 'falls back to the default for invalid values', () => {
		expect( getSafeBorderStyle( 'groove' ) ).toBe(
			DEFAULT_PREVIEW_BORDER_STYLE
		);
	} );
} );

describe( 'getSafeModalAriaLabel', () => {
	it( 'returns a trimmed custom label', () => {
		expect( getSafeModalAriaLabel( '  Team member  ' ) ).toBe(
			'Team member'
		);
	} );

	it( 'falls back to the default for empty or non-string values', () => {
		expect( getSafeModalAriaLabel( '   ' ) ).toBe( DEFAULT_MODAL_ARIA_LABEL );
		expect( getSafeModalAriaLabel( null ) ).toBe( DEFAULT_MODAL_ARIA_LABEL );
	} );
} );

describe( 'getSafeCloseButtonText', () => {
	it( 'returns trimmed custom text', () => {
		expect( getSafeCloseButtonText( ' Close ' ) ).toBe( 'Close' );
	} );

	it( 'falls back to the default for empty or non-string values', () => {
		expect( getSafeCloseButtonText( '' ) ).toBe( DEFAULT_CLOSE_BUTTON_TEXT );
		expect( getSafeCloseButtonText( 0 ) ).toBe( DEFAULT_CLOSE_BUTTON_TEXT );
	} );
} );

describe( 'getSafeCloseButtonAriaLabel', () => {
	it( 'returns a trimmed custom label', () => {
		expect( getSafeCloseButtonAriaLabel( ' Dismiss ' ) ).toBe( 'Dismiss' );
	} );

	it( 'falls back to the default for empty or non-string values', () => {
		expect( getSafeCloseButtonAriaLabel( ' ' ) ).toBe(
			DEFAULT_CLOSE_BUTTON_ARIA_LABEL
		);
		expect( getSafeCloseButtonAriaLabel( undefined ) ).toBe(
			DEFAULT_CLOSE_BUTTON_ARIA_LABEL
		);
	} );
} );

describe( 'getSafeCloseButtonPosition', () => {
	it( 'returns a valid position unchanged', () => {
		expect(
			getSafeCloseButtonPosition( CloseButtonPosition.TOP_LEFT )
		).toBe( CloseButtonPosition.TOP_LEFT );
	} );

	it( 'falls back to the default for invalid values', () => {
		expect( getSafeCloseButtonPosition( 'bottom' ) ).toBe(
			DEFAULT_CLOSE_BUTTON_POSITION
		);
	} );
} );

describe( 'getCloseButtonPositionClassName', () => {
	it( 'returns the position class for a valid position', () => {
		expect(
			getCloseButtonPositionClassName( CloseButtonPosition.TOP_LEFT )
		).toBe( 'gb-flip-card-modal__close--top-left' );
	} );

	it( 'falls back to the default position class for invalid values', () => {
		expect( getCloseButtonPositionClassName( 'center' ) ).toBe(
			`gb-flip-card-modal__close--${ DEFAULT_CLOSE_BUTTON_POSITION }`
		);
	} );
} );

describe( 'getPreviewCardClassNames', () => {
	it( 'includes shadow and hover-lift classes when enabled', () => {
		expect(
			getPreviewCardClassNames( {
				previewHasShadow: true,
				previewHasHoverLift: true,
			} )
		).toEqual( [
			'gb-flip-card-modal--preview-shadow',
			'gb-flip-card-modal--preview-hover-lift',
		] );
	} );

	it( 'omits classes when those effects are disabled', () => {
		expect(
			getPreviewCardClassNames( {
				previewHasShadow: false,
				previewHasHoverLift: false,
			} )
		).toEqual( [] );
	} );
} );
