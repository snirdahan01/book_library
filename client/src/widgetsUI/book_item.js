import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/book.css';

const BookItem = (item) => {
    return (
        <Link to={`/books/${item._id}`} className="book_item">
            <div className="book_header">
                <h2>{item.title}</h2>
            </div>
            <div className="book_item">
                <div className="book_author">{item.author}</div>

                <div className="book_bubble">
                    <strong>Price</strong> $ {item.price}
                </div>

                <div className="book_bubble">
                    <strong>Pages</strong> {item.pages}
                </div>

                <div className="book_bubble rating">
                    <strong>Rating</strong> {item.rating}
                </div>
            </div>
        </Link>
    );
};

export default BookItem;