

function Modify(props) {

	return (
		<div className="modify-task wrapper">
			<label>
				Description:
				<input
					name="description"
					type="text"
					placeholder="NickName"
					value={props.editedTask.description}
					onChange={props.handleChange}
					id="description"
					required
				/>
			</label>
			<label>
				Time Range:
				<input
					name="timeFrame"
					type="text"
					placeholder="1 to 2 PM"
					value={props.editedTask.timeFrame}
					onChange={props.handleChange}
					id="timeFrame"
					required
				/>
			</label>
			<div className='buttons-wrapper'>
				<button
					className="save st btn"
					onClick={props.editTask}
				>Save</button>
				<button
					className="cancel st btn"
					onClick={props.handleCancel}
				>Cancel</button>
			</div>
		</div>
	)
}


export default Modify
