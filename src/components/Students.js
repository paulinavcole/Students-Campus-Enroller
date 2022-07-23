import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Students = ({ students, campuses }) => {
    return (
        <ul>
            {students.map((student) => {
                return (
                    <li key={student.id}>
                        <Link to={`/students/${student.id}`}>{student.firstName} {student.lastName}</Link>
                        Email: {student.email}
                        GPA: {student.gpa}
                        {student.campusId === null ? `${student.firstName} does not attend any campus.`: 'Campus: '} {campuses.map((campus) => student.campusId === campus.id ? (<Link key={campus.name} to={`/campuses/${campus.id}`}> {campus.name}</Link>) : (''))}
                    </li>
                );
            })}
        </ul>
    );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Students);
