import * as React from "react";
import { ControlLabel, FormControl, FormGroup } from 'react-bootstrap'

interface IProps {
    id: string,
    label: string,
    type: string,
    placeholder: string,
    updateField: any,
    validationState: any
}

interface IState {
    value: string
}

export default class Result extends React.Component<IProps, IState> {

    public constructor(props: any) {
        super(props)
        this.changeHandler = this.changeHandler.bind(this)

        this.state = {
            value: ""
        }
    }

    public changeHandler(event: any) {
        this.setState({value: event.target.value})
        this.props.updateField(event.target.value)
    }

    public render() {
        return (
            <FormGroup controlId={this.props.id} validationState={this.props.validationState}>
                <ControlLabel>
                    {this.props.label}
                </ControlLabel>
                <FormControl 
                    type={this.props.type}
                    value={this.state.value}
                    placeholder={this.props.placeholder}
                    onChange={this.changeHandler}
                />
            </FormGroup>
        )
    }
}