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
    };
  
    componentDidUpdate(prevProps) {
        if (!prevProps.campus && this.props.campus) {
            const { name, address } = this.props.campus;
            this.setState({ name, address });
        }
    };
  
    handleChange(evt) {
      this.setState({
        [evt.target.name]: evt.target.value,
      });
    };
  
    async handleSave(evt) {
        evt.preventDefault();
        try {
          const { name, address } = this.state;
          await this.props.updateCampus({
            id: this.props.campus.id,
            name,
            address
          });
        } catch (er) {
          this.setState({ error: er.response.data });
        }
    };
  
    render() {
      const { name, address } = this.state;
      const { props } = this.props;
      const { handleSave, handleChange } = this;
  
      return (
        <div>
            <form onSubmit={handleSave}>
                <label htmlFor="name">Name:</label>
                <input
                  name='name'
                  onChange={handleChange}
                  value={name}
                  placeholder='Campus Name'
                />

                <label htmlFor="address">Address:</label>
                <input
                  name='address'
                  onChange={handleChange}
                  value={address}
                  placeholder='Campus Address'
                />

                <button type="submit">Submit</button>
            </form>
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