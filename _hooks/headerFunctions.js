
const HeaderFunctions = () => {
	function ConfirmChild(target, NodeList) {
		var confirmed = false;
		NodeList.forEach(node => {
			if (node == target) {
				confirmed = true;
			}
		})
		return confirmed;
	}
	const CloseMobileMenu = (elemRef) => {
		elemRef.current.classList.remove("translate-x-[0px]");
		elemRef.current.classList.add("translate-x-[270px]");
	}
	const OpenMobileMenu = (elemRef) => {
		elemRef.current.classList.remove("translate-x-[270px]");
		elemRef.current.classList.add("translate-x-[0px]");
	} 

	const toggleAccountMenu = (setAccountMenuOpened, elemRef) => {
		if (elemRef.current.classList.contains("hidden")) {
			elemRef.current.classList.remove('hidden');
			elemRef.current.classList.add('grid');
			setAccountMenuOpened(true)
		}
		else {
			elemRef.current.classList.remove('grid');
			elemRef.current.classList.add('hidden');
			closeAccountMenu(setAccountMenuOpened, elemRef);
		}
	}

	const closeAccountMenu = (setAccountMenuOpened, elemRef) => {
		elemRef.current.classList.remove('grid');
		elemRef.current.classList.add('hidden');
		setAccountMenuOpened(false)
	}

	return {
		ConfirmChild,
		CloseMobileMenu,
		OpenMobileMenu,
		toggleAccountMenu,
		closeAccountMenu
	}
}

export { HeaderFunctions };