


function Startup(props) {
	return (
		<div className="welcome-page wrapper">
			<h1 className="title bold">WELCOME</h1>
			<h2>TO YOUR FAVORITE TASK TRACKER</h2>
			<p>
				YOU WILL HAVE THE CHANCE TO TRACK ATMOST
				FIVE IMPORTANT TASK AT THE SAME TIME. CURIOUS?
				TYPE IN YOUR NAME LET GET STARTED.
			</p>
			<label>
				<b>YOUR NAME:</b> <input
					id="user-name"
					type="text"
					placeholder="NickName"
					name="name"
					value={props.user.name}
					onChange={props.handleChange}
				/>
			</label>
			<button
				className="begin st btn"
				onClick={props.handleClick}
			>LET'S BEGIN!</button>
		</div>
	)
}


export default Startup;
