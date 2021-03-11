/* Imports Packages */
const express = require('express')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors') 


/* Express App */
const app = express();
const port = 3030;

/* Imports Routes */
const toyRoutes = require('./api/toy/toy.controller')

/* Configuration */
app.use(express.static('public'))
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());


/* Routes */
app.use('/api/toy', toyRoutes)


/* Listen */
app.listen(port, () => {
      console.log(`Backend ready at http://localhost:${port}`)
})

