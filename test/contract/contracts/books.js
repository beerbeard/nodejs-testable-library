import jwt from 'jsonwebtoken';

import HttpStatus from 'http-status';

describe('Contract: Books', () => {

    const Book = app.datasource.models.Book;
    const User = app.datasource.models.User;

    const secret = app.config.secret;

    const book = {
        id: 1,
        name: 'Default Book',
        author: 'Jeferson Kal Lyns',
        description: 'Some description'
    };

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
                Book
                    .destroy({ where: {} })
                    .then(() => Book.create(book))
                    .then(() => {
                        token = jwt.sign({ id: response.id }, secret);
                        done();
                    });
            });
    });

    describe('Route GET /books', () => {
        it('Should return a list of books', done => {

            // See Joi documentation
            const joiList = Joi.array().items(Joi.object().keys({
                id: Joi.number(),
                name: Joi.string(),
                author: Joi.string(),
                description: Joi.string(),
                created_at: Joi.date().iso(),
                updated_at: Joi.date().iso()
            }));


            // See Supertest documentation
            request
                .get('/books')
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {

                    // See Joi documentation
                    joiAssert(res.body, joiList);

                    done(err);
                });
        });
    });

    describe('Route GET /books/{id}', () => {
        it('Should return a single book', done => {

            const joiBook = Joi.object().keys({
                id: Joi.number(),
                name: Joi.string(),
                author: Joi.string(),
                description: Joi.string(),
                created_at: Joi.date().iso(),
                updated_at: Joi.date().iso()
            });

            request
                .get('/books/1')
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {

                    joiAssert(res.body, joiBook);

                    done(err);
                });
        });
    });

    describe('Route POST /books', () => {
        it('Should create a single book', done => {

            const joiBook = Joi.object().keys({
                id: Joi.number(),
                name: Joi.string(),
                author: Joi.string(),
                description: Joi.string(),
                created_at: Joi.date().iso(),
                updated_at: Joi.date().iso()
            });

            const postBook = {
                id: 2,
                name: 'Second Book',
                author: 'Jeferson Kal Lyns',
                description: 'Some description'
            };

            request
                .post('/books')
                .send(postBook)
                .end((err, res) => {

                    joiAssert(res.body, joiBook);

                    done(err);
                });
        });
    });

    describe('Route PUT /books/{id}', () => {
        it('Should update a single book', done => {

            const updatedBook = {
                id: 1,
                name: 'Updated Book',
                author: 'Jeferson Kal Lyns',
                description: 'Some description'
            };

            const updatedCount = Joi.array().items(1);

            request
                .put('/books/1')
                .set('Authorization', `Bearer ${token}`)
                .send(updatedBook)
                .end((err, res) => {

                    // For put requests, the response will be the number of successful updates
                    joiAssert(res.body, updatedCount);

                    done(err);
                });
        });
    });

    describe('Route DELETE /books/{id}', () => {
        it('Should delete a single book', done => {

            request
                .delete('/books/1')
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