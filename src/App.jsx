import { useState } from 'react'
import './App.css'

import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { AppBar, Button, Stack, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';

import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';
import TrainingCalendar from './components/TrainingCalendar';


function App() {


  const [value, setValue] = useState('0')


  const handleChange = (event, newValue) => {
    setValue(newValue)
  };


  const resetDatabase = (params) => {

    fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/reset',
      { method: 'POST' })
      .then(response => {
        console.log('Reset success')
      })
      .catch(err => {
        console.log('Couldnot reset daatabase')
      });
  }



  return (

    <Container maxWidth="xl">

      <CssBaseline />

      <Stack
        mt={2}
        direction="column"
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >




        {/*TABCONTEXT, TABS and TABPANEL implemented with help by MUI docs and CHATGPT */}
        <TabContext value={value}>

          <AppBar position="fixed">
            <Toolbar>
              <Typography variant="h6">Personal Training App</Typography>



              <Tabs 
                value={value} onChange={handleChange}
                centered

              >

                <Tab label="HOME PAGE" value="0" sx={{ color: 'white',  '&.Mui-selected': {
      color: 'white'} }} />
                <Tab label="CUSTOMERS" value="1" sx={{ color: 'white',  '&.Mui-selected': {
      color: 'white'} }} />
                <Tab label="SESSIONS" value="2" sx={{ color: 'white',  '&.Mui-selected': {
      color: 'white'} }} />
                <Tab label="TRAINING CALENDAR" value="3" sx={{ color: 'white',  '&.Mui-selected': {
      color: 'white'} }} />
              </Tabs>
            </Toolbar>
          </AppBar>

          <TabPanel value="0">

            <h2>Welcome to the personal trainer app!</h2>
            <p>We're here to help you improve. </p>

            <Button onClick={() => resetDatabase()}>Reset Database</Button>

          </TabPanel>

          <TabPanel value="1">
            <CustomerList />
          </TabPanel>

          <TabPanel value="2">
            <TrainingList />
          </TabPanel>

          <TabPanel value="3">
            <TrainingCalendar />
          </TabPanel>

        </TabContext>
      </Stack>

    </Container>
  )
}

export default App
