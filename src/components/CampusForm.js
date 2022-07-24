import React, { Component } from 'react';
import { createCampus } from '../store';
import { connect } from 'react-redux';

class CampusForm extends Component {
    constructor() {
      super();
      this.state = {
        name: '',
        address: '',
        description: '',
        imageURL: ''
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(evt) {
      this.setState({
        [evt.target.name]: evt.target.value,
      });
    }
  
    async handleSubmit(evt) {
      evt.preventDefault();
        await this.props.createCampus({ ...this.state });
    }
  
    render() {
      const { name, address, description } = this.state;
      const { handleSubmit, handleChange } = this;
      return (
        <div>
          <form onSubmit={handleSubmit}>
            <input
              name="name"
              onChange={handleChange}
              value={name}
              placeholder="Campus Name"
            />
  
            <input
              name="address"
              onChange={handleChange}
              value={address}
              placeholder="Address"
            />
  
            <input
              name="description"
              onChange={handleChange}
              value={description}
              placeholder="Campus Description"
            />
  
            <button type="submit">Submit</button>
          </form>
        </div>
      );
    }
  }
  
  const mapStateToProps = (state) => state;
  
  const mapDispatchToProps = (dispatch) => {
    return {
      createCampus: (campus) => {
        dispatch(createCampus(campus));
      },
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(CampusForm);