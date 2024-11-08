//loading required modules
const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const flash = require('connect-flash');
const path = require('path');
var cors = require('cors')

//loading local files and models
const foodRouter = require('./routes/food').router;
const userRouter = require('./routes/user').router;
const featuredRouter = require('./routes/featured').router;
const searchRouter = require('./routes/search').router;
const roleRouter = require('./routes/role').router;
const emailRouter = require('./routes/email').router;
const orderRouter = require('./routes/orders').router;
const mapsRouter = require('./routes/nearby').router;
const oauth = require('./routes/oauth').router;


//configure app and middleware
const app = express();
app.use(cors());

app.use(bodyParser.json({limit: '50mb' }));

app.use(express.static(__dirname + "/"));
app.set("view engine", "hbs");


//define port
const port = process.env.PORT || 3002;

//APi Routes for getting or posting data
app.use('/food', foodRouter);
app.use('/user', userRouter);
app.use('/featured', featuredRouter);
app.use('/search', searchRouter);
app.use('/role', roleRouter);
app.use('/email', emailRouter);
app.use('/orders', orderRouter);
app.use('/nearby', mapsRouter);
app.use('/oauth', oauth);

app.get('/', (req,res) => {
    res.render("default.hbs");
});

app.listen(port, () => {
    console.log ("App listening to Port", port);
    console.log("Visit the app here http://127.0.0.1:3000");
});