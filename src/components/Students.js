import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StudentForm from './StudentForm';
import { deleteStudent } from '../store';


const Students = ({ students, campuses, deleteStudent }) => {

    const deleteStudentClick = (student) => {
        deleteStudent(student.id);
    };

    return (
        <div>
            <h2>Student Info: </h2>
            <ul>
                {students.map((student) => {
                    return (
                        <li key={student.id}>
                            <Link to={`/students/${student.id}`}>{student.firstName} {student.lastName}</Link>
                            <button onClick={() => deleteStudentClick(student)}>X</button>
                            <br></br>
                            Email: {student.email}
                            <br></br>
                            GPA: {student.gpa}
                            <br></br>
                            <img src ={student.imageURL} width='100' height='200'/>
                            <br></br>
                            {student.campusId === null ? `${student.firstName} does not attend any campus.`: 'Campus: '} {campuses.map((campus) => student.campusId === campus.id ? (<Link key={campus.name} to={`/campuses/${campus.id}`}> {campus.name}</Link>) : (''))}
                        </li>
                    );
                })}
            </ul>
            <h2>Create New Student: </h2>
            <StudentForm />
        </div>
    );
};

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => {
    return {
      deleteStudent: (id) => dispatch(deleteStudent(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Students);
