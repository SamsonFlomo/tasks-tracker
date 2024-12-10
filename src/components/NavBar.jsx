

function NavBar(props) {
	return (
		<nav className={props.mode ? 'nav dark-mode' : 'nav'} >
			<button
				className="nav-btn"
				onClick={props.toggleMode}
			>{props.mode ? "Light" : "Dark"} Mode</button>
		</nav >
	)
}


export default NavBar;
