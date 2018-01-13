import React, { Component } from 'react';
import { Grid, Header } from 'semantic-ui-react';
import GameList from './GameList';
import GameNewsList from './GameNewsList';

class Dashboard extends Component {
    render() {
        return (
            <Grid columns={2}>
                <Grid.Column>
                    <section className="game-list">
                        <Header size='huge'>Current Games</Header>
                        <GameList />
                    </section>

                </Grid.Column>
                <Grid.Column>
                    <section className="game-list">
                        <Header size='huge'>News Feed</Header>
                        <GameNewsList/>
                    </section>
                </Grid.Column>
            </Grid>
        );
    }
}

export default Dashboard;