import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Campuses = ({ campuses, students }) => {
    let enrollments;
    return (
        <ul>
            {campuses.map((campus) => {
                return (
                    <li key={campus.id}>
                        <Link to={`/campuses/${campus.id}`}>{campus.name}</Link>
                        {`(${(enrollments = students.filter((student) => student.campusId === campus.id)).length} ${enrollments.length === 1 ? 'enrollment' : 'enrollments'})`}
                    </li>
                );
            })}
        </ul>
    );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Campuses);
