import React, { Component } from 'react';
import logo from './../logo.svg';
import './../styles/App.css';
import GameForm from './GameForm';
import Dashboard from './Dashboard';
import GameHistoryList from './GameHistoryList.js';
import { Button, Header, Menu } from 'semantic-ui-react';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: 'games'
        };
    }

    render() {
        console.log('App Component State', this.state);

        return (
            <div className="App">
                <header className="App-header">
                    <Menu secondary inverted floated="right">
                        <Menu.Item name='Games' active={this.state.activeItem === 'games'} onClick={() => this.setState({ activeItem: 'games' })} />
                        <Menu.Item name='History' active={this.state.activeItem === 'history'} onClick={() => this.setState({ activeItem: 'history' })} />
                        <Menu.Item name='Create Game' active={this.state.activeItem === 'createGame'} onClick={() => this.setState({ activeItem: 'createGame' })} />
                    </Menu>
                </header>
                <main>
                    {this.state.activeItem === 'games' && (
                        <Dashboard />
                    )}
                    {this.state.activeItem === 'history' && (
                        <section className="narrow-content">
                            <Header size='huge'>My history</Header>
                            <GameHistoryList />
                        </section>
                    )}
                    {this.state.activeItem === 'createGame' && (
                        <section className="narrow-content">
                            <Header size='huge'>Create Game</Header>
                            <GameForm hideForm={() => this.setState({ activeItem: 'games' })} />
                        </section>
                    )}

                </main>

            </div>
        );
    }
}


export default App;