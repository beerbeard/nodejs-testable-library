import HttpStatus from 'http-status';

import UsersController from '../../../controllers/users.controller';

describe('Controller: Users', () => {

    describe('Get all users: getAll()', () => {
        it('Should return a list of users', () => {

            // Mocking promise
            const User = {
                findAll: testdouble.function()
            };

            const usersController = new UsersController(User);

            const expectedResponse = [
                {
                    id: 1,
                    name: 'Tommy Vercetti',
                    email: 'tommyVercetti@vicecity.com',
                    password: 'SomePassword',
                    created_at: '2018-10-24T11:22:36.692Z',
                    updated_at: '2018-10-24T11:22:36.692Z'
                }
            ];

            testdouble.when(User.findAll({})).thenResolve(expectedResponse);

            return usersController.getAll()
                .then((response) => expect(response.data).to.be.eql(expectedResponse));
        });
    });

    describe('Get user: getById(params)', () => {
        it('Should return a single user', () => {

            const User = {
                findOne: testdouble.function()
            };

            const usersController = new UsersController(User);

            const expectedResponse = {
                id: 1,
                name: 'Tommy Vercetti',
                email: 'tommyVercetti@vicecity.com',
                password: 'SomePassword',
                created_at: '2018-10-24T11:22:36.692Z',
                updated_at: '2018-10-24T11:22:36.692Z'
            };

            testdouble.when(User.findOne({ where: { id: 1 } })).thenResolve(expectedResponse);

            return usersController.getById({ id: 1 })
                .then(response => expect(response.data).to.be.eql(expectedResponse));
        });
    });

    describe('Create users: create(data)', () => {
        it('Should create a single user', () => {

            const User = {
                create: testdouble.function()
            };

            const usersController = new UsersController(User);

            const requestBody = {
                name: 'Mr. Vercetti'
            };

            const expectedResponse = {
                id: 1,
                name: 'Tommy Vercetti',
                email: 'tommyVercetti@vicecity.com',
                password: 'SomePassword',
                created_at: '2018-10-24T11:22:36.692Z',
                updated_at: '2018-10-24T11:22:36.692Z'
            };

            testdouble.when(User.create(requestBody)).thenResolve(expectedResponse);

            return usersController.create(requestBody)
                .then(response => {

                    // Adding two validator
                    expect(response.statusCode).to.be.eql(201);
                    expect(response.data).to.be.eql(expectedResponse);
                });
        });
    });

    describe('Update users: update(data, params)', () => {
        it('Should update a single user', () => {

            const User = {
                update: testdouble.function()
            };

            const usersController = new UsersController(User);

            const requestBody = {
                name: 'Expected Book'
            };

            const expectedResponse = {
                id: 1,
                name: 'Tommy Vercetti',
                email: 'tommyVercetti@vicecity.com',
                password: 'SomePassword',
                created_at: '2018-10-24T11:22:36.692Z',
                updated_at: '2018-10-24T11:22:36.692Z'
            };

            testdouble.when(User.update(requestBody, { where: { id: 1 } })).thenResolve(expectedResponse);

            return usersController.update(requestBody, { id: 1 })
                .then(response => expect(response.data).to.be.eql(expectedResponse));
        });
    });

    describe('Delete users: delete(params)', () => {
        it('Should delete a single user', () => {

            const User = {
                destroy: testdouble.function()
            };

            const usersController = new UsersController(User);

            testdouble.when(User.destroy({ where: { id: 1 } })).thenResolve();

            return usersController.delete({ id: 1 })
                .then(response => expect(response.statusCode).to.be.eql(HttpStatus.NO_CONTENT));
        });
    });
});