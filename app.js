var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fetchOperatingStatus = require('fetch-db-operating-status');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/alert', async function (req, res, next) {
    var result = await fetchOperatingStatus().catch((end) => {
        return {
            messageId: 0,
            translations: {
                en: {
                    title: 'No Alerts',
                    message: 'null',
                    link: 'null'
                },
                de: {
                    title: 'Kein Alarm',
                    message: 'null',
                    link: 'null'
                }
            }
        }
    });

    res.status(200).send({
        success: 'true',
        message: result
    });
});


module.exports = app;
