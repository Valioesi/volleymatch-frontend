import React, { Component } from 'react';
import { Form, Dropdown, Button } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


class GameForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: '',
            team1: [],
            team2: []
        }
    }

    getRequestData() {
        let options = [];

        if (this.props.allUsersQuery && this.props.allUsersQuery.loading) {
            options = [{ text: 'loading', value: 'default' }];
        } else if (this.props.allUsersQuery && this.props.allUsersQuery.error) {
            options = [{ text: 'error', value: 'default' }];
        } else {
            //receive data from graphql request and for each user push an appropriate object into options state 
            options = [];
            this.props.allUsersQuery.allUsers.forEach(user => {
                //TODO: this code still does not work
                //check if the options are already assigned to one of the teams
                let alreadyInTeam = false;
                this.state.team1.forEach(item => {
                    if (item.value === user.id) {
                        alreadyInTeam = true;
                    }
                });
                this.state.team2.forEach(item => {
                    if (item.value === user.id) {
                        alreadyInTeam = true;
                    }
                });
                //if user is not already in a team we want to give it as an option everywhere
                if (!alreadyInTeam) {
                    options.push({ text: user.firstName + ' ' + user.lastName, value: user.id });
                }
                console.log('called it');
            });
        }
        return options;
    }

    createGame() {
        console.log('called createGame');
        //send mutation to graphql server
        this.props.createGameMutation({
            variables: {
                time: this.state.time,
                team1: this.state.team1,
                team2: this.state.team2
            }
        }).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
    }

    render() {

        let options = this.getRequestData();
        console.log(this.state);


        return (
            <Form onSubmit={() => this.createGame()}>
                <Form.Field>
                    <label>Time</label>
                    <input
                        placeholder="Time"
                        value={this.state.time}
                        onChange={(event) => this.setState({ time: event.target.value })} />
                </Form.Field>
                <Form.Field>
                    <label>Add Players to Team 1</label>
                    <Dropdown
                        placeholder="Add users" fluid multiple search selection
                        options={options}
                        value={this.state.team1}
                        onChange={(e, data) => this.setState({ team1: data.value })}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Add Players to Team 2</label>
                    <Dropdown
                        placeholder="Add users" fluid multiple search selection
                        options={options}
                        value={this.state.team2}
                        onChange={(e, data) => this.setState({ team2: data.value })}
                    />
                </Form.Field>
                <Button type="submit">Submit</Button>
            </Form>
        );
    }
}

const allUsersQuery = gql`
    query AllUsersQuery {
        allUsers {
            id
            firstName
            lastName
        }
    }
`

const createGameMutation = gql`
    mutation CreateGameMutation($time: String!, $team1: [ID!]!, $team2: [ID!]!) {
        createGame (
            time: $time,
            team1Ids: $team1,
            team2Ids: $team2
        ) {
            id
            time
            team1 {
                id
            }
            team2 {
                id
            }
        }
    } 
`

export default graphql(createGameMutation, { name: 'createGameMutation' })(
    graphql(allUsersQuery, { name: 'allUsersQuery' })(GameForm));
