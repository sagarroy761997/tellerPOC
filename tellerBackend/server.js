
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser')

const app = express();
const port = 7000;
// use body parser middleware
app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
}));

app.post('/api/accounts', async (req, res) => {
  const { access_token } = req.body;
  console.log('access_token:', access_token);

  try {
    const response = await axios.get('https://teller.io/accounts', {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });

    const data = response.data;
    console.log(data);
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data from Teller API');
  }
});






app.get('/', (req, res) => {
  res.send('Hello, world! this is a teller ba, nk intigration POC');
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

