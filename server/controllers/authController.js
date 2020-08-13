const bcrypt = require('bcrypt');

module.exports = {
    login: async (req, res) => {
        console.log("Login Called");
        const db = req.app.get('db');
        let { email, password } = req.body;
        const user = await db.check_user([email]);
        if (!user[0]) {
            return res.status(404).send('User does not exist');
        } else {
            const authenticated = bcrypt.compareSync( password, user[0].password )
            if (authenticated) {
                req.session.user = {
                    userId: user[0].user_id,
                    email: user[0].email
                }
                console.log(`Login Successful User: ${email}`);
                res.status(200).send(req.session.user)
            } else {
                res.status(403).send('Email or Password Incorrect');
            }
        }
    },
    register: async (req, res) => {
        console.log("Register Called");
        const db = req.app.get('db');
        let {firstName, lastName, email, password } = req.body;
        const existingUser = await db.check_user([email]);
        if (existingUser[0]) {
            console.log("Register Failed Duplicate");
            return res.status(409).send('Email Already Registered');
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const newUser = await db.create_user( [firstName, lastName, email, hash] );
        req.session.user = {
            userId: newUser[0].user_id,
            email: newUser[0].email,
            firstName: newUser[0].first_name,
            lastName: newUser[0].last_name
        }
        console.log(`Register Successful User: ${email}`);
        res.status(200).send(req.session.user);
    },
    logout: (req, res) => {
        console.log("Logout Called");
        req.session.destroy();
        res.status(200);
    },
    getUser: (req, res) => {
        console.log("Get User Called");
        if (req.session.user) {
            res.status(200).send(req.session.user)
        } else {
            res.sendStatus(404)
        }
    }
}