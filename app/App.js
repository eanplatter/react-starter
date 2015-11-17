import React, {Component} from 'react';
import {render} from 'react-dom';

class App extends Component {
  render() {
    return (
      <div className='ui container'>
        <h1>
          Welcome to the react starter.
        </h1>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
