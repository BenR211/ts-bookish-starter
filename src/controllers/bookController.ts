import { Router, Request, Response } from 'express';
import { runQuery} from '../databaseAPI/database_interactions'
import { returnLibraryInFull, returnBooksFromAuthor, uploadToDataBase } from '../databaseAPI/sqlist_interactions';
class BookController {
    router: Router;

    constructor() {
        this.router = Router();
        this.router.get('/authorFilter', this.filterByAuther.bind(this));
        this.router.get('/uploadBook', this.uploadBook.bind(this))
        this.router.get('/:id', this.getBook.bind(this));
        
        this.router.post('/', this.createBook.bind(this));
    }

    uploadBook(req : Request, res : Response){
        uploadToDataBase({ISBN : 'ISBNfromapi', authorName : 'DAVE FROM API', bookName : 'Book from API', numberOfCopies : 33}, (err, result) => {
            if (err){
                return res.send(err)
            }

            res.send(result)
        })

    }

    getBook(req: Request, res: Response) {
        // TODO: implement functionality
        
        returnLibraryInFull((error, result) => {
            if (error){
                return res.send("there was an error in the backend")
            }
            else {
                return res.json(result)
            }
        });
        
        /*runQuery("select * from books")
        .then((allBooks) => {
            res.json(allBooks)
        })
        .catch((err) => {
            res.send("your query is broken");
        })
        */
    }

    createBook(req: Request, res: Response) {
        // TODO: implement functionality
        return res.status(500).json({
            error: 'server_error',
            error_description: 'Endpoint not implemented yet.',
        });
    }

    filterByAuther(req : Request, res : Response){

        if (req.query.name === undefined){
            console.log("the parameter was not provided")
            res.send("no parameter provided")

        }
        else {
            returnBooksFromAuthor({where : {authorName : req.query.name} ,attributes: ['authorName', 'bookName', 'numberOfCopies'],}, (err, result) =>{
                if (err){
                    res.send("there was an internal error")
                }
                else {
                    res.json(result)
                }
            })
        }
 

    }
}

export default new BookController().router;
