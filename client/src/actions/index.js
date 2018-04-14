import axios from 'axios';

/*===========================================*/
/*===============Books Actions===============*/
/*===========================================*/

//get all the books from /api/books method
export function getBooks(
    limit = 10,
    start = 0,
    order = 'asc',
    list = ''
){    
    //redux-promise (promiseMiddleware) will promise that axios will finish before the return statment.
    const request = axios.get(`/api/books?limit=${limit}&skip=${start}&order=${order}`)
        .then(Response => {
            if (list) { //if we have someting on the list                
                return [...list, ...Response.data]
            } else {
                return Response.data
            }
        });

    return {
        type: 'GET_BOOKS',
        payload: request
    }
}

//when enter to a book get the reviewer
export function getBookWithReviewer(id){
    const request = axios.get(`/api/getBook?id=${id}`) //request for a book by id
    
    return (dispatch) => {
        request.then(({data}) => {
            let book = data;
            
            axios.get(`/api/getReviewer?id=${book.ownerId}`) //request for the reviewer of this book by the ownerId
                .then(({data}) => {
                    let response = {
                        book,
                        reviewer: data
                    };
                    
                    dispatch({
                        type: 'GET_BOOK_WITH_REVIEWER',
                        payload: response
                    })
                });
        });
    };
};

//clear info of book from store when we go back to home or someting
export function clearBookWithReviewer(){
    return {
        type: 'CLEAR_BOOK_WITH_REVIEWER',
        payload:{
            book: {},
            reviewer: {}
        }
    }
}

//add new book to DB
export function addBook(book){
    const request = axios.post('/api/book', book)
        .then(Response => Response.data);
    
    return {
        type: 'ADD_BOOK',
        payload: request
    }
}

//clear new book info
export function clearNewBook(){
    return {
        type: 'CLEAR_NEW_BOOK',
        payload: {}
    }
}

//fetch all user books (get all user books)
export function getUserPosts(userId){
    const request = axios.get(`/api/user_posts?user=${userId}`)
        .then(Response => Response.data);
    
    return {
        type: 'GET_USER_POSTS',
        payload: request
    }
}

//get a book by id
export function getBook(id){
    const request = axios.get(`/api/getBook?id=${id}`)
        .then(Response => Response.data);

    return {
        type: 'GET_BOOK',
        payload: request
    }
}

//update book
export function updateBook(data){
    const request = axios.post('/api/book_update', data)
        .then(Response => Response.data);

    return {
        type: 'UPDATE_BOOK',
        payload: request
    }
}

//delete book
export function deleteBook(id){
    const request = axios.delete(`/api/delete_book?id=${id}`)
        .then(Response => Response.data)

    return {
        type: 'DELETE_BOOK',
        payload: request
    }
}

//clear the book after delted him
export function clearBook(){
    return {
        type: 'CLEAR_BOOK',
        payload: {
            book: null,
            updateBook: false,
            postDeleted: false
        }
    }
}

/*===========================================*/
/*===============Users Actions===============*/
/*===========================================*/

//login user
export function loginUser({email,password}){
    const request = axios.post('/api/login', {email,password})
        .then(Response => Response.data)
    return {
        type: 'USER_LOGIN',
        payload: request
    }
}

//check user authentication
export function auth(){    
    const request = axios.get('/api/auth')
        .then(Response => Response.data);

    return {
        type: 'USER_AUTH',
        payload: request
    }
}

//get all users
export function getUsers(){
    const request = axios.get('/api/users')
        .then(Response => Response.data);

    return {
        type: 'GET_USERS',
        payload: request
    }
}

//creating user
export function userRegister(user,userList){
    const request = axios.post('/api/register',user)
    
    return (dispatch) => { // returning a function with axios
        request.then(({data}) => {
            //if the user enter wrong data in the register form return the original list (prevent errors)
            let users = data.success ? [...userList, data.user] : userList;
            let response = {
                success: data.success,
                users
            }

            dispatch({
                type: 'USER_REGISTER',
                payload: response
            })
        })
    }
}