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
            First Name: {student.firstName}
            <br></br>
            Last Name: {student.lastName}
            <br></br>
            Email: <a href={`mailto:${student.email}`}>{student.email}</a>
            <br></br>
            GPA: {student.gpa}
            <br></br>
            <img src ={student.imageURL} width='100' height='200'/>
            <br></br>
            {student.campusId === null ? 'is not enrolled in any campus.': 'Enrolled in: '}
            <Link to={`/campuses/${student.campusId}`}>{campus.name}</Link>
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