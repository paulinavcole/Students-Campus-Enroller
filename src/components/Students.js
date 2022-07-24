import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StudentForm from './StudentForm';


const Students = ({ students, campuses }) => {
    return (
        <div>
            <ul>
                {students.map((student) => {
                    return (
                        <li key={student.id}>
                            <Link to={`/students/${student.id}`}>{student.firstName} {student.lastName}</Link>
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
            <StudentForm />
        </div>
    );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Students);
