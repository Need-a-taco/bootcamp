import React from 'react';
import { Link } from 'react-router-dom';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import 'firebase/database';
import { connect } from 'react-redux';
import { compose } from 'redux';

class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    render() {
        if (!isLoaded(this.props.homepage)) {
            return <div>Loading...</div>;
        }
        /* 
        so from the console log we have our props where this.props.homepage contains the information we need, so its the homepage : (stuff)
        so now we need to map the keys the same way we did in card editor, but we take the deckId as an argument instead of index
        So then we pattern match from cardeditor
                    const cards = this.state.cards.map((card, index) => (
                <tr key={index}>
                    <td>{this.state.isFront ? card.front : card.back}</td>
                    <td>{card.back}</td>
                    <td>
                    <button
                    onClick={() => this.deleteCard(index)}>Delete card</button>
                    </td>
                </tr>
        So this populates the links using the viewer/ deckId, which is what we want,
        furthermore, the reason why we use this.props.homepage[deckId] instead of this.props.homepage.deckId is because it is a key value pair,
        not another object.
    ));

        */
        const decks = Object.keys(this.props.homepage).map(deckId => {
            const deck = this.props.homepage[deckId];
            return (
                <div key={deckId}>
                    <Link to={`/viewer/${deckId}`}>{deck.name}</Link>
                </div>
            );
        });

        return (
            <div>
                <h2>HomePage</h2>
                <p>Welcome to our Flashcard App!</p>
                <Link to="/editor">Edit card deck</Link>
                {decks}
            </div>
        );
    }
}

const mapStateToProps = state => {
    // Access the keys of homepage data correctly
    console.log(Object.keys(state.firebase.data));
    //console.log(state.firebase.data);
    /* 
    the reason why we couldnt get this to work was because it was disabled on the firebase app like it was a stupid issue
    state.firebase.data is what we want, and state.firebase.data.homepage  this becomes an array or object i dont really know

    */
    console.log(state.firebase.data);
    // this basically just says the state of our homepage is the same as our fire base where it has like the random hash key and its name of the deck
    return { homepage: state.firebase.data.homepage };
};

/* 
so we connect the mapped states to the props so we can use them, in the class component we need to use "this.state.blahblah" if it was a functional
component we wouldnt have to because it wouldnt have the class structure and we could just do state.blahblah
we connect to "['/homepage']" just because remember "[[Prototype]]: Object" is what we see in our terminal and
['deck1', 'homepage'] are parts of elements in an array. Then we just compose into our homepage
*/

export default compose(
    connect(mapStateToProps),
    firebaseConnect(['/homepage']),
)(Homepage);
