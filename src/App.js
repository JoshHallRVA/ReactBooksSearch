import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import Header from './components/Nav/Header';

function App() {

  const [book, setBook] = useState("");
  const [result, setResult] = useState([]);
 


  const handleChange = event => {
    const book = event.target.value;
    
    setBook(book);
  }

  const handleSubmit = event => {
    event.preventDefault();
    
    console.log(book)
    axios.get("https://www.googleapis.com/books/v1/volumes?q=" + book + "&key=AIzaSyBZG0D3zM6MeYL7PtDoRCa8fd-0xiGVRhk")
      .then(data => {
        const { items } = data.data;
        console.log("item",items);
        setResult(items)
     
      })
      .catch(err => console.log(err));
  }

 

  return (
    <div>
      <Header />
      <h3 className="intro">Enter a book title to start your search!</h3>
      <form>
        <div className="container">
        <div className="form-group">
          <input type="text"
            onChange={handleChange}
            className="form-control mt-10"
            placeholder="search for books"
            autoComplete="off" />
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-danger">Search</button>
        </div>
        </div>
      </form>
      {result.map(book => (
        <div className="book-listing" key={book._id}>
        <a target="_blank" href={book.volumeInfo.previewLink}>
          <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.title} />
        </a>
        <p>{book.volumeInfo.title}</p>
        <p>{book.volumeInfo.authors}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
 