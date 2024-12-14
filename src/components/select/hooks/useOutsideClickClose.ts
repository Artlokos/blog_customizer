import { useEffect } from 'react';

type UseOutsideClickClose = {
	sideBarVisible: boolean;
	onChange: (newValue: boolean) => void;
	onClose?: () => void;
	rootRef: React.RefObject<HTMLElement>;
};

export const useOutsideClickClose = ({
	sideBarVisible,
	rootRef,
	onClose,
	onChange,
}: UseOutsideClickClose) => {
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				sideBarVisible && onClose?.();
				onChange?.(false);
			}
		};

		if (sideBarVisible) {
			window.addEventListener('mousedown', handleClick);
		}

		return () => {
			if (!sideBarVisible){
				window.removeEventListener('mousedown', handleClick);
			}
		};
		
	}, [onClose, onChange, sideBarVisible]);
};
