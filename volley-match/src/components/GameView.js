import React, { Component } from 'react';
import { Segment, List, Grid, Header, Button, Input } from 'semantic-ui-react';
import moment from 'moment';


class GameView extends Component {

    render() {
        return (
            <Segment>
                <Header size='large'>{moment(this.props.game.time).format("MMM Do, h a")}</Header>
                <Grid columns={2} divided>
                    <Grid.Row>
                        <Grid.Column>
                            <Header size='medium'>Team 1</Header>
                            <List divided>
                                {this.props.game.team1.map(player => (
                                    <List.Item key={player.id}>
                                        {player.firstName} {player.lastName}
                                    </List.Item>
                                ))}
                            </List>
                        </Grid.Column>
                        <Grid.Column>
                            <Header size='medium'>Team 2</Header>
                            <List divided>
                                {this.props.game.team2.map(player => (
                                    <List.Item key={player.id}>
                                        {player.firstName} {player.lastName}
                                    </List.Item>
                                ))}
                            </List>
                        </Grid.Column>
                    </Grid.Row>
                    {!this.props.shouldShowResultInput && !this.props.shouldShowResults && (
                        <Grid.Row centered={true}>
                            <Button onClick={this.props.showResultInput}>Set results</Button>
                        </Grid.Row>
                    )}
                    {this.props.shouldShowResultInput && (
                        <Grid.Row>
                            <Grid.Column>
                                <Input
                                    placeholder='Result team 1'
                                    onChange={this.props.changeResultTeam1}
                                    value={this.props.resultTeam1}
                                />

                            </Grid.Column>
                            <Grid.Column>
                                <Input
                                    placeholder='Result team 2'
                                    onChange={this.props.changeResultTeam2}
                                    value={this.props.resultTeam2} />
                            </Grid.Column>
                        </Grid.Row>
                    )}

                    {this.props.shouldShowResultInput && (
                        <Grid.Row centered={true}>
                            <Button onClick={this.props.saveResults} primary>
                                Save results
                                </Button>
                        </Grid.Row>
                    )}

                    {this.props.shouldShowResults && (
                        <Grid.Row>
                            <Grid.Column>
                                <p>{this.props.resultTeam1}</p>
                            </Grid.Column>
                            <Grid.Column>
                                <p>{this.props.resultTeam2}</p>

                            </Grid.Column>
                        </Grid.Row>
                    )}
                </Grid>
            </Segment>
        );
    }
}

export default GameView;