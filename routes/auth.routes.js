import jwt from 'jsonwebtoken';

import HttpStatus from 'http-status';

export default (app) => {

    const config = app.config;

    const User = app.datasource.models.User;

    app.route('/auth')
        .post((req, res) => {

            if (req.body.email && req.body.password) {

                const email = req.body.email;
                const password = req.body.password;

                User.findOne({ where: { email } })
                    .then((user) => {

                        if (!user || !User.isPassword(user.password, password)) {
                            res.sendStatus(HttpStatus.UNAUTHORIZED);
                        }

                        res.json({
                            token: jwt.encode({ id: user.id }, config.jwtSecret)
                        });
                    })
                    .catch(() => res.sendStatus(HttpStatus.UNAUTHORIZED));
            } else {
                res.sendStatus(HttpStatus.UNAUTHORIZED);
            }
        });
};