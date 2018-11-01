import HttpStatus from 'http-status';

import { defaultResponse, errorResponse } from '../common/responses';

export default class BooksController {

    constructor (Book) {
        
        this.Book = Book;
    }

    getAll () {

        // Return this.Book.findAll({})
        //     .then((result) => res.json(result))
        //     .catch((error) => res.status(412).json(err));

        return this.Book.findAll({})
            .then((result) => defaultResponse(result))
            .catch((error) => errorResponse(error.message));
    }

    getById (params) {

        return this.Book.findOne({ where: params })
            .then((result) => defaultResponse(result))
            .catch((error) => errorResponse(error.message));
    }

    create (data) {

        return this.Book.create(data)
            .then((result) => defaultResponse(result, HttpStatus.CREATED))
            .catch((error) => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
    }

    update (data, params) {

        return this.Book.update(data, { where: params })
            .then((result) => defaultResponse(result))
            .catch((error) => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
    }

    delete (params) {

        return this.Book.destroy({ where: params })
            .then((result) => defaultResponse(result, HttpStatus.NO_CONTENT))
            .catch((error) => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
    }
}