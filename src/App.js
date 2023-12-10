import React from 'react';
import CardEditor from './CardEditor';
import CardViewer from './CardViewer';
import { Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [
        { front: 'front1', back: 'back1' },
        { front: 'front2', back: 'back2' },
      ],
    };
  }

  addCard = card => {
    const cards = this.state.cards.slice().concat(card);
    this.setState({ cards });
  };

  deleteCard = index => {
    const cards = this.state.cards.slice();
    cards.splice(index, 1);
    this.setState({ cards });
  };

  render() {
    return (
      <Routes>
        <Route exact path="/" 
         element={<HomePage />}
         />

        <Route exact path="/editor"
          element= {<CardEditor
          addCard={this.addCard}
          cards={this.state.cards}
          deleteCard={this.deleteCard}
          />}
         />

        <Route exact path="/viewer"
          element= {<CardViewer
          cards={this.state.cards}          
        />}/>
      </Routes>
    );
  }
}

export default App;