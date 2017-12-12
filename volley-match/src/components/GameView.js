import React, { Component } from 'react';
import { Segment, List, Grid, Header, Button } from 'semantic-ui-react';


class GameView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showResultInput: false
        };
    }

    render() {
        return (
            <Segment>
                <Header size='large'>{this.props.game.time}</Header>
                <Grid columns={2} divided>
                    <Grid.Row>
                        <Grid.Column>
                            <Header size='medium'>Team 1</Header>
                            <List divided>
                                {this.props.game.team1.map(player => (
                                    <List.Item>
                                        {player.firstName} {player.lastName}
                                    </List.Item>
                                ))}
                            </List>
                        </Grid.Column>
                        <Grid.Column>
                            <Header size='medium'>Team 2</Header>
                            <List divided>
                                {this.props.game.team2.map(player => (
                                    <List.Item>
                                        {player.firstName} {player.lastName}
                                    </List.Item>
                                ))}
                            </List>
                        </Grid.Column>
                    </Grid.Row>
                    {!this.state.showResultInput && (
                        <Grid.Row centered={true}>
                            <Button onClick={() => this.setState({ showResultInput: true })}>Set results</Button>
                        </Grid.Row>
                    )}
                    {this.state.showResultInput && (
                        <Grid.Row centered={true}>
                            <Grid.Column>
                                blub
                            </Grid.Column>
                            <Grid.Column>
                                blub
                            </Grid.Column>
                        </Grid.Row>

                    )}
                </Grid>
            </Segment>
        );
    }
}

export default GameView;