import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CampusForm from './CampusForm';
import { deleteCampus } from '../store';


const Campuses = ({ campuses, deleteCampus }) => {

    const deleteUserClick = (campus) => {
        deleteCampus(campus.id);
    };

    return (
        <div>
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
