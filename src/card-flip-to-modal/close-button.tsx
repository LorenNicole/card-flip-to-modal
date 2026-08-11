import {
	getCloseButtonPositionClassName,
	type CloseButtonPositionValue,
	type CSSVariableStyle,
} from './constants';

interface ModalCloseButtonProps {
	closeButtonPosition: CloseButtonPositionValue;
	text: string;
	ariaLabel: string;
	style: CSSVariableStyle;
	className?: string;
	tabIndex?: number;
}

export function ModalCloseButton( {
	closeButtonPosition,
	text,
	ariaLabel,
	style,
	className = '',
	tabIndex,
}: ModalCloseButtonProps ) {
	return (
		<button
			className={ [
				'gb-flip-card-modal__close',
				getCloseButtonPositionClassName( closeButtonPosition ),
				className,
			]
				.filter( ( value ) => value !== '' )
				.join( ' ' ) }
			type="button"
			aria-label={ ariaLabel }
			style={ style }
			tabIndex={ tabIndex }
		>
			{ text }
		</button>
	);
}
