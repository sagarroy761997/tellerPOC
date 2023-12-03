import React from 'react'
import { Button, Box } from '@mui/material'
import axios from 'axios';

import { useTellerConnect } from 'teller-connect-react';
// const apiUrl = 'https://api.teller.io';


const TellerConnect = () => {

  // const [transactions, setTransactions] = React.useState([]);
  const [connectedData, setConnectedData] = React.useState(null);
  const { open, ready } = useTellerConnect({
    applicationId: "app_oo7l1g61s4ug5ac0o4000",
    environment: "sandbox",
    onSuccess: (data) => {
      console.log('Connected!', data);
      setConnectedData(data);
    },
    onFailure: (error) => console.error('Error:', error),
  });
  // const getAccountDetails = async () => {
  //   axios.get(`/accounts`, {
  //     method: 'GET',
  //     headers: {
  //       'Authorization': `Bearer ${connectedData.access_token}`,
  //       // 'Teller-Version': '2019-07-01'
  //     }
  //   })
  //     .then(response => console.log('response:', response))
  //     .then(accountData => console.log('accountData:', accountData))
  //     .catch(error => console.error('Error:', error));

  // };

  const getAccountBackend = async () => {
    await fetch('http://localhost:7000/api/accounts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${connectedData.access_token}`,
        // 'Teller-Version': '2019-07-01'
      },
      body: JSON.stringify({
        access_token: connectedData.access_token,
      })
    })
      .then(response => console.log('response:', response))
      // .then(accountData => console.log('accountData:', accountData))
      .catch(error => console.error('Error:', error));
  };

  return (
    <Box>
      <Button variant="contained" onClick={() => open()}>Teller Connect</Button>
      <Button variant="contained" onClick={getAccountBackend }>account</Button>



    </Box>
  )
}

export default TellerConnect