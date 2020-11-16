import React, { Component } from 'react';
import { graphql } from '@apollo/client/react/hoc';

import {getBookQuery} from '../queries/queries';


class BookDetails extends Component {
    // state = {  }

    displayBookDetails() {
        const {book} = this.props.data;
        if (book) {
            return (
                <div>
                    <h2>{book.name}</h2>
                    <p>{book.genre}</p>
                    <p>{book.author.name}</p>
                    <p>All books by this author</p>
                    <ul className="other-books">
                        {
                            book.author.books.map(item => {
                                return <li key={item.id}>{item.name}</li>
                            })
                        }
                    </ul>
                </div>
            )
        } else {
            return <div>No book selected......</div>
        }
    }

    displayBooks() {
        const data = this.props.data;

        if (data.loading)  {
            return (<div>loading books....</div>);
        } else {
            return data.books.map(book => {
                return (
                    <li key={book.id}>{book.name}</li>
                )
            });
        }
    }
    render() {
        return ( 
            <div id="book-details">
                {this.displayBookDetails()}
            </div>
         );
    }
}
 
export default graphql(getBookQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.bookId
            }
        }
    }
})(BookDetails);