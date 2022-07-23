import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CampusForm from './CampusForm';


const Campuses = ({ students, campuses }) => {
    return (
        <div>
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
                            Students: {students.map((student) => student.campusId === campus.id ? (<Link key={student.firstName} to={`/students/${student.id}`}> <p>{student.firstName}</p></Link>) : (' '))}
                        </li>
                    );
                })}
            </ul>
            <CampusForm />
        </div>
    );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Campuses);
