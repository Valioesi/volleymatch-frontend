import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Game from './Game';

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
                    <Game game={game} key={game.id}/>
                ))}
            </div>
        );
    }
}

export const allGamesQuery = gql`
    query AllGamesQuery {
        allGames{
            id
            time
            team1{
                id
                firstName
                lastName
            }
            team2{
                id
                firstName
                lastName
            }
            result {
                winnersScore
                losersScore
                team1Won
            }
        }
    }
`

export default graphql(allGamesQuery, { name: 'allGamesQuery' })(GameList);