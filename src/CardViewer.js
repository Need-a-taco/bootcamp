import React from 'react';
import { Link, withRouter,  } from 'react-router-dom';
import './CardViewer.css'; 
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

class CardViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { front: '', back: '', 
        currIndex : 0,
        isFront: true
        };
      }
   
  render() {
    if (!isLoaded(this.props.cards))
    {
      return <div>Loading...</div>;
    }
    if (isEmpty(this.props.cards))
    {
      return <div>PageNotFound...</div>;
    }
    const card = this.props.cards[this.state.currIndex][this.state.isFront ? 'front' : 'back']
    return (
      <div className="container">
        <h2>Card Viewer</h2>
        <div className="card" onClick={() => this.setState(prevState => ({ isFront: !prevState.isFront }))}>
          {card}
        </div>
        <div className="button-container">
          <button onClick={() => this.setState(prevState => ({ currIndex: Math.max(prevState.currIndex - 1, 0), isFront: true }))}>
            Previous
          </button>
          <button onClick={() => this.setState(prevState => ({ currIndex: Math.min(this.props.cards.length - 1, prevState.currIndex + 1), isFront: true }))}>
            Next
          </button>
        </div>
        <h2>{this.state.currIndex + 1} / {this.props.cards.length}</h2>
        <Link to="/" className="link">Home</Link>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  console.log(state) 
  const deck = state.firebase.data[props.match.params.deckId];
  const name = deck && deck.name;
  const cards = deck && deck.cards;
  return {cards : cards, name : name};
};

export default compose(
  withRouter,
  firebaseConnect(props => {
    console.log('props',props);
    const deckId = props.match.params.deckId;
    return [{ path : `/flashcards/${deckId}`, storeAs : deckId }];
  }),
  connect(mapStateToProps),
  
  )(CardViewer);

/* 





1.  access properties of the props
   card.front for whatever index we are on
   change what we see on the page
   <td>{false ? card.front : card.back}</td>
   isFront = true, on start be true
   <button onClick={() => this.deleteCard(index)}>

2.  key is the index of the card we want to change
<tr key={index}>
     {<td>{card.front}</td>}
     <td>{card.back}</td>
     <td>

     </td>
   </tr>
   

Previous/Next:
handleChange = event =>
<button onClick={() => index - 1}>previous</button>
<button onClick={() => index + 1}>Next</button>
*/