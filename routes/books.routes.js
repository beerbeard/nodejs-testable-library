import BooksController from '../controllers/books.controller';

export default (app) => {

    const controller = new BooksController(app.datasource.models.Book);

    app.route('/books')

        // Add authentication to all routes
        .all(app.auth.authenticate())
        .get((req, res) => {

            // Books.findAll({})
            //     .then(result => res.json(result))
            //     .catch(err => res.status(412).json(err));

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

    app.route('/books/:id')
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