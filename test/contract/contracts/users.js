import jwt from 'jsonwebtoken';

import HttpStatus from 'http-status';

describe('Route: Users', () => {

    const User = app.datasource.models.User;

    const secret = app.config.secret;

    const user = {
        id: 1,
        name: 'Ken Rosenberg',
        email: 'kenrosenberg@vicecity.com',
        password: 'ThisIsADisaster'
    }

    let token = '';

    beforeEach(done => {
        User
            .destroy({ where: {} })
            .then(() => User.create(user))
            .then((response) => {
                token = jwt.sign({ id: response.id }, secret);
                done();
            });
    });

    describe('Route GET /users', () => {
        it('Should return a list of users', done => {

            // See Joi documentation
            const joiList = Joi.array().items(Joi.object().keys({
                id: Joi.number(),
                name: Joi.string(),
                email: Joi.string(),
                password: Joi.string(),
                created_at: Joi.date().iso(),
                updated_at: Joi.date().iso()
            }));


            // See Supertest documentation
            request
                .get('/users')
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {

                    // See Joi documentation
                    joiAssert(res.body, joiList);

                    done(err);
                });
        });
    });

    describe('Route GET /users/{id}', () => {
        it('Should return a single user', done => {

            const joiUser = Joi.object().keys({
                id: Joi.number(),
                name: Joi.string(),
                email: Joi.string(),
                password: Joi.string(),
                created_at: Joi.date().iso(),
                updated_at: Joi.date().iso()
            });

            request
                .get('/users/1')
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {

                    joiAssert(res.body, joiUser);

                    done(err);
                });
        });
    });

    describe('Route POST /users', () => {
        it('Should create a single user', done => {

            const joiUser = Joi.object().keys({
                id: Joi.number(),
                name: Joi.string(),
                email: Joi.string(),
                password: Joi.string(),
                created_at: Joi.date().iso(),
                updated_at: Joi.date().iso()
            });

            const postUser = {
                id: 2,
                name: 'Second User',
                email: 'Jeferson Kal Lyns',
                password: 'Some password'
            };

            request
                .post('/users')
                .send(postUser)
                .end((err, res) => {

                    joiAssert(res.body, joiUser);

                    done(err);
                });
        });
    });

    describe('Route PUT /users/{id}', () => {
        it('Should update a single user', done => {

            const updatedUser = {
                id: 1,
                name: 'Updated User',
                email: 'Jeferson Kal Lyns',
                password: 'Some password'
            };

            const updatedCount = Joi.array().items(1);

            request
                .put('/users/1')
                .set('Authorization', `Bearer ${token}`)
                .send(updatedUser)
                .end((err, res) => {

                    // For put requests, the response will be the number of successful updates
                    joiAssert(res.body, updatedCount);

                    done(err);
                });
        });
    });

    describe('Route DELETE /users/{id}', () => {
        it('Should delete a single user', done => {

            request
                .delete('/users/1')
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {

                    // For delete requests, just need to expect the 204 response (empty content)
                    // More information: https://httpstatuses.com/204
                    expect(res.statusCode).to.be.eql(HttpStatus.NO_CONTENT);

                    done(err);
                });
        });
    });
});