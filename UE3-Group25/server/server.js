/*jslint node: true */
/*jslint esversion: 6*/
/*jslint eqeqeq: true */

/* global require */

(function() {
    "use strict";

    const express = require("express");
    const app = express();
    const fs = require("fs");

    const bodyParser = require("body-parser");
    const cors = require("cors");

    let user = {};
    let available;

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(cors());

    // TODO add REST methods

    app.post('/login', authenticate);

    app.post('/changepassword', changePassword);

    app.get('/devices', getAvailable)

    /**
     * Send the list of available devices to the client
     * @param req The request
     * @param res The response
     */
    function getAvailable(req, res) {
        // TODO send list of available devices to the client
        res.json(available.devices);
    }

    /**
     * Authenticate the user specified in the request
     * @param req The request
     * @param res The response
     */
    function authenticate(req, res) {
        // TODO check credentials and respond to client accordingly
        let reqUsername = req.body.username;
        let reqPassword = req.body.password;
        if(user.username === reqUsername && user.password === reqPassword)
            res.status(200).end();
        else
            res.status(401).end();
    }

    /**
     * Change the users password and store it to the login config file
     * @param req The request
     * @param res The response
     */
    function changePassword(req, res) {
        // TODO check old password and store new password
        let reqOldPassword = req.body.oldPassword;
        let reqNewPassword = req.body.newPassword;
        if(user.password === reqOldPassword) {
            updateUser(reqNewPassword);
            res.status(200).end();
        } else
            res.status(401).end();
    }

    /**
     * Read the user data from the login config file, parse it and store it in 'user'
     */
    function readUser() {
        // TODO load user data from file
		var lineReader = require('readline').createInterface({
		  input: fs.createReadStream('resources/login.config')
		});

		lineReader.on('line', function (line) {
            let splittedString = line.split(':');
            if(splittedString[0] == 'username')
                user.username = splittedString[1].trim();
            else if(splittedString[0] == 'password')
                user.password = splittedString[1].trim();
            if(user.username && user.password) {   
                console.log('Username:' + user.username);
                console.log('Password:' + user.password);
            }
		});
    }

    /**
     * Read the available devices data from the json file and store it in 'available'
     */
    function readAvailable() {
        // TODO load available devices from file
        available = JSON.parse(fs.readFileSync('resources/devices.json'));
    }

    const server = app.listen(8081, function() {
        readUser();
        readAvailable();

        const host = server.address().address;
        const port = server.address().port;
        console.log("Big Smart Production Server listening at http://%s:%s", host, port);
    });

    function updateUser(newPassword) {
        user.password = newPassword;
        fs.writeFileSync('resources/login.config', "username: " + user.username + "\n" + "password: "+ user.password);
    }
})();
