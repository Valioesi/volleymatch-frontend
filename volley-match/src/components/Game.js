import React, { Component } from 'react';
import GameView from './GameView';
import { graphql } from 'react-apollo';
import { createGameResultMutation } from './../queries/games';

class Game extends Component {
    constructor(props) {
        super(props);

        const result = this.props.game.result;
        let resultTeam1 = '';
        let resultTeam2 = '';

        //check if there is already a result set for this game
        //if yes -> check which team one and set the score accordingly
        //if no -> results stay empty string
        if (result) {
            if (result.team1Won) {
                resultTeam1 = result.winnersScore;
                resultTeam2 = result.losersScore;
            } else {
                resultTeam1 = result.losersScore;
                resultTeam2 = result.winnersScore;
            }
        }
        

        this.state = {
            shouldShowResultInput: false,
            shouldShowResults: result !== null,      //this depends on whether or not a GameResult exists for this game 
            resultTeam1: resultTeam1,
            resultTeam2: resultTeam2
        };
      
    }


    /**
     * this function checks which team won based on the results
     * and executes the graphql mutation to create the game result
     */
    saveResults() {
        const resultTeam1 = parseInt(this.state.resultTeam1);
        const resultTeam2 = parseInt(this.state.resultTeam2);
        let winnersScore;
        let losersScore;
        let winners;
        let losers;
        let team1Ids = [];
        let team2Ids = [];
        let team1Won;

        //create new arrays with only the ids instead of the whole player object
        this.props.game.team1.forEach(player => {
            team1Ids.push(player.id);
        });
        this.props.game.team2.forEach(player => {
            team2Ids.push(player.id);
        });

        //we need to find out which team won
        if (resultTeam1 > resultTeam2) {
            winners = team1Ids;
            losers = team2Ids;
            winnersScore = resultTeam1;
            losersScore = resultTeam2;
            team1Won = true;
        } else {
            winners = team2Ids;
            losers = team1Ids;
            winnersScore = resultTeam2;
            losersScore = resultTeam1;
            team1Won = false;
        }


        this.props.createGameResultMutation({
            variables: {
                gameId: this.props.game.id,
                winners: winners,
                losers: losers,
                winnersScore: winnersScore,
                losersScore: losersScore,
                team1Won: team1Won
            }
        }).then(response => {
            console.log(response);
            //disable result input
            this.setState({ shouldShowResultInput: false });
            //and show the results
            this.setState({ shouldShowResults: true });
        }).catch(error => {
            console.log(error);
        });
    }



    render() {
        return (
            <GameView
                game={this.props.game}
                shouldShowResultInput={this.state.shouldShowResultInput}
                shouldShowResults={this.state.shouldShowResults}
                resultTeam1={this.state.resultTeam1}
                resultTeam2={this.state.resultTeam2}
                showResultInput={() => this.setState({ shouldShowResultInput: true })}
                changeResultTeam1={(e, data) => this.setState({ resultTeam1: data.value })}
                changeResultTeam2={(e, data) => this.setState({ resultTeam2: data.value })}
                saveResults={() => this.saveResults()}
            />
        );
    }
}




export default graphql(createGameResultMutation, { name: 'createGameResultMutation' })(Game);