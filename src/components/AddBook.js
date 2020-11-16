import React, { Component } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import {flowRight as compose} from 'lodash';
import {getAuthorsQuery, addBookMutation, getBooksQuery} from '../queries/queries';

class AddBook extends Component {
    
    state = {
        name: '',
        genre: '',
        authorId: ''
    }

    displayAuthors() {
        const data = this.props.getAuthorsQuery;

        if (data.loading)  {
            return (
                <option disabled>loading authors...</option>
            );
        } else {
            return data.authors.map(author => {
                return (
                    <option key={author.id} value={author.id}>{author.name}</option>
                )
            });
        }
    }
    
    submitForm(e) {
        e.preventDefault();
        // console.log(this.state);
        this.props.addBookMutation({
            variables: {
                ...this.state
            },
            refetchQueries: [{
                query: getBooksQuery
            }]
        });
    }

    render() {

        return ( 
            <form id="add-book" onSubmit={this.submitForm.bind(this)}>
                <div className="field">
                    <label>Book name:</label>
                    <input value={this.state.name} onChange={e => this.setState({name: e.target.value})} type="text" />
                </div>
                <div className="field">
                    <label>Genre:</label>
                    <input value={this.state.genre} onChange={e => this.setState({genre: e.target.value})} type="text" />
                </div>
                <div className="field">
                    <label>Author:</label>
                    <select value={this.state.authorId} onChange={e => this.setState({authorId: e.target.value})}>
                        <option>Select author</option>
                        { this.displayAuthors() }
                    </select>
                </div>
                <button>+</button>

            </form>
         );
    }
}
 
export default compose(
    graphql(getAuthorsQuery, {name: 'getAuthorsQuery'}),
    graphql(addBookMutation, {name: 'addBookMutation'})
)(AddBook);