import { Button } from "@mui/material";



export default function DeleteButton(props) {

	return (
		<>

			<Button
				size="small"
				color="error"
				onClick={() => props.func(props.params)}
			>
				Delete
			</Button>
		</>
	)
}