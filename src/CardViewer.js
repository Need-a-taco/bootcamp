import React from 'react';

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
        <button onClick={this.props.switchMode}>Go to card editor</button>
        <h2>{this.state.currIndex+1} / {this.props.cards.length} </h2>
      </div>
    );
  }
}

export default CardViewer;