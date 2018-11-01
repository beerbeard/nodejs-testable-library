
import UsersController from '../controllers/users.controller';

export default (app) => {

    const controller = new UsersController(app.datasource.models.User);

    app.route('/users')
        .all(app.auth.authenticate())
        .get((req, res) => {

            controller.getAll()
                .then(response => {
                    res.status(response.statusCode);
                    res.json(response.data);
                })
                .catch();
        })
        .post((req, res) => {

            controller.create(req.body)
                .then(response => {
                    res.status(response.statusCode);
                    res.json(response.data);
                })
                .catch();
        });

    app.route('/users/:id')
        .all(app.auth.authenticate())
        .get((req, res) => {

            controller.getById(req.params)
                .then(response => {
                    res.status(response.statusCode);
                    res.json(response.data);
                })
                .catch();
        })
        .put((req, res) => {

            controller.update(req.body, req.params)
                .then(response => {
                    res.status(response.statusCode);
                    res.json(response.data);
                })
                .catch();
        })
        .delete((req, res) => {

            controller.delete(req.params)
                .then(response => {

                    // Use "sendStatus" instead "status" if you want to return a empty body
                    res.sendStatus(response.statusCode);
                })
                .catch();
        });
};