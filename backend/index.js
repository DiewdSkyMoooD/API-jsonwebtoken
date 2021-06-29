const express = require('express')
const cors=require('cors')
require('dotenv').config()
const app = express()

//config
app.set('port',process.env.PORT||3000)
//midlewares
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors({origin:'*',optionsSuccessStatus:200}))
//router
app.use(require('./routes.js'))


app.listen(app.get('port'), () => console.log(`ready port ${app.get('port')}`));