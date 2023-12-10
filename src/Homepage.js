import React from 'react';
import { Link } from 'react-router-dom';

class HomePage extends React.Component {
  
    render()  {
        return (
            <div>
                <h2>HomePage</h2>
                <p>Welcome to our Flashcard App!</p>
                <Link to="/editor">Edit card deck</Link>
                <Link to="/viewer">View card deck</Link>
            </div>
        );
    }
}




export default HomePage;
