const express = require('express');
const app = express();
app.use(express.json()); // to parse JSON bodies


let books = [
  { id: 1, title: 'The Alchemist', author: 'Paulo Coelho' },
  { id: 2, title: 'Wings of Fire', author: 'A.P.J. Abdul Kalam' },
  { id: 3, title: 'Harry Potter', author: 'J.K. Rowling' }
];

app.get('/', (req, res) => {
  res.send('Welcome to Book API');
});


app.get('/books', (req, res) => {
  res.json(books);
});

app.post('/add-book', (req, res) => {
  const { title, author } = req.body;
  const newBook = {
    id: books.length + 1,
    title,
    author
  };
  books.push(newBook);
  res.status(201).json({ message: 'Book added!', book: newBook });
});
app.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, author } = req.body;

  const index = books.findIndex(book => book.id === bookId);

  if (index === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }

  if (title) books[index].title = title;
  if (author) books[index].author = author;

  res.json({ message: 'Book updated!', book: books[index] });
});


app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const index = books.findIndex(book => book.id === bookId);

  if (index === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }

  const removedBook = books.splice(index, 1)[0];

  res.json({ message: 'Book deleted successfully!', book: removedBook });
});


app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});
