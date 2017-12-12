import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import GameView from './GameView';

class GameList extends Component {

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
                    <GameView game={game} />
                ))}
            </div>
        );
    }
}

const allGamesQuery = gql`
    query AllGamesQuery {
        allGames{
            id
            time
            team1{
                firstName
                lastName
            }
            team2{
                firstName
                lastName
            }
        }
    }
`

export default graphql(allGamesQuery, { name: 'allGamesQuery' })(GameList);