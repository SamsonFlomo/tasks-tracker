import Task from "./Tasks";


function Main(props) {
	const tasks = props.tasks.map((task) => {
		return (
			<Task
				key={task.id}
				id={task.id}
				description={task.description}
				timeFrame={task.timeFrame}
				Edit={task.isEDit}
				toggleEdit={() => props.toggleEdit(task.id)}
				removeTask={() => props.removeTask(task.id)}
			/>
		)
	})

	return (
		<div className="main wrapper">
			<h2>{props.name}</h2>
			<h1 className="title">Today's Tasks</h1>
			<button
				className="addtask st btn"
				onClick={props.addTask}
			>Add Task</button>
			{
				props.tasks.length > 0 &&
				<div className="task-list">
					{tasks}
				</div>

			}
			{
				props.tasks.length > 1 &&
				<button
					className="remove-all st btn bold"
					onClick={props.removeAllTasks}
				>Delete All</button>
			}
		</div>
	)
}


export default Main;
