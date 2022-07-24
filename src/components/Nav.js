import React from 'react';
import { Link } from 'react-router-dom';

const Nav = (props) => {
    const { students, campuses } = props.props;

    return (
        <nav>
            <h1>Campuses and Enrollments</h1>
            <ul>
                <Link to='/students'>
                    <li>STUDENTS ({students.length})</li>
                </Link>
                <Link to='/campuses'>
                    <li>CAMPUSES ({campuses.length})</li>
                </Link>
                <Link to='/'>
                    <li>HOME</li>
                </Link>
            </ul>
        </nav>
    )
};

export default Nav;

