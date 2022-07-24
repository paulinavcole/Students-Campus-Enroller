import React, { Component } from 'react';
import { updateCampus } from '../store';
import { connect } from 'react-redux';

class UpdateCampusForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name: this.props.campus ? this.props.campus.name : '',
        address: this.props.campus ? this.props.campus.address : ''
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSave = this.handleSave.bind(this);
    }
  
    componentDidUpdate(prevProps) {
      if (!prevProps.campus && this.props.campus) {
        this.setState({
             name: this.props.campus.name, 
             address: this.props.campus.address
        });
      }
    }
  
    handleChange(evt) {
      this.setState({
        [evt.target.name]: evt.target.value,
      });
    }
  
    async handleSave(evt) {
      evt.preventDefault();
      const { name, address } = this.state;
        await this.props.updateCampus({
          id: this.props.campus.id,
          name,
          address
        });
    }
  
    render() {
      const { name, address } = this.state;
      const { props } = this.props;
      const { handleSave, handleChange } = this;
  
      return (
        <div>
            <form onSubmit={handleSave}>
                <input
                  name='name'
                  onChange={handleChange}
                  value={name}
                  placeholder='Campus Name'
                />

                <input
                  name='address'
                  onChange={handleChange}
                  value={address}
                  placeholder='Campus Address'
                />

            </form>
            <button type="submit">Submit</button>
        </div>        
      );
    }
  }
  
  const mapStateToProps = (state, { props }) => {
    const campus = state.campuses.find(
      (campus) => campus.id === +props.match.params.id
    );
  
    return {
      campus,
      ...state,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      updateCampus: (campus) => dispatch(updateCampus(campus)),
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(UpdateCampusForm);