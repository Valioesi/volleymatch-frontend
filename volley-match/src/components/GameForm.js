import React, { Component } from 'react';
import GameFormView from './GameFormView';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';
import { allGamesQuery, createGameMutation, allGamesOfUserQuery } from './../queries/games';
import { allUsersQuery } from './../queries/users';

/**
 * This is sort of the controller of GameForm.
 * It handles all of the data fetching and state and calls the View by passing everything as prop.
 */
class GameForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            time: moment(),
            team1: [],
            team2: []
        }
    }

    getRequestData() {
        let options1 = [];
        let options2 = [];

        if (this.props.allUsersQuery && this.props.allUsersQuery.loading) {
            options1 = [{ text: 'loading', value: 'default' }];
            options2 = options1;
        } else if (this.props.allUsersQuery && this.props.allUsersQuery.error) {
            options1 = [{ text: 'error', value: 'default' }];
            options2 = options1;
        } else {
            //receive data from graphql request and for each user push an appropriate object into options array
            options1 = [];
            this.props.allUsersQuery.allUsers.forEach(user => {
                //check if the options are already assigned to one of the teams
                let alreadyInTeam1 = false;
                let alreadyInTeam2 = false;
                this.state.team1.forEach(item => {
                    if (item === user.id) {
                        alreadyInTeam1 = true;
                    }
                    console.log("Value: " + item.value + ", id: " + user.id);
                });
                this.state.team2.forEach(item => {
                    if (item === user.id) {
                        alreadyInTeam2 = true;
                    }
                });
                //if user is already in team 1 we want to give it as an option only to team 1, and viceversa
                let userOption = { text: user.firstName + ' ' + user.lastName, value: user.id };
                if (alreadyInTeam1) {
                    options1.push(userOption);
                } else if (alreadyInTeam2) {
                    options2.push(userOption);
                } else { //in no team yet -> option to both
                    options1.push(userOption);
                    options2.push(userOption);
                    console.log(user.firstName + " is not yet in team");
                }
            });
        }
        return { options1, options2 };
    }

    createGame() {
        console.log('called createGame');
        //send mutation to graphql server
        this.props.createGameMutation({
            variables: {
                time: this.state.time,
                team1: this.state.team1,
                team2: this.state.team2
            },
            //this will trigger a refetching of the games list and update of list component
            refetchQueries: [{
                query: allGamesQuery,
                variables: { resultFilter: { id_not: null } }
            }, {
                query: allGamesOfUserQuery,
                variables: { resultFilter: null }
            }]
        }).then(response => {
            console.log(response);
            //this will call the prop function (which in this case will change the state in App Component)            
            this.props.hideForm();
        }).catch(error => {
            console.log(error);
        });
    }


    render() {
        let { options1, options2 } = this.getRequestData();

        return (
            <GameFormView
                options1={options1}
                options2={options2}
                team1={this.state.team1}
                team2={this.state.team2}
                time={this.state.time}
                createGame={() => this.createGame()}
                changeTime={(time) => this.setState({ time: time })}
                changeTeam1={(e, data) => this.setState({ team1: data.value })}
                changeTeam2={(e, data) => this.setState({ team2: data.value })}
            />
        );
    }
}





export default graphql(createGameMutation, { name: 'createGameMutation' })(
    graphql(allUsersQuery, { name: 'allUsersQuery' })(GameForm));
