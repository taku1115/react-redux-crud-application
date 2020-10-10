import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { postEvent } from '../actions'

class EventsNew extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    renderField(field) {
        const { input, label, type, meta: { touched, error } } = field;
        
        return (
            <div>
                <input {...input} placeholder={label} type={type} ></input>
                {touched && error && <span>{error}</span>} 
            </div>
            //　一回でもformに触れたらtouched状態になる
            // touched状態かつerror状態のときにerrorを表示
        );
    }

    async onSubmit(values) {
        await this.props.postEvent(values);
        this.props.history.push('/');
    }

    render() {
        const { handleSubmit, pristine, submitting } = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit)}>
                <div><Field label="Title" name="title" type="text" component={this.renderField}></Field></div>
                <div><Field label="Body" name="body" type="text" component={this.renderField}></Field></div>
                <div>
                    <input type="submit" value="Submit" disabled={pristine || submitting} ></input>
                    <Link to="/">Cancel</Link>
                </div>
            </form>
        )
    }
}

const validate = values => {
    const errors = {};

    if (!values.title) errors.title = "Enter a title, please.";
    if (!values.body) errors.body = "Enter a body, please.";

    return errors;
}

const mapDispatchToProps = ({ postEvent });

export default connect(null, mapDispatchToProps)(
    reduxForm({ validate, form: 'eventNewForm' })(EventsNew)
);
