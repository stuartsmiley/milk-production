import React from 'react';
import {authenticationService} from "../services/authentication.service";
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as yup from 'yup';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        if (authenticationService.currentUserValue) {
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <div>
                <h2>Login</h2>
                <Formik
                    initialValues={{
                        username: '',
                        password: ''
                    }}
                    validationSchema={yup.object().shape({
                        username: yup.string().required(),
                        password: yup.string().required()
                    })}
                    onSubmit={({ username, password }, {setStatus, setSubmitting }) => {
                        setStatus();
                        authenticationService.login(username, password)
                            .then(
                                user => {
                                    const { from } = this.props.location.state || { from: { pathname: "/" } };
                                    this.props.history.push(from);
                                },
                                error => {
                                    setSubmitting(false);
                                    setStatus(error);
                                }
                            );
                    }}
                    >
                    {({ errors, status, touched, isSubmitting }) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <Field name="username" type="text"
                                   className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                            <ErrorMessage name="username" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field name="password" type="password"
                                   className={'form-control' + (errors.password && touched.password ? 'is-invalid' : '')} />
                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Login</button>
                        </div>
                        {status && <div className={'alert alert-danger'}>{status}</div>}
                    </Form>
                   )}
                </Formik>
            </div>
        )
    }
}
export { LoginPage };

// https://jasonwatmore.com/post/2019/04/06/react-jwt-authentication-tutorial-example#authentication-service-js
