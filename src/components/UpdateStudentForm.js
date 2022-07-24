import React, { Component } from 'react';
import { updateStudent } from '../store';
import { connect } from 'react-redux';

class UpdateStudentForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        firstName: this.props.student ? this.props.student.firstName : '',
        lastName: this.props.student ? this.props.student.lastName : '',
        email: this.props.email ? this.props.student.email : '',
        imageUrl: this.props.student ? this.props.student.imageUrl : '',
        gpa: this.props.student ? this.props.student.gpa : '',
        campusId: this.props.student ? this.props.student.campusId : '',
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSave = this.handleSave.bind(this);
    }
  
    componentDidUpdate(prevProps) {
        if (!prevProps.student && this.props.student) {
          const { firstName, lastName, email, gpa, campusId, imageUrl } =
            this.props.student;
          this.setState({ firstName, lastName, email, gpa, campusId, imageUrl });
        }
    }
  
    handleChange(evt) {
      this.setState({
        [evt.target.name]: evt.target.value,
      });
    }
  
    async handleSave(evt) {
      evt.preventDefault();
      const { firstName, lastName, email, gpa, campusId, imageUrl } = this.state;
        await this.props.updateStudent({
          id: this.props.student.id,
          firstName,
          lastName, 
          email, 
          imageUrl, 
          gpa, 
          campusId: +campusId
        });
    }
  
    render() {
      const { firstName, lastName, email, gpa, campusId, imageUrl } =
      this.state;
    const { handleChange, handleSave } = this;
  
      return (
        <div>
            <form onSubmit={handleSave}>
                <input
                  name='firstName'
                  onChange={handleChange}
                  value={firstName}
                  placeholder='First Name'
                />

                <input
                  name='lastName'
                  onChange={handleChange}
                  value={lastName}
                  placeholder='Last Name'
                />

                <input
                  name='email'
                  onChange={handleChange}
                  value={email}
                  placeholder='Email'
                />      
                
                <input
                  name='gpa'
                  onChange={handleChange}
                  value={gpa}
                  placeholder='GPA'
                />

                <input
                  name='campusId'
                  onChange={handleChange}
                  value={campusId}
                  placeholder='Campus Id'
                />

                <input
                  name='imageUrl'
                  onChange={handleChange}
                  value={imageUrl}
                  placeholder='Image URL'
                />

            </form>
            <button type="submit">Submit</button>
        </div>        
      );
    }
  }
  
  const mapStateToProps = (state, { props }) => {
    const student = state.students.find(
      (student) => student.id === +props.match.params.id
    );
  
    return {
      student,
      ...state,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      updateStudent: (student) => dispatch(updateStudent(student)),
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(UpdateStudentForm);