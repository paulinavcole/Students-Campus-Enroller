import { createStore, applyMiddleware, combineReducers } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const GET_STUDENTS = 'GET_STUDENTS';
const GET_CAMPUSES = 'GET_CAMPUSES';

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

const students = (state = [], action) => {
    switch (action.type) {
        case GET_STUDENTS:
            return action.students;
    default:
        return state;
    }
};

const campuses = (state = [], action) => {
    switch (action.type) {
        case GET_CAMPUSES:
            return action.campuses;
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