import React, { Component } from 'react'
import classNames from 'classnames'
import { withFormik } from 'formik'
import Yup from 'yup'
import classnames from 'classnames'
import {subcribeToMailingList} from 'services/api'

const InputFeedback = ({ error }) => error ? (<div className="input-feedback">{error}</div>) : null

const TextInput = ({
	type,
	id,
	error,
	value,
	onChange,
	className,
	...props
}) => {
	const classes = classnames(
		'contact-field-wrapper',
		{
			'animated shake error': !!error,
		},
		className
	)
	let field = <input
					id={id}
					className="text-input"
					type={type}
					value={value}
					onChange={onChange}
					{...props}/>

	return (
		<div className={classes}>
			{field}
			<InputFeedback error={error} />
		</div>
	)
}

const SignUp = props => {
	const {
		values,
		touched,
		errors,
		dirty,
		isSubmitting,
		isValid,
		setFieldValue,
		handleChange,
		handleBlur,
		handleSubmit,
		close,
		closed,
		handleReset,
	} = props

	return (
		<form onSubmit={handleSubmit}>
			<TextInput
			  id="email"
			  type="email"
			  label="EMAIL *"
			  autocomplete="off"
			  placeholder="Enter your email"
			  error={touched.email && errors.email}
			  value={values.email}
			  onChange={handleChange}
			  onBlur={handleBlur}
			/>

			<button type="submit" disabled={!isValid}>
				Submit
			</button>
		</form>
	)
}

const SignUpForm = withFormik({
	validationSchema: Yup.object().shape({
		email: Yup.string()
			.email('Invalid email address')
			.required('Email is required.')
	}),
	handleSubmit: (values, props) => {
		console.log(JSON.stringify(values, null, 2));
		props.setSubmitting(false);
		subcribeToMailingList(values)
		// props.props.closeMe()
	},
	displayName: 'SignUpForm', // helps with React DevTools
})(SignUp)

class SignUpFormBar extends Component {
	state = { closed: false }
	close = () => {
		this.setState({ closed: true })
	}
	render() {
		const wrapperClass = classnames({
			'sign-up-wrapper': true,
			'closed': this.state.closed
		})

		return (
			<div className={wrapperClass}>
				<p>Keep updated! Sign up for our emails.</p>
				<SignUpForm closeMe={this.close}/>
				<div className="sidebar-close" onClick={this.close}>X</div>
			</div>
		)
	}
}

export default SignUpFormBar
