import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Campuses = ({ students, campuses }) => {
    return (
        <ul>
            {campuses.map((campus) => {
                return (
                    <li key={campus.id}>
                        <Link to={`/campuses/${campus.id}`}>{campus.name}</Link>
                        <br></br>
                        <strong>Description: </strong>{campus.description}
                        <br></br>
                        <strong>Address: </strong> {campus.address}
                        <br></br>
                        <img src ={campus.imageURL} width='400' height='300'/>
                        <br></br>
                        {campus.studentId === null ? `${campus.name} had no students.`: 'Students: '} 
                        {students.map((student) => student.campusId === campus.id ? (<Link key={student.firstName} to={`/students/${student.id}`}> <p>{student.firstName}</p></Link>) : (' '))}
                    </li>
                );
            })}
        </ul>
    );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Campuses);
