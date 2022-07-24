import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import UpdateCampusForm from './UpdateCampusForm';
import { updateStudent } from '../store';



const SingleCampus = (props) => {
    const id = +props.match.params.id;
    const campuses = props.campuses;
    const students = props.students.filter((student) => student.campusId === id);
    const campus = campuses.find((campus) => campus.id === id) || {};
    const { updateStudent } = props

return (
    <div>
      <h2>{campus.name}</h2>
        Address: {campus.address}
        <br></br>
        Description: {campus.description}
        <br></br>
        <img src ={campus.imageURL} width='400' height='300'/>
        <br></br>
        <h2>Students: </h2>
            <ul>
              {students.length > 0 ? students.map((student) => {
                return (
                    <li key={student.id}>
                        <Link to={`/students/${student.id}`}>
                          {student.firstName} {student.lastName}
                        </Link>{' '}
                        <button onClick={() => updateStudent({...student, campusId: null})}>Unenroll Student</button>
                      </li>
                    );
                  })
                : `There are no students enrolled at ${campus.name}`}
            </ul>
            <br></br>
            <h2>UPDATE CAMPUS:</h2>
            <UpdateCampusForm props={props} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    campuses: state.campuses,
    students: state.students,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateStudent: (student) => dispatch(updateStudent(student)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleCampus);
