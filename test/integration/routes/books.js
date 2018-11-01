import jwt from 'jsonwebtoken';

import HttpStatus from 'http-status';

describe('Route: Books', () => {

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

            // Supertest documentation
            request
                .get('/books')
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {

                    // Chai documentation
                    expect(res.body[0].id).to.be.eql(book.id);
                    expect(res.body[0].name).to.be.eql(book.name);
                    expect(res.body[0].author).to.be.eql(book.author);
                    expect(res.body[0].description).to.be.eql(book.description);

                    done(err);
                });
        });
    });

    describe('Route GET /books/{id}', () => {
        it('Should return a single book', done => {

            request
                .get('/books/1')
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {

                    expect(res.body.id).to.be.eql(book.id);
                    expect(res.body.name).to.be.eql(book.name);
                    expect(res.body.author).to.be.eql(book.author);
                    expect(res.body.description).to.be.eql(book.description);

                    done(err);
                });
        });
    });

    describe('Route POST /books', () => {
        it('Should create a single book', done => {

            const otherBook = {
                id: 2,
                name: 'Second Book',
                author: 'Jeferson Kal Lyns',
                description: 'Some description'
            };

            request
                .post('/books')
                .set('Authorization', `Bearer ${token}`)
                .send(otherBook)
                .end((err, res) => {

                    expect(res.body.id).to.be.eql(otherBook.id);
                    expect(res.body.name).to.be.eql(otherBook.name);
                    expect(res.body.author).to.be.eql(otherBook.author);
                    expect(res.body.description).to.be.eql(otherBook.description);

                    done(err);
                });
        });
    });

    describe('Route PUT /books/{id}', () => {
        it('Should update a single book', done => {

            const updatedBook = {
                id: 1,
                name: 'Updated Book'
            };

            request
                .put('/books/1')
                .set('Authorization', `Bearer ${token}`)
                .send(updatedBook)
                .end((err, res) => {

                    // For put requests, the response will be the number of successful updates
                    expect(res.body).to.be.eql([1]);

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