import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import UpdateStudentForm from './UpdateStudentForm';


const SingleStudent = (props) => {
    const id = +props.match.params.id;
    const students = props.students;
    const campuses = props.campuses;
    const student = students.find((student) => student.id === id) || {};
    const campus = campuses.find((campus) => campus.id === student.campusId) || {};
  
    return (
      <div>
          <h2>Name: {student.firstName} {student.lastName}</h2>
          Email: <a href={`mailto:${student.email}`}>{student.email}</a>
          <br></br>
          GPA: {student.gpa}
          <br></br>
          <img src ={student.imageURL} />
          <br></br>
          {student.campusId === null ? 'is not enrolled in any campus.': 'Enrolled in: '}<Link to={`/campuses/${student.campusId}`}>{campus.name}</Link>
          <br></br>
          <h2>UPDATE STUDENT:</h2>
          <UpdateStudentForm props={props} />
        </div>
    );
  };
  
  const mapStateToProps = (state) => {
    return {
      students: state.students,
      campuses: state.campuses,
      ...state,
    };
  };
  
  export default connect(mapStateToProps)(SingleStudent);