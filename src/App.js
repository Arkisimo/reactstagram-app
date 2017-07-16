import React, { Component } from 'react';
import Toolbar from './Toolbar.jsx';
import ImageBoard from './ImageBoard.jsx';


class App extends Component {
  render() {
    return (
      <div>
        <Toolbar />
        <ImageBoard />
      </div>
    );
  }
}

export default App;
