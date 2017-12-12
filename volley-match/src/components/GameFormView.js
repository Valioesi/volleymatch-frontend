import React, { Component } from 'react';
import { Form, Dropdown, Button } from 'semantic-ui-react';

/**
 * This is sort of the View of GameForm. 
 * It does not handle any of the logic. 
 * Its only concern is the rendering of elemets
 */
class GameFormView extends Component {
   
    render() {
        
        console.log("Props: ", this.props.options1);
        console.log("Props: ", this.props.time);
        
        return (
            <Form onSubmit={this.props.createGame}>
                <Form.Field>
                    <label>Time</label>
                    <input
                        placeholder="Time"
                        value={this.props.time}
                        onChange={this.props.changeTime} />
                </Form.Field>
                <Form.Field>
                    <label>Add Players to Team 1</label>
                    <Dropdown
                        placeholder="Add users" fluid multiple search selection
                        options={this.props.options1}
                        value={this.props.team1}
                        onChange={this.props.changeTeam1}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Add Players to Team 2</label>
                    <Dropdown
                        placeholder="Add users" fluid multiple search selection
                        options={this.props.options2}
                        value={this.props.team2}
                        onChange={this.props.changeTeam2}
                    />
                </Form.Field>
                <Button type="submit">Submit</Button>
            </Form>
        );
    }
}

export default GameFormView;