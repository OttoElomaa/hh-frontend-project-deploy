import { useState } from "react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css"; // Material Design theme
import {
	Button, Snackbar, Dialog, TextField,
	DialogTitle, DialogActions, DialogContent, DialogContentText
} from "@mui/material";

export default function AddCustomerForm(props) {


	const [customer, setCustomer] = useState({
		firstname: '', lastname: '', streetaddress: '', postcode: '',
		city: '', email: '', phone: ''
	})


	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSaveCustomerButton = () => {
		props.func(customer)
		handleClose()
	}

	const handleInputChange = (event) => {
		setCustomer({ ...customer, [event.target.name]: event.target.value })
	}

	return (
		<div className="ag-theme-material" style={{ width: 900, height: 400 }}>


			<Button onClick={handleClickOpen} >
				Add Customer
			</Button>


			< Dialog
				open={open}
				onClose={handleClose}
			>

				<DialogTitle>Add customer </DialogTitle>
				< DialogContent >

					<DialogContentText>
						Add a new customer by entering the personal information.
					</DialogContentText>

					{/* EVENT IS THE TEXTFIELD OBJECT */}
					< TextField
						required
						name="firstname" label="First name"
						value={customer.firstname}
						fullWidth
						onChange={event => handleInputChange(event)}
					/>
					< TextField
						required
						name="lastname" label="Last name"
						value={customer.lastname}
						fullWidth
						onChange={event => handleInputChange(event)}
					/>

					< TextField
						required
						name="streetaddress" label="Street address"
						value={customer.streetaddress}
						fullWidth
						onChange={event => handleInputChange(event)}
					/>
					< TextField
						required
						name="postcode" label="Postal code"
						value={customer.postcode}
						fullWidth
						onChange={event => handleInputChange(event)}
					/>
					< TextField
						required
						name="city" label="City"
						value={customer.city}
						fullWidth
						onChange={event => handleInputChange(event)}
					/>
					< TextField
						required
						name="email" label="Email"
						value={customer.email}
						fullWidth
						onChange={event => handleInputChange(event)}
					/>
					< TextField
						required
						name="phone" label="Phone num"
						value={customer.phone}
						fullWidth
						onChange={event => handleInputChange(event)}
					/>


				</DialogContent>
				< DialogActions >
					< Button onClick={handleSaveCustomerButton} > Add Customer </Button>
					<Button onClick={handleClose}> Cancel </Button>

				</DialogActions>
			</Dialog>

		</div>
	)


}