import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const SingleCampus = (props) => {
    const id = +props.match.params.id;
    const campuses = props.campuses;
    const students = props.students.filter((student) => student.campusId === id);
    const campus = campuses.find((campus) => campus.id === id) || {};

return (
    <div>
        Name: {campus.name}
        <br></br>
        Address: {campus.address}
        <br></br>
        Description: {campus.description}
        <br></br>
        <img src ={campus.imageURL} width='400' height='300'/>
        <br></br>
        Students:
            <ul>
              {students.length > 0 ? students.map((student) => {
                return (
                    <li key={student.id}>
                        <Link to={`/students/${student.id}`}>
                          {student.firstName} {student.lastName}
                        </Link>{' '}
                        <button>Unenroll Student</button>
                      </li>
                    );
                  })
                : `There are no students enrolled at ${campus.name}`}
            </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    campuses: state.campuses,
    students: state.students,
  };
};


export default connect(mapStateToProps)(SingleCampus);
