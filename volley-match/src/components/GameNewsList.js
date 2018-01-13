import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Game from './Game';
import { allGamesQuery } from './../queries/games';

class GameHistoryList extends Component {

    render() {
        if (this.props.allGamesQuery && this.props.allGamesQuery.loading) {
            return <div>Loading Games</div>;
        }
        if (this.props.allGamesQuery && this.props.allGamesQuery.error) {
            return <div>Unable to load Games</div>;
        }

        const gamesToRender = this.props.allGamesQuery.allGames;

        return (
            <div>
                {gamesToRender.map(game => (
                    <Game game={game} key={game.id} />
                ))}
            </div>
        );
    }
}


export default graphql(allGamesQuery, {
    name: 'allGamesQuery',
    options: { variables: { resultFilter: { id_not: null } } }
})(GameHistoryList);