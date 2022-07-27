import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StudentForm from './StudentForm';
import { deleteStudent } from '../store';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const Students = ({ students, campuses, deleteStudent }) => {
  return (
    <div>
      <h1 className="page-title">
        {students.length === 0 ? 'Create A Student' : 'Students'}
      </h1>
      <div className="students">
        <ul>
          {students.map((student) => {
            return (
              <li key={student.id} className="student">
                <HighlightOffIcon
                  fontSize="small"
                  onClick={() => deleteStudent(student.id)}
                  className="delete-button"
                />

                <Link to={`/students/${student.id}`}>
                  {student.firstName} {student.lastName}
                </Link>
                <div>
                  Email: <a href={`mailto:${student.email}`}>{student.email}</a>{' '}
                </div>
                <div>GPA: {student.gpa}</div>
                <img src ={student.imageURL}/>
                {student.campusId === null
                  ? `${student.firstName} does not attend any campus.`
                  : 'Campus: '}
                {campuses.map((campus) =>
                  student.campusId === campus.id ? (
                    <Link key={campus.name} to={`/campuses/${campus.id}`}>
                      {campus.name}
                    </Link>

                  ) : (
                    ''
                  )
                )}
              </li>
            );
          })}
        </ul>
        <StudentForm />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => {
  return {
    deleteStudent: (id) => dispatch(deleteStudent(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Students);