import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Game from './Game';
import { allGamesOfUserQuery } from './../queries/games';

class GameList extends Component {

    render() {
        if (this.props.allGamesOfUserQuery && this.props.allGamesOfUserQuery.loading) {
            return <div>Loading Games</div>;
        }
        if (this.props.allGamesOfUserQuery && this.props.allGamesOfUserQuery.error) {
            return <div>Unable to load Games</div>;
        }

        const gamesToRender = this.props.allGamesOfUserQuery.allGames;

        console.log('games of gamelist', gamesToRender);

        return (
            <div>
                {gamesToRender.map(game => (
                    <Game game={game} key={game.id} />
                ))}
            </div>
        );
    }
}


export default graphql(allGamesOfUserQuery, {
    name: 'allGamesOfUserQuery',
    options: { variables: { resultFilter: null }}
})(GameList);