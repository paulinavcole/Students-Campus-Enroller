import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import store, { getStudents, getCampuses } from '../store';
import Nav from './Nav';
import Students from './Students';
import Campuses from './Campuses';

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
                    <Route path="/" exact>
                    <Redirect to="/students" />
                </Route>
                <Route path="/students" exact component={Students} />
                <Route path="/campuses" exact component={Campuses} />
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