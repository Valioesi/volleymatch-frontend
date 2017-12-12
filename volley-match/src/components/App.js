import React, { Component } from 'react';
import logo from './../logo.svg';
import './../styles/App.css';
import GameForm  from './GameForm';
import GameList from './GameList';
import { Button } from 'semantic-ui-react';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { renderForm: false };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <main>
          <Button onClick={() => this.setState({ renderForm: true })} primary>Create game</Button>
          {this.state.renderForm && <GameForm />}
          <GameList />
        </main>

      </div>
    );
  }
}


export default App;