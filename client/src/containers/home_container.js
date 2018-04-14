import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBooks } from '../actions';
import BookItem from '../widgetsUI/book_item';

class HomeContainer extends Component {

    componentWillMount(){
        this.props.dispatch(getBooks(1,0,'asc'));
    }

    //render the books to screen
    renderItems = (books) => {          
        return (
            books.list ?
                books.list.map(item => (
                    <BookItem {...item} key={item._id}/>
                ))
            : null
        )
    }; 

    //load more books
    loadmore = () => {
        let count = this.props.books.list.length; //amount of books
        
        this.props.dispatch(getBooks(1,count,'asc',this.props.books.list)); //fetch one book each click on "Load More"
    };

    render() {
        let books = this.props.books;      
          
        return (
            <div>
                {this.renderItems(books)}
                <div
                    className="loadmore"
                    onClick={this.loadmore}
                >
                Load More</div>
            </div>
        );
    };
};

//fetch books from state
function mapStateToProps(state){
    return {
        books: state.books
    };
};

export default connect(mapStateToProps)(HomeContainer);