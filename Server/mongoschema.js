/* const mongoose = require('mongoose');
const bookMongModel = mongoose.model();

url = `mongodb+srv://umar:123@cluster0.foq8i.mongodb.net/db?retryWrites=true&w=majority`;
mongoose.connect(url);
mongoose.connection.once('open', () => console.log('Database Connected'));



const bookModel = new bookMongModel('book', {
    id: Number,
    name: String,
    genre: String
});

const authorModel = new bookMongModel('author', {
    authorId: Number,
    age: Number,
    name: String,
})
 */