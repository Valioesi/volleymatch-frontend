import React, { Component } from 'react';
import { Form, Dropdown, Button, Input } from 'semantic-ui-react';
import InputMoment from 'input-moment';
import '../../node_modules/input-moment/dist/input-moment.css';

/**
 * This is sort of the View of GameForm.  
 * It does not handle any of the logic. 
 * Its only concern is the rendering of elemets
 */
class GameFormView extends Component {

    constructor(props){
        super(props);
        this.state = {
            shouldShowDatePicker: false
        }
    }


    toggleDatePicker(){
        this.setState({ 
            shouldShowDatePicker: !this.state.shouldShowDatePicker
        })
    }

    render() {
        return (
            <Form onSubmit={this.props.createGame}>
                <Form.Field>
                    <label>Time</label>
                    <input type="text" onFocus={() => this.toggleDatePicker()}
                        value={this.props.time.format('llll')} readOnly />
                    {this.state.shouldShowDatePicker && (
                        <InputMoment
                            moment={this.props.time}
                            onChange={this.props.changeTime}
                            onSave={() => this.toggleDatePicker()}
                            prevMonthIcon='arrow left icon'
                            nextMonthIcon='arrow right icon'
                            minStep={5}
                        />
                    )}
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
                <Button type="submit" primary>Create Game</Button>
            </Form>
        );
    }
}

export default GameFormView;