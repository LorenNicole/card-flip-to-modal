/**
 * WordPress dependencies
 */
import {
	BaseControl,
	Button,
	ColorIndicator,
	ColorPicker,
	Dropdown,
} from '@wordpress/components';
import { useId } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

interface CompactColorControlProps {
	label: string;
	value: string;
	defaultValue: string;
	onChange: ( value: string ) => void;
}

export function CompactColorControl( {
	label,
	value,
	defaultValue,
	onChange,
}: CompactColorControlProps ) {
	const instanceId = useId();

	return (
		<BaseControl
			id={ instanceId }
			className="gb-flip-card-modal__compact-color-control"
			label={
				<>
					<span>{ label }</span>
					<ColorIndicator colorValue={ value } />
				</>
			}
		>
			<div className="gb-flip-card-modal__compact-color-control-actions">
				<Dropdown
					renderToggle={ ( { isOpen, onToggle } ) => (
						<Button
							variant="secondary"
							onClick={ onToggle }
							aria-expanded={ isOpen }
						>
							{ __( 'Choose color', 'card-flip-to-modal' ) }
						</Button>
					) }
					renderContent={ () => (
						<ColorPicker
							color={ value }
							onChange={ ( color ) =>
								onChange( color || defaultValue )
							}
							enableAlpha={ false }
						/>
					) }
				/>

				<Button
					variant="tertiary"
					onClick={ () => onChange( defaultValue ) }
				>
					{ __( 'Reset', 'card-flip-to-modal' ) }
				</Button>
			</div>
		</BaseControl>
	);
}
