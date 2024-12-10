

function Task(props) {
	return (
		<div className="task">
			<span
				title={props.description}
				className="task-descrition"
			>
				{
					props.description.length > 15 ?
						props.description.slice(0, 15) + "..."
						: props.description
				}
			</span>
			<span
				title={props.timeFrame}
				className="task-timeframe"
			>
				{
					props.timeFrame.length > 10 ?
						props.timeFrame.slice(0, 10) + "..."
						: props.timeFrame
				}
			</span>
			<button
				className="edit st btn"
				onClick={props.toggleEdit}
			>Edit</button>
			<button
				className="remove st btn"
				onClick={props.removeTask}
			>Remove</button>
		</div>
	)
}

export default Task;
