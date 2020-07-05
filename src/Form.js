import React, { Component } from 'react'

class Form extends Component {
  initialState = {
    name: '',
    job: '',
  }

  state = this.initialState

  handleChange = (event) => {
    const { name, value } = event.target
  
    this.setState({
      [name]: value,
    })
  }
/* Creating submitForm method */
  submitForm = () => {
    this.props.handleSubmit(this.state) /* Pass caracter throgh state */
    this.setState(this.initialState) /* Reset form */
  }

  render() {
    const { name, job } = this.state;
  
    return (
      <form>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={this.handleChange} />
        <label htmlFor="job">Job</label>
        <input
          type="text"
          name="job"
          id="job"
          value={job}
          onChange={this.handleChange} />

      <input type="button" value="Submit" onClick={this.submitForm} />
      </form>
    );
  }

  
}
export default Form;