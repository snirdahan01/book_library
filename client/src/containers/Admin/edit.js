import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getBook, updateBook, clearBook, deleteBook } from '../../actions';
import '../../styles/register.css';
import '../../styles/user.css';

//Add new book component
class EditBook extends PureComponent {

    state = {
        formdata: {
            _id: this.props.match.params.id, //id of the book we want to edit
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

    submitForm = (e) => {
        console.log(this.state.formdata);
        
        e.preventDefault();
        this.props.dispatch(updateBook(this.state.formdata)); //update the book
    }

    //delete the post
    deletePost = () => {
        this.props.dispatch(deleteBook(this.props.match.params.id));
    }

    //redirect the user after delete the book
    redirectUser = () => {
        setTimeout(() => {
            this.props.history.push('/user/user-books');
        }, 2000)
    }

    //dispatch the actions
    componentWillMount(){
        this.props.dispatch(getBook(this.props.match.params.id));
    }

    //using PureComponent allows as to render the component if there is a new props
    componentWillReceiveProps(nextProps){        
        let book = nextProps.books.book;
        
        this.setState({
            formdata: {
                _id: book._id,
                title: book.title,
                author: book.author,
                review: book.review,
                pages: book.pages,
                ratings: book.rating,
                price: book.price
            }
        }) 
    }

    componentWillUnmount(){
        this.props.dispatch(clearBook()); //clear the book after updating or deleting
    }

    render() {      
        let books = this.props.books;
        return (
            <div className="rl_container article">
                {
                    books.updateBook ?
                        <div className="edit_confirm">
                            Book updated, 
                            <Link to={`/books/${books.book._id}`}>
                                Click here to see your updated book
                            </Link>
                        </div>
                    : null
                }
                {
                    books.postDeleted ?
                        <div className="red_tag">
                            Post deleted!
                            Redirecting...
                            {this.redirectUser()}
                        </div>
                    : null
                }
                <form onSubmit={this.submitForm}>
                    <h2>Edit book</h2>

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
                            <option val="1">1</option>
                            <option val="2">2</option>
                            <option val="3">3</option>
                            <option val="4">4</option>
                            <option val="5">5</option>
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

                    <button type="submit">Edit book</button>
                    <div className="delete_post">
                        <div
                            className="button"
                            onClick={this.deletePost}
                        >
                            Delete book
                        </div>
                    </div>

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

export default connect(mapStateToProps)(EditBook);