import React from 'react';
import { Link } from 'react-router-dom';

class CardViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { front: '', back: '', 
        currIndex : 0,
        isFront: true
        };
      }
   
  render() {
    const card = this.props.cards[this.state.currIndex][this.state.isFront ? 'front' : 'back']
    return (
      <div>
        <h2>Card Viewer</h2> 
        <table>
            <h2>
                {card}
            </h2> 
        </table>      
        <button onClick={() => this.setState(prevState => ({ isFront: !prevState.isFront }))}>
            flip
        </button>
        <button onClick={() => this.setState(prevState => ({ currIndex: Math.max(prevState.currIndex - 1, 0) , isFront : true}))}>
         Previous
        </button>               
        <button onClick={() => this.setState(prevState => ({ currIndex: Math.min(this.props.cards.length - 1, prevState.currIndex + 1),  isFront : true }))}>
         next
        </button>
        <h2>{this.state.currIndex+1} / {this.props.cards.length} </h2>

        <Link to="/editor">Go to card viewer</Link>
      </div>
    );
  }
}

export default CardViewer;/* 
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