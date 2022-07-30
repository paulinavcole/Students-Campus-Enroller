import React, { Component } from 'react';
import { createStudent } from '../store';
import { connect } from 'react-redux';


class StudentForm extends Component {
    constructor() {
      super();
      this.state = {
        firstName: '',
        lastName: '',
        email: '',
        gpa: '',
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(evt) {
      this.setState({
        [evt.target.name]: evt.target.value,
      });
    }
  
    async handleSubmit(evt) {
      evt.preventDefault();
        await this.props.createStudent({ ...this.state });
    }
  
    render() {
      const { firstName, lastName, email, gpa } = this.state;
      const { handleSubmit, handleChange } = this;
      return (
        <div>
          <form onSubmit={handleSubmit}>
            <input
              name="firstName"
              onChange={handleChange}
              value={firstName}
              placeholder="First Name"
            />

            <input
              name="lastName"
              onChange={handleChange}
              value={lastName}
              placeholder="Last Name"
            />      
  
            <input
              name="email"
              onChange={handleChange}
              value={email}
              placeholder="Email"
            />

            <input
              name="gpa"
              onChange={handleChange}
              value={gpa}
              placeholder="GPA"
            />
  
            <button type="submit" disabled={!firstName || !lastName || !email || !gpa}>Submit</button>
          </form>
        </div>
      );
    }
  }
  
  const mapStateToProps = (state) => state;
  
  const mapDispatchToProps = (dispatch) => {
    return {
      createStudent: (student) => {
        dispatch(createStudent(student));
      },
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(StudentForm);