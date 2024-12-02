import { useEffect, useRef } from "react";
import { useState } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css"; // Material Design theme
import { Button, Snackbar } from "@mui/material";
import DeleteButton from "./DeleteButton";
import AddCustomerForm from "./AddCustomerForm";
import AddTrainingForm from "./AddTrainingForm";
import EditCustomerForm from "./EditCustomerForm";


export default function CustomerList() {


	const gridRef = useRef(null);

	const [customers, setCustomers] = useState([{
		firstname: '', lastname: '', streetaddress: '', postcode: '',
		city: '', email: '', phone: ''
	}])

	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [msg, setMsg] = useState("");

	useEffect(() => getCustomers(), [])


	//ag-grid taulukon sarakkeet 
	const [colDefs, setColDefs] = useState([
		{ field: 'firstname', flex: 1, sortable: true, filter: true, floatingFilter: true },
		{ field: 'lastname', flex: 1, sortable: true, filter: true, floatingFilter: true },
		{ field: 'email', flex: 1, sortable: true, filter: true, floatingFilter: true },
		{ field: 'phone', flex: 1, sortable: true, filter: true, floatingFilter: true },
		{
			headerName: '',
			cellRenderer: (params) =>
				<AddTrainingForm func={addTrainingFunc} params={params} />
			, flex: 1,
		},
		{
			cellRenderer: (params) =>
				<DeleteButton func={deleteCustomer} params={params} />
			, flex: 1
		},
		{
			headerName: '',
			cellRenderer: (params) =>
				<EditCustomerForm func={saveEditedCustomer} params={params} />
			, flex: 1,
		}


	]);


	//hae autot backendistä 
	//getCars funktio
	const getCustomers = () => {
		fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers',
			{ method: 'GET' })
			.then(response => {
				return response.json()
			})
			.then(data => {
				console.log("data ", data._embedded.customers);
				// Handle data
				setCustomers(data._embedded.customers);

			})
			.catch(err => {
				// Something went wrong
			});
	}

	const addCustomerFunc = (customer) => {
		fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers',
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json"
				},
				body: JSON.stringify(customer)
			})
			.then(getCustomers())
			.catch(err => console.error(err))
	}

	const saveEditedCustomer = (customer) => {
		fetch(customer._links.self.href,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json"
				},
				body: JSON.stringify(customer)
			})
			.then(getCustomers())
			.catch(err => console.error(err))
	}


	const deleteCustomer = (params) => {
		console.log("params ", params.data._links.self.href);
		if (window.confirm("Are you sure you want to delete this customer?")) {

			fetch(params.data._links.self.href,
				{ method: 'DELETE' })
				.then(response => {
					if (response.ok) {
						setOpenSnackbar(true);
						setMsg("Delete succeed");
						getCustomers();
					}
					else {
						openSnackbar(false);
					}
				})
				.catch(err => {
					// Something went wrong
				});
		}
	}


	const addTrainingFunc = (train) => {
		fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings',
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json"
				},
				body: JSON.stringify(train)
			})
			.catch(err => console.error(err))
	}


	const handleExportOnClick = () => {
		gridRef.current.api.exportDataAsCsv(
			{
				fileName: "customers.csv",
				columnKeys: ["firstname", "lastname", "streetaddress", "postcode",
					"city", "email", "phone"],
				skipHeader: true
			}
		);
	}


	//näytä autot nettisivulla 
	return (
		<>
			<div className="ag-theme-material" style={{ width: 900, height: 500 }}>
				<AgGridReact
					rowData={customers}
					columnDefs={colDefs}
					ref={gridRef}
					pagination={true}
					paginationPageSize={10}
					paginationPageSizeSelector={false}
				>
				</AgGridReact>

				<Button onClick={handleExportOnClick}>Export customers as CSV</Button>
				<AddCustomerForm func={addCustomerFunc} />


				<Snackbar
					open={openSnackbar}
					message={msg}
					autoHideDuration={3000}
					onClose={() => setOpenSnackbar(false)}
				/>

			</div>
		</>
	)
}