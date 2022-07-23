import { createStore, applyMiddleware, combineReducers } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const GET_STUDENTS = 'GET_STUDENTS';
const GET_CAMPUSES = 'GET_CAMPUSES';
const CREATE_STUDENT = 'CREATE_STUDENT';
const CREATE_CAMPUS = 'CREATE_CAMPUS';
const DELETE_STUDENT = 'DELETE_STUDENT';
const DELETE_CAMPUS = 'DELETE_CAMPUS';
const UPDATE_STUDENT = 'UPDATE_STUDENT';
const UPDATE_CAMPUS = 'UPDATE_CAMPUS';

const _getStudents = (students) => {
    return {
        type: GET_STUDENTS,
        students
    };
};

const _getCampuses = (campuses) => {
    return {
        type: GET_CAMPUSES,
        campuses
    };
};

const _createStudent = (student) => {
    return {
      type: CREATE_STUDENT,
      student,
    };
};
  
  const _createCampus = (campus) => {
    return {
      type: CREATE_CAMPUS,
      campus,
    };
};

  const _deleteStudent = (id) => {
    return {
      type: DELETE_STUDENT,
      id,
    };
};
  
  const _deleteCampus = (id) => {
    return {
      type: DELETE_CAMPUS,
      id,
    };
};

const _updateStudent = (student) => {
    return {
      type: UPDATE_STUDENT,
      student,
    };
};
  
  const _updateCampus = (campus) => {
    return {
      type: UPDATE_CAMPUS,
      campus,
    };
};

export const getStudents = () => {
    return async (dispatch) => {
        const students = (await axios.get('/api/students')).data;
        dispatch(_getStudents(students));
    };
};

export const getCampuses = () => {
    return async (dispatch) => {
        const campuses = (await axios.get('/api/campuses')).data;
        dispatch(_getCampuses(campuses));
    };
};

export const createStudent = (student) => {
    return async (dispatch) => {
        const newStudent = (await axios.post('/api/students', student)).data;
        dispatch(_createStudent(newStudent));
    };
};

export const createCampus = (campus) => {
    return async (dispatch) => {
        const newCampus = (await axios.post('/api/campus', campus)).data;
        dispatch(_createCampus(newCampus));
    };
};

export const deleteStudent = (id) => {
    return async (dispatch) => {
        await axios.delete(`/api/students/${id}`);
        dispatch(_deleteStudent(id))
    };
};

export const deleteCampus = (id) => {
    return async (dispatch) => {
        await axios.delete(`/api/campus/${id}`);
        dispatch(_deleteCampus(id))
    };
};

export const updateStudent = (student) => {
    return async (dispatch) => {
        student = (await axios.put(`/api/students/${student.id}`, student)).data;
        dispatch(_updateStudent(student));
    };
};

export const updateCampus = (campus) => {
    return async (dispatch) => {
        campus = (await axios.put(`/api/campus/${campus.id}`, campus)).data;
        dispatch(_updateCampus(campus));
    };
};

const students = (state = [], action) => {
    switch (action.type) {
        case GET_STUDENTS:
            return action.students;
        case CREATE_STUDENT:
            return [...state, action.student];
        case DELETE_STUDENT:
            return state.filter((student)=> student.id !== action.id);
        case UPDATE_STUDENT:
            return state.map((student) => student.id === action.student.id ? action.student : student);
    default:
        return state;
    }
};

const campuses = (state = [], action) => {
    switch (action.type) {
        case GET_CAMPUSES:
            return action.campuses;
        case CREATE_CAMPUS:
            return [...state, action.campus];
        case DELETE_CAMPUS:
            return state.filter((campus)=> campus.id !== action.id);
        case UPDATE_CAMPUS:
            return state.map((campus) => campus.id === action.campus.id ? action.campus : campus); 
    default:
        return state;
    }
};

const reducer = combineReducers({
    students,
    campuses
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;