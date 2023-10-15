import express from 'express'
import handlebars from 'express-handlebars'
import path from 'path'
import {__dirname} from '../utils.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../public')));

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'handlebars')

app.get('/', (req,res)=>{
    const user = { firstName: 'Rick', lastName: 'Sanchez'}
    res.render('index', user)
})

export default app