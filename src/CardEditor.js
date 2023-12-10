import React from 'react';
import './CardEditor.css'; // Import the CSS file
import { firebaseConnect, } from 'react-redux-firebase';
import { Link, withRouter, } from 'react-router-dom';
import { compose } from 'redux';

class CardEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [
        { front: 'front1', back: 'back1' },
        { front: 'front2', back: 'back2' },
      ],
      front: '',
      back: '',
      name: '',
    };
  }

  createDeck = () => {
    const deckId = this.props.firebase.push('/flashcards').key;
    const updates = {};
    const newDeck = { cards: this.state.cards, name: this.state.name };
    updates[`/flashcards/${deckId}`] = newDeck;
    updates[`/homepage/${deckId}`] = { name: this.state.name };
    const onComplete = () => this.props.history.push(`/viewer/${deckId}`);
    this.props.firebase.update('/', updates, onComplete);
  };

  addCard = () => {
    if (!this.state.front.trim() || !this.state.back.trim()) {
      alert('Cannot have empty cards');
      return;
    }

    const newCard = { front: this.state.front, back: this.state.back };
    const cards = this.state.cards.slice().concat(newCard);
    this.setState({ cards, front: '', back: '' });
  };

  deleteCard = index => {
    const cards = this.state.cards.slice();
    cards.splice(index, 1);
    this.setState({ cards });
  };

  handleChange = event => this.setState({ [event.target.name]: event.target.value });

  render() {
    const cards = this.state.cards.map((card, index) => (
      <tr key={index}>
        <td>{this.state.isFront ? card.front : card.back}</td>
        <td>{card.back}</td>
        <td>
          <button onClick={() => this.deleteCard(index)}>Delete card</button>
        </td>
      </tr>
    ));

    return (
      <div className="CardEditor"> {/* Apply the class for styling */}
        <h2>Card Editor</h2>
        <div>
          Deck Name:
          <input
            name="name"
            onChange={this.handleChange}
            value={this.state.name}
            placeholder="Name of Deck"
          />
        </div>
        <br />
        <table>
          <thead>
            <tr>
              <th>Front</th>
              <th>Back</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{cards}</tbody>
        </table>
        <br />
        <input
          name="front"
          onChange={this.handleChange}
          placeholder="Front of card"
          value={this.state.front}
        />
        <input
          name="back"
          onChange={this.handleChange}
          placeholder="Back of card"
          value={this.state.back}
        />
        <button onClick={this.addCard}>Add card</button>
        <hr />
        <div>
          <button
            onClick={this.createDeck}
            disabled={!this.state.front.trim() === '' || this.state.name.length === 0}
          >
            Create Deck
          </button>
        </div>
        <br />
        <Link to="/">Homepage</Link>
      </div>
    );
  }
}

export default compose(firebaseConnect(), withRouter)(CardEditor);
