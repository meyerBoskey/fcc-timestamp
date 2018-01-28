const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();
const port = 3000;

// ejs middleware
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

// Public folder setup
app.use(express.static(__dirname + '/public'));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Index route
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/:date', (req, res, next) => {
    let naturalDate, unixDate, date;
    if(req.query.date)
        date = req.query.date;
    else
        date = req.query.unix;

    let dateFormat = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    if(isNaN(date)){
        naturalDate = new Date(date);
        naturalDate = naturalDate.toLocaleDateString("en-us", dateFormat);
        unixDate = new Date(date).getTime() / 1000;
    }else{
        unixDate = date;
        naturalDate = new Date(date * 1000);
        naturalDate = naturalDate.toLocaleDateString("en-us", dateFormat);
    }

    res.json({unix: unixDate, natural: naturalDate});
});

// Start server
const server = app.listen(port, () => {
    console.log(`server started on port ${port}`);
});
