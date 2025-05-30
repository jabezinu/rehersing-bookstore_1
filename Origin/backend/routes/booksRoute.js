import express from "express"
import { Book } from "../models/bookModel.js";

const router = express.Router()


// Routes for saving a new Book
router.post('/', async (req, res) => {
    try {
        if(!req.body.title || !req.body.publishedYear || !req.body.author ){
            res.status(400).send({message: "Send all required fields"})
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishedYear: req.body.publishedYear,
        }

        const book = await Book.create(newBook)

        return res.status(201).send(book)        
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})

// route for Get All Books from database
router.get("/", async (req, res) => {
    try {
        const books = await Book.find({})

        return res.status(200).json({
            count: books.length,
            data: books
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: error.message})        
    }
})

// Route for Geting book by Id
router.get("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const book = await Book.findById(id);        

        return res.status(200).json(book)
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})

// Route for Update book by 
router.put("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishedYear: req.body.publishedYear,
        }
        const updatedBook = await Book.findByIdAndUpdate(id, newBook, {new: true});  
        
        if(!updatedBook){
            return res.status(400).json({message: "Book is faild to be updated"})
        }

        return res.status(200).json({message: "book is updaed succefully", data:updatedBook})
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})

// Route for Delete book 
router.delete("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const DeletedBook = await Book.findByIdAndDelete(id);  
        
        if(!DeletedBook){
            return res.status(400).json({message: "Book is faild to be Deleted"})
        }

        return res.status(200).json({message: "Book is deleted successfuly"})
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})

export default router;