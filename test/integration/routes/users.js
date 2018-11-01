import jwt from 'jsonwebtoken';

import HttpStatus from 'http-status';

describe('Route: Users', () => {

    const User = app.datasource.models.User;
    
    const secret = app.config.secret;

    const user = {
        id: 1,
        name: 'Tommy Vercetti',
        email: 'tommyvercetti@vicecity.com',
        password: 'ThisIsMyTown'
    };

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

            // Supertest documentation
            request
                .get('/users')
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {

                    // Chai documentation
                    expect(res.body[0].id).to.be.eql(user.id);
                    expect(res.body[0].name).to.be.eql(user.name);
                    expect(res.body[0].email).to.be.eql(user.email);

                    // Encrypted password
                    // Expect(res.body[0].password).to.be.eql(user.password);

                    done(err);
                });
        });
    });
    
    describe('Route GET /users/{id}', () => {
        it('Should return a single user', done => {

            request
                .get('/users/1')
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {

                    expect(res.body.id).to.be.eql(user.id);
                    expect(res.body.name).to.be.eql(user.name);
                    expect(res.body.email).to.be.eql(user.email);
                    
                    // Encrypted password
                    // Expect(res.body.password).to.be.eql(user.password);

                    done(err);
                });
        });
    });
    
    describe('Route POST /users', () => {
        it('Should create a single user', done => {

            const otherUser = {
                id: 2,
                name: 'Lance Vance',
                email: 'lancevance@vicecity.com',
                password: 'LanceVanceDance'
            };

            request
                .post('/users')
                .set('Authorization', `Bearer ${token}`)
                .send(otherUser)
                .end((err, res) => {

                    expect(res.body.id).to.be.eql(otherUser.id);
                    expect(res.body.name).to.be.eql(otherUser.name);
                    expect(res.body.email).to.be.eql(otherUser.email);
                    
                    // Encrypted password
                    // Expect(res.body.password).to.be.eql(otherUser.password);

                    done(err);
                });
        });
    });
    
    describe('Route PUT /users/{id}', () => {
        it('Should update a single user', done => {

            const updatedUser = {
                id: 1,
                name: 'Mr. Vercetti'
            };

            request
                .put('/users/1')
                .set('Authorization', `Bearer ${token}`)
                .send(updatedUser)
                .end((err, res) => {

                    // For put requests, the response will be the number of successful updates
                    expect(res.body).to.be.eql([1]);

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