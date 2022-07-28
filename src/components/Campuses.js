import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CampusForm from './CampusForm';
import { deleteCampus } from '../store';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';import AddIcon from '@mui/icons-material/Add';


const Campuses = ({ campuses, students, deleteCampus }) => {
  let enrollments;

  const deleteUserClick = (campus) => {
    deleteCampus(campus.id);
  };

  return (
    <div>
      <h1>{campuses.length === 0 ? 'Create A Campus' : 'Campuses'}</h1>
      <div>
        <ul>
          {campuses.map((campus) => {
            return (
              <li key={campus.id}>
                <DeleteForeverIcon
                  fontSize="small"
                  onClick={() => deleteUserClick(campus)}
                />
                <Link to={`/campuses/${campus.id}`}>{campus.name}</Link>
                <br></br>
                <strong>Enrollments: </strong>{`(${(enrollments = students.filter((student) => student.campusId === campus.id)).length} ${enrollments.length === 1 ? 'enrollment' : 'enrollments'})`}
                <div>Address: {campus.address}</div>
                <img src ={campus.imageURL}/>
              </li>
            );
          })}
        </ul>
      </div>
      <h2>Create New Campus <AddIcon fontSize='large' /></h2>
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