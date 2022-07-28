import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { getStudents, getCampuses } from '../store';
import Nav from './Nav';
import Home from './Home'
import Students from './Students';
import Campuses from './Campuses';
import SingleCampus from './SingleCampus';
import SingleStudent from './SingleStudent';
import CampusForm from './CampusForm';
import StudentForm from './StudentForm';




class App extends Component {
    componentDidMount() {
      this.props.loadStudents();
      this.props.loadCampuses();
    }

    render() {
      return (
        <div>
            <Router>
                <Nav props={this.props} />
                <div>
                <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/students" exact component={Students} />
                <Route path="/campuses" exact component={Campuses} />
                <Route path="/students/:id" exact component={SingleStudent} />
                <Route path="/campuses/:id" exact component={SingleCampus} />
                <Route path="/campuses" exact component={CampusForm} />
                <Route path="/students" exact component={StudentForm} />
                </Switch>
          </div>
        </Router>
      </div>
      );
    }
  }
  
  const mapStateToProps = (state) => state;
  
  const mapDispatchToProps = (dispatch) => {
    return {
      loadStudents: () => {
        dispatch(getStudents());
      },
      loadCampuses: () => {
        dispatch(getCampuses());
      },
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(App);