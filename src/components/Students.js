import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StudentForm from './StudentForm';
import { deleteStudent } from '../store';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';import AddIcon from '@mui/icons-material/Add';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';



const Students = ({ students, campuses, deleteStudent }) => {
  return (
    <div>
      <h1>
        {students.length === 0 ? 'Create A Student' : 'Students'}
      </h1>
      <div className="students">
        <ul>
          {students.map((student) => {
            return (
              <li key={student.id} className="student">
                <DeleteForeverIcon
                  fontSize="small"
                  onClick={() => deleteStudent(student.id)}
                />

                <Link to={`/students/${student.id}`}>
                  {student.firstName} {student.lastName}
                </Link>
                <div>
                  Email: <AttachEmailIcon fontSize='small' /> <a href={`mailto:${student.email}`}>{student.email}</a>{' '}
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
        <h2>Create New Student<AddIcon fontSize='large' /></h2>
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