import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Segment, List, Grid, Header} from 'semantic-ui-react';

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
                    <Segment>
                        <Header size='large'>{game.time}</Header>
                        <Grid columns={2} divided>
                            <Grid.Column>
                                <Header size='medium'>Team 1</Header>
                                <List divided>
                                    {game.team1.map(player => (
                                        <List.Item>
                                            {player.firstName} {player.lastName}
                                        </List.Item>
                                    ))}
                                </List>
                            </Grid.Column>
                            <Grid.Column>
                                <Header size='medium'>Team 2</Header>
                                <List divided>
                                    {game.team2.map(player => (
                                        <List.Item>
                                            {player.firstName} {player.lastName}
                                        </List.Item>
                                    ))}
                                </List>
                            </Grid.Column>
                        </Grid>
                    </Segment>
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