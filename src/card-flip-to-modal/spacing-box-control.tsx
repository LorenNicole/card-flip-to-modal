/**
 * WordPress dependencies
 */
import { Button, RangeControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { link, linkOff } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

import {
	MAX_SPACING,
	MIN_SPACING,
	SPACING_STEP,
	getSafeNumber,
	type SpacingSides,
} from './constants';

const SPACING_SIDES = [ 'top', 'right', 'bottom', 'left' ] as const;

type SpacingSide = ( typeof SPACING_SIDES )[ number ];

const SIDE_LABELS: Record< SpacingSide, string > = {
	top: __( 'Top', 'card-flip-to-modal' ),
	right: __( 'Right', 'card-flip-to-modal' ),
	bottom: __( 'Bottom', 'card-flip-to-modal' ),
	left: __( 'Left', 'card-flip-to-modal' ),
};

interface SpacingBoxControlProps {
	label: string;
	className?: string;
	values: SpacingSides;
	defaults: SpacingSides;
	onChange: ( sides: SpacingSides ) => void;
}

function sidesAreEqual( sides: SpacingSides ): boolean {
	return (
		sides.top === sides.right &&
		sides.right === sides.bottom &&
		sides.bottom === sides.left
	);
}

function sidesMatchDefaults(
	sides: SpacingSides,
	defaults: SpacingSides
): boolean {
	return SPACING_SIDES.every( ( side ) => sides[ side ] === defaults[ side ] );
}

function getSafeSideValue(
	value: number | undefined,
	defaultValue: number
): number {
	return getSafeNumber(
		value,
		defaultValue,
		MIN_SPACING,
		MAX_SPACING
	);
}

export function SpacingBoxControl( {
	label,
	className,
	values,
	defaults,
	onChange,
}: SpacingBoxControlProps ) {
	const [ isLinked, setIsLinked ] = useState(
		() => sidesAreEqual( values )
	);

	const rangeControlProps = {
		min: MIN_SPACING,
		max: MAX_SPACING,
		step: SPACING_STEP,
		__next40pxDefaultSize: true,
		__nextHasNoMarginBottom: true,
	};

	const handleLinkedChange = ( value?: number ) => {
		const nextValue = getSafeSideValue( value, defaults.top );

		onChange( {
			top: nextValue,
			right: nextValue,
			bottom: nextValue,
			left: nextValue,
		} );
	};

	const handleSideChange = ( side: SpacingSide, value?: number ) => {
		onChange( {
			...values,
			[ side ]: getSafeSideValue( value, defaults[ side ] ),
		} );
	};

	const toggleLinked = () => {
		if ( ! isLinked ) {
			const unifiedValue = values.top;

			onChange( {
				top: unifiedValue,
				right: unifiedValue,
				bottom: unifiedValue,
				left: unifiedValue,
			} );
		}

		setIsLinked( ! isLinked );
	};

	const handleReset = () => {
		onChange( defaults );
		setIsLinked( sidesAreEqual( defaults ) );
	};

	const wrapperClassName = [
		'gb-flip-card-modal__spacing-box-control',
		className,
	]
		.filter( Boolean )
		.join( ' ' );

	return (
		<div className={ wrapperClassName }>
			<div className="gb-flip-card-modal__spacing-box-control-header">
				<span className="gb-flip-card-modal__spacing-box-control-label">
					{ label }
				</span>

				<div className="gb-flip-card-modal__spacing-box-control-actions">
					<Button
						className="gb-flip-card-modal__spacing-box-control-link"
						size="small"
						icon={ isLinked ? link : linkOff }
						iconSize={ 24 }
						label={
							isLinked
								? __( 'Unlink sides', 'card-flip-to-modal' )
								: __( 'Link sides', 'card-flip-to-modal' )
						}
						onClick={ toggleLinked }
					/>

					<Button
						variant="secondary"
						size="small"
						disabled={ sidesMatchDefaults( values, defaults ) }
						onClick={ handleReset }
					>
						{ __( 'Reset', 'card-flip-to-modal' ) }
					</Button>
				</div>
			</div>

			{ isLinked ? (
				<RangeControl
					{ ...rangeControlProps }
					label={ __( 'All sides', 'card-flip-to-modal' ) }
					value={ values.top }
					onChange={ handleLinkedChange }
				/>
			) : (
				SPACING_SIDES.map( ( side, index ) => (
					<RangeControl
						key={ side }
						{ ...rangeControlProps }
						className={
							index > 0
								? 'gb-flip-card-modal__inspector-control--spaced'
								: undefined
						}
						label={ SIDE_LABELS[ side ] }
						value={ values[ side ] }
						onChange={ ( value ) =>
							handleSideChange( side, value )
						}
					/>
				) )
			) }
		</div>
	);
}
