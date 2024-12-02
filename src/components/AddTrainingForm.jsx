import { useState } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css"; // Material Design theme
import {
	Button, Snackbar, Dialog, TextField,
	DialogTitle, DialogActions, DialogContent, DialogContentText
} from "@mui/material";
import dayjs from "dayjs";

export default function AddTrainingForm(props) {


	const [training, setTraining] = useState({
		date: dayjs, duration: '', activity: '', customer: ''
	})


	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		console.log(props.params.data)
		console.log(props.params.data._links.self.href)
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSaveTrainingButton = () => {
		// setTraining({ ...training, 
		// 	customer: props.params.data._links.self.href
		//  })
		props.func(training)
		console.log("final training object: ",training)
		handleClose()
	}

	
	// INPUT CHANGE WITH CUSTOMER LINK SAVED. According to ChatGPT
	const handleInputChange = (event) => {
		setTraining((training) => ({
		  ...training,
		  [event.target.name]: event.target.value, 
		  customer: props.params.data._links.self.href
		}));
	  };

	return (
		<div>


			<Button onClick={handleClickOpen} >
				Add Session
			</Button>


			< Dialog
				open={open}
				onClose={handleClose}
			>

				<DialogTitle>Add training </DialogTitle>
				< DialogContent >

					<DialogContentText>
						Add a new training session to the database by entering its information.
					</DialogContentText>

					{/* EVENT IS THE TEXTFIELD OBJECT */}
					<TextField
						required
						name="date"
						value={training.date}
          				type="datetime-local"
						onChange={event => handleInputChange(event)
						}
					/>
					< TextField
						required
						name="duration" label="Duration"
						value={training.duration}
						fullWidth
						onChange={event => handleInputChange(event)}
					/>

					< TextField
						required
						name="activity" label="Activity"
						value={training.activity}
						fullWidth
						onChange={event => handleInputChange(event)}
					/>
					

				</DialogContent>
				< DialogActions >
					< Button onClick={handleSaveTrainingButton} > Add Training Session </Button>
					<Button onClick={handleClose}> Cancel </Button>

				</DialogActions>
			</Dialog>

		</div>
	)


}