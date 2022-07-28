import React from 'react';
import { Link } from 'react-router-dom';


const Nav = (props) => {
    const { students, campuses } = props.props;

    return (
        <nav>
            <Link to='/'>
                    <li>HOME</li>
                </Link>
                <Link to='/students'>
                    <li>STUDENTS ({students.length})</li>
                </Link>
                <Link to='/campuses'>
                    <li>CAMPUSES ({campuses.length})</li>
                </Link>
        </nav>
    )
};


export default Nav;

