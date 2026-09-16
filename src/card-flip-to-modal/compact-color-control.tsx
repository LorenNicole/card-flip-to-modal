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
import { __, sprintf } from '@wordpress/i18n';

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
			help={ __(
				'Choose a color with enough contrast against surrounding text and controls.',
				'card-flip-to-modal'
			) }
		>
			<div className="gb-flip-card-modal__compact-color-control-actions">
				<Dropdown
					renderToggle={ ( { isOpen, onToggle } ) => (
						<Button
							id={ instanceId }
							variant="secondary"
							onClick={ onToggle }
							aria-expanded={ isOpen }
							aria-haspopup="dialog"
						>
							{ sprintf(
								/* translators: %s: name of the color setting, e.g. Background color */
								__( 'Choose %s', 'card-flip-to-modal' ),
								label
							) }
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
					{ sprintf(
						/* translators: %s: name of the color setting, e.g. Background color */
						__( 'Reset %s', 'card-flip-to-modal' ),
						label
					) }
				</Button>
			</div>
		</BaseControl>
	);
}
