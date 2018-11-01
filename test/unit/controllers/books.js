import HttpStatus from 'http-status';

import BooksController from '../../../controllers/books.controller';

describe('Controller: Books', () => {

    describe('Get all books: getAll()', () => {
        it('Should return a list of books', () => {

            // Mocking promise
            const Book = {
                findAll: testdouble.function()
            };

            const booksController = new BooksController(Book);

            const expectedResponse = [
                {
                    id: 1,
                    name: 'Expected Book',
                    author: 'Jeferson Kal Lyns',
                    description: 'Some description',
                    created_at: '2018-10-24T11:22:36.692Z',
                    updated_at: '2018-10-24T11:22:36.692Z'
                }
            ];

            testdouble.when(Book.findAll({})).thenResolve(expectedResponse);

            return booksController.getAll()
                .then((response) => expect(response.data).to.be.eql(expectedResponse));
        });
    });

    describe('Get book: getById(params)', () => {
        it('Should return a single book', () => {

            const Book = {
                findOne: testdouble.function()
            };

            const booksController = new BooksController(Book);

            const expectedResponse = {
                id: 1,
                name: 'Expected Book',
                author: 'Jeferson Kal Lyns',
                description: 'Some description',
                created_at: '2018-10-24T11:22:36.692Z',
                updated_at: '2018-10-24T11:22:36.692Z'
            };

            testdouble.when(Book.findOne({ where: { id: 1 } })).thenResolve(expectedResponse);

            return booksController.getById({ id: 1 })
                .then(response => expect(response.data).to.be.eql(expectedResponse));
        });
    });

    describe('Create books: create(data)', () => {
        it('Should create a single book', () => {

            const Book = {
                create: testdouble.function()
            };

            const booksController = new BooksController(Book);

            const requestBody = {
                name: 'Expected Book'
            };

            const expectedResponse = {
                id: 1,
                name: 'Expected Book',
                author: 'Jeferson Kal Lyns',
                description: 'Some description',
                created_at: '2018-10-24T11:22:36.692Z',
                updated_at: '2018-10-24T11:22:36.692Z'
            };

            testdouble.when(Book.create(requestBody)).thenResolve(expectedResponse);

            return booksController.create(requestBody)
                .then(response => {

                    // Adding two validator
                    expect(response.statusCode).to.be.eql(201);
                    expect(response.data).to.be.eql(expectedResponse);
                });
        });
    });

    describe('Update books: update(data, params)', () => {
        it('Should update a single book', () => {

            const Book = {
                update: testdouble.function()
            };

            const booksController = new BooksController(Book);

            const requestBody = {
                name: 'Expected Book'
            };

            const expectedResponse = {
                id: 1,
                name: 'Expected Book',
                author: 'Jeferson Kal Lyns',
                description: 'Some description',
                created_at: '2018-10-24T11:22:36.692Z',
                updated_at: '2018-10-24T11:22:36.692Z'
            };

            testdouble.when(Book.update(requestBody, { where: { id: 1 } })).thenResolve(expectedResponse);

            return booksController.update(requestBody, { id: 1 })
                .then(response => expect(response.data).to.be.eql(expectedResponse));
        });
    });

    describe('Delete books: delete(params)', () => {
        it('Should delete a single book', () => {

            const Book = {
                destroy: testdouble.function()
            };

            const booksController = new BooksController(Book);

            testdouble.when(Book.destroy({ where: { id: 1 } })).thenResolve();

            return booksController.delete({ id: 1 })
                .then(response => expect(response.statusCode).to.be.eql(HttpStatus.NO_CONTENT));
        });
    });
});