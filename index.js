"use strict";

const logger = require('./utils/logger')();
const PORT = process.env.PORT || 5000;
const express = require('express');
const app = express();
const compression = require('compression');
var bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('./models/user');
app.use(express.json());
app.use(compression())

const mongoose = require("mongoose");

// Connection URL
const CONNECTION_URI = process.env.MONGODB_URI || "mongodb://localhost/users";

mongoose.connect(CONNECTION_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (err) => {
    if (err) {
        logger.red(err);
    };
});
mongoose.Promise = Promise;

app.listen(PORT, () => {
    logger.green(`Server Setup Listening on Port ${PORT}`);
});

app.post('/loginUser', async (req, res) => {
    // Input Info
    // email
    // Password

    // Return a session cookie 
    // return success
    let foundUser = await User.find({
        email: req.body.email
    }).exec();
    if (foundUser.length > 0) {
        res.statusCode = 400;
        return res.json({
            status: "failed"
        });
    }

    let hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    if (foundUser[0].password == hashedPassword) {
        res.statusCode = 200;
        return res.json({
            status: "success"
        });
    }
    res.statusCode = 400;
    return res.json({
        status: "failed"
    });
});

app.post('/forgotPassword', async (req, res) => {
    let foundUser = await User.find({
        email: req.body.email
    }).exec();
    if (foundUser.length > 0) {
        res.statusCode = 400;
        return res.json({
            status: "Email not found"
        });
    }
    let hashedPassword = await bcrypt.hash(req.body.answer, saltRounds);

    if (foundUser[0] == hashedPassword) {
        res.statusCode = 200;
        return res.json({
            status: "Success"
        })
    }
    res.statusCode = 400;
    return res.json({
        status: "Wrong answer"
    });
});

app.post('/newpassword', async (req, res) => {
    let hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    await User.findOneAndUpdate({
        userName: req.body.username
    }, {
        password: hashedPassword
    });
    res.statusCode = 200;
    return res.json({
        status: "success"
    });
})

app.post('/createuser', async (req, res) => {
    let foundUser = await User.find({
        email: req.body.email
    }).exec();
    if (foundUser.length > 0) {
        res.statusCode = 400;
        return res.json({
            status: "Already created"
        });
    }

    let hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    let hashedAnswer = await bcrypt.hash(req.body.securityAnswer, saltRounds);

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: hashedPassword,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        securityAnswer: hashedAnswer
    });
    await user.save();

    res.statusCode = 200;
    return res.json({
        status: "success"
    })
})

app.post('/updateProfile', async (req, res) => {
    // Input Info
    // First name
    // Last name
    // Address

    await User.findOneAndUpdate({
        email: req.body.email
    }, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
    });
    res.statusCode = 200;
    return res.json({
        status: "success"
    });
});

app.post("/deleteProfile", async (req, res) => {
    // Deletes Profile
    // Email
    await User.findOneAndDelete({
        email: req.body.email
    });
    res.statusCode = 200;
    return res.json({
        status: "success"
    });
});

app.post("/createreport", async (req, res) => {
    // Creates report
    // Email
    // Address
    // Issue Type
    // Description
    const report = new Report({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        address: req.body.address,
        issueType: req.body.issueType,
        description: req.body.description
    });
    await report.save();
    return res.statusCode(200).json({
        status: "success"
    });
})

app.post('/editreport', async (req, res) => {
    // Post ID based on what is edited
    // ID
    // Address
    // Issue Type
    // Description
    await Report.findOneAndUpdate({
        _id: req.body.id
    }, {
        address: req.body.address,
        issueType: req.body.issueType,
        description: req.body.description,
    });
    res.statusCode = 200;
    return res.json({
        status: "success"
    });
})

app.post('/getusersreports', async (req, res) => {
    // Post Email for user Reports
    // Email
    // Returns an array of objects (id, email, address, issueType, description)
    let foundUser = await Report.find({
        email: req.body.email
    }).exec();

    if (foundUser.length == 0) {
        res.statusCode = 200;
        return res.json({
            reports: []
        });
    }

    res.statusCode = 200;
    return res.json({
        reports: foundUser
    });

});
