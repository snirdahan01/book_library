import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addBook, clearNewBook } from '../../actions';
import '../../styles/register.css';

//Add new book component
class AddBook extends Component {

    state = {
        formdata: {
            title: '',
            author: '',
            review: '',
            pages: '',
            rating: '1',
            price: ''
        }
    }

    //saving to form inputs to state
    handelInput = (event,name) => {
        const newFormdata = {...this.state.formdata};
        newFormdata[name] = event.target.value;

        this.setState({
            formdata: newFormdata
        })
    }

    //show the new added book
    showNewBook = (book) => (
        book.post ? 
            <div className="conf_link">
                Your book added successfully !! <br/><Link to={`/books/${book.bookId}`}>
                    Click the link to see the book.
                </Link>
            </div>
        : null
    )

    submitForm = (e) => {
        e.preventDefault();
        
        this.props.dispatch(addBook({ //add the new book
            ...this.state.formdata,
            ownerId: this.props.user.login.id
        }));
    }

    // clear new book info after added
    componentWillUnmount(){
        this.props.dispatch(clearNewBook());
    }

    render() {                
        return (
            <div className="rl_container article">
                <form onSubmit={this.submitForm}>
                    <h2>Add a review</h2>

                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter book title"
                            value={this.state.formdata.title}
                            onChange={(event) => this.handelInput(event,'title')}
                        />
                    </div>

                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter author"
                            value={this.state.formdata.author}
                            onChange={(event) => this.handelInput(event,'author')}
                        />
                    </div>

                    <textarea
                        value={this.state.formdata.review}
                        placeholder="Enter review"
                        onChange={(event) => this.handelInput(event,'review')}
                    />

                    <div className="form_element">
                        <input
                            type="number"
                            placeholder="Enter pages"
                            value={this.state.formdata.pages}
                            onChange={(event) => this.handelInput(event,'pages')}
                        />
                    </div>

                    <div className="form_element">
                        <select
                            value={this.state.formdata.rating}
                            onChange={(event) => this.handelInput(event,'rating')}
                        >
                            <option val="1">1 &#9734; (Rating)</option>
                            <option val="2">2 &#9734; &#9734;</option>
                            <option val="3">3 &#9734; &#9734; &#9734;</option>
                            <option val="4">4 &#9734; &#9734; &#9734; &#9734;</option>
                            <option val="5">5 &#9734; &#9734; &#9734; &#9734; &#9734;</option>
                        </select>
                    </div>

                    <div className="form_element">
                        <input
                            type="number"
                            placeholder="Enter price"
                            value={this.state.formdata.price}
                            onChange={(event) => this.handelInput(event,'price')}
                        />
                    </div>

                    <button type="submit">Add review</button>
                    {
                        this.props.books.newBook ?
                            this.showNewBook(this.props.books.newBook)
                        : null
                    }

                </form>
            </div>
        );
    }
}

function mapStateToProps(state){    
    return {
        books: state.books
    }
}

export default connect(mapStateToProps)(AddBook);