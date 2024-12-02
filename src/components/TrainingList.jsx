import { useEffect } from "react";
import { useState } from "react";
import { AgGridReact } from "ag-grid-react";


import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css"; // Material Design theme
import { Button, Snackbar } from "@mui/material";
import DeleteButton from "./DeleteButton";
import dayjs from "dayjs";
import AddTrainingForm from "./AddTrainingForm";


export default function TrainingList() {


	const [trainings, setTrainings] = useState([{
		date: '', duration: '', activity: '', customer: ''
	}])

	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [msg, setMsg] = useState("");

	useEffect(() => getTrainings(), [])


	//ag-grid taulukon sarakkeet 
	const [colDefs, setColDefs] = useState([
		{
			headerName: 'Date/Time',
			sortable: true, filter: true, floatingFilter: true,
			cellRenderer: (params) =>
				dayjs(params.data.date).format('DD.MM.YYYY HH:MM')
			, flex: 1
		},

		{
			field: 'duration', flex: 1,
			sortable: true, filter: true, floatingFilter: true
		},

		{
			field: 'activity', flex: 1,
			sortable: true, filter: true, floatingFilter: true
		},

		{
			headerName: 'Customer',
			cellRenderer: (params) =>
				params.data.customer.firstname + ' ' + params.data.customer.lastname,
			flex: 1,
			sortable: true, filter: true, floatingFilter: true,

		},
		{
			headerName: '',
			cellRenderer: (params) =>
				<DeleteButton func={deleteTraining} params={params} />
			, flex: 1,
		}

	]);








	//hae autot backendistä 
	//getCars funktio
	const getTrainings = () => {
		fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/gettrainings',
			{ method: 'GET' })
			.then(response => {
				return response.json()
			})
			.then(data => {
				console.log("trainings: ", data);
				setTrainings(data);
			})
			.catch(err => {
				console.error("Get Trainings Fail")
			});
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


	const deleteTraining = (params) => {
		console.log("params ", params.data);
		if (window.confirm("Are you sure you want to delete this training session?")) {

			fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings/" + params.data.id,
				{ method: 'DELETE' })
				.then(response => {
					if (response.ok) {
						setOpenSnackbar(true);
						setMsg("Delete succeed");
						getTrainings();
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



	//näytä autot nettisivulla 
	return (
		<>
			<div className="ag-theme-material" style={{ width: 900, height: 400 }}>
				<AgGridReact
					rowData={trainings}
					columnDefs={colDefs}
					pagination={true}
					paginationPageSize={10}
					paginationPageSizeSelector={false}
				>
				</AgGridReact>


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