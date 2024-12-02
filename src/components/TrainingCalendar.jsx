import { useEffect, useMemo, useState } from "react";

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { fi } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";


export default function TrainingCalendar() {
	

	const [trainings, setTrainings] = useState([{
		date: '', duration: '', activity: '', customer: ''
	}])

	useEffect(() => getTrainings(), [])

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

	// COPIED FROM STUDENT ON THE SAME COURSE
	const localizer = dateFnsLocalizer({
		format,
		parse,
		startOfWeek,
		getDay,
		locales:{finnish: fi},
	});
  
	// COPIED FROM STUDENT ON THE SAME COURSE
	// Map through the trainings array and create an event object for each training
	const events = trainings.map((training) => {
	  
	  const trainingDate = new Date(training.date);
	  
	  return {
		title: ""+training.activity + "\n" + training.customer.firstname + " " + training.customer.lastname,
		start: trainingDate,
		end: new Date(trainingDate.getTime() + training.duration * 60000),
		customer: training.customer,
	  };
	});

	const defaultDate = useMemo(() => new Date(), []);

	// COPIED FROM STUDENT ON THE SAME COURSE
	return (
		<>
			
				<h2>Training Calendar</h2>
				<Calendar
					localizer={localizer}
					events={events}
					startAccessor="start"
					endAccessor="end"
					style={{ height: 500, width:1200 }}
					culture="finnish"
					popup
					defaultDate={defaultDate}
				/>
			
		</>
	);
}

