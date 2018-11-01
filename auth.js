import passport from 'passport';

import { Strategy, ExtractJwt } from 'passport-jwt';

export default (app) => {

    const User = app.datasource.models.User;

    const options = {};

    options.secretOrKey = app.config.secret;
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

    const strategy = new Strategy(options, (payload, done) => {

        User.findByPk(payload.id)
            .then(user => {

                if (user) {
                    return done(null, {
                        id: user.id,
                        email: user.email
                    });
                } 
                
                return done(null, false);
            })
            .catch(error => done(error, null));
    });

    // Can use other strategies like OAuth2
    // We're currently using a JWT Token strategy 
    passport.use(strategy);

    return {

        initialize: () => passport.initialize(),
        authenticate: () => passport.authenticate('jwt', { session: app.config.session })
    }
};