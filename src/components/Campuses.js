import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CampusForm from './CampusForm';
import { deleteCampus } from '../store';


const Campuses = ({ campuses, deleteCampus, students }) => {
    let enrollments;

    const deleteUserClick = (campus) => {
        deleteCampus(campus.id);
    };

    return (
        <div>
            <h2>Campus Info: </h2>
            <ul>
                {campuses.map((campus) => {
                    return (
                        <li key={campus.id}>
                            <Link to={`/campuses/${campus.id}`}>{campus.name}</Link>
                            <button onClick={() => deleteUserClick(campus)}>X</button>
                            <br></br>
                            <strong>Description: </strong>{campus.description}
                            <br></br>
                            <strong>Address: </strong> {campus.address}
                            <br></br>
                            <div id='classphotos'>
                            <img src ={campus.imageURL}/>
                            <br></br>
                            <strong>Enrollments: </strong>{`(${(enrollments = students.filter((student) => student.campusId === campus.id)).length} ${enrollments.length === 1 ? 'enrollment' : 'enrollments'})`}
                            </div>
                        </li>
                    );
                })}
            </ul>
            <h2>Create New Campus: </h2>
            <CampusForm />
        </div>
    );
};

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => {
    return {
      deleteCampus: (id) => dispatch(deleteCampus(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Campuses);
