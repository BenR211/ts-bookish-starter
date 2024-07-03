import { Router, Request, Response } from 'express';
import { runQuery} from '../databaseAPI/database_interactions'
class BookController {
    router: Router;

    constructor() {
        this.router = Router();
        this.router.get('/:id', this.getBook.bind(this));

        this.router.post('/', this.createBook.bind(this));
    }

    getBook(req: Request, res: Response) {
        // TODO: implement functionality
        runQuery("select * from books")
        .then((allBooks) => {
            res.json(allBooks)
        })
        .catch((err) => {
            res.send("your query is broken");
        })

    }

    createBook(req: Request, res: Response) {
        // TODO: implement functionality
        return res.status(500).json({
            error: 'server_error',
            error_description: 'Endpoint not implemented yet.',
        });
    }
}

export default new BookController().router;
