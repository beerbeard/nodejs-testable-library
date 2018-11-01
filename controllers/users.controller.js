import HttpStatus from 'http-status';

import { defaultResponse, errorResponse } from '../common/responses';

export default class UsersController {

    constructor (User) {

        this.User = User;
    }

    getAll () {

        return this.User.findAll({})
            .then(result => defaultResponse(result))
            .catch(error => errorResponse(error.message));
    }

    getById (params) {

        return this.User.findOne({ where: params })
            .then(result => defaultResponse(result))
            .catch(error => errorResponse(error.message));
    }

    create (data) {

        return this.User.create(data)
            .then(result => defaultResponse(result, HttpStatus.CREATED))
            .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
    }

    update (data, params) {

        return this.User.update(data, { where: params })
            .then(result => defaultResponse(result))
            .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
    }

    delete (params) {

        return this.User.destroy({ where: params })
            .then(result => defaultResponse(result, HttpStatus.NO_CONTENT))
            .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
    }
}