import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Campuses = ({ campuses, students }) => {
    let enrollments;
    return (
        <div>
        <h2>Campuses</h2>
            {campuses.map((campus) => {
                return (
                    <div>
                    <li key={campus.id}>
                        <Link to={`/campuses/${campus.id}`}>{campus.name}</Link>
                        <br></br>
                        <strong>Description: </strong>{campus.description}
                        <br></br>
                        <strong>Address: </strong> {campus.address}
                        <br></br>
                        <img src ={campus.imageURL} width='400' height='300'/>
                        <br></br>
                        {`(${(enrollments = students.filter((student) => student.campusId === campus.id)).length} ${enrollments.length === 1 ? 'enrollment' : 'enrollments'})`}
                        <br></br>
                    </li>
                    <h2>Students</h2>
                        {students.map((student) => {
                         if (student.campusId === campus.id) {
                            return (
                                <ul>
                                    <li key={campus.id}>
                                    (<Link key={student.firstName} to={`/student/${student.id}`}> {student.firstName}</Link>)
                                    </li>
                                </ul>
                            )
                        }})}
                    </div>
                );
            })}
        </div>
    );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Campuses);
