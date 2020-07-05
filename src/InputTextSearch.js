import React, { Component } from 'react'

class InputTextSearch extends Component {
    initialState = {
        query: '',
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
        this.props.handleSubmit(this.state.query) /* Pass caracter throgh state */
        this.setState(this.initialState) /* Reset form */
      }
    
      render() {
        const { query } = this.state;
      
        return (
          <div key='frame_buscar' id='frame_buscar'>
          <form>
            
            <label htmlFor="query">PokemonStore</label>
            <input id="label_search" type="button" alt="Procurar" width="16" height="16" onClick={this.submitForm} />
            <input 
              type="text"
              name="query"
              id="query"
              value={query}
              onChange={this.handleChange} placeholder="Insira o nome do pokemon desejado" />
            
          
          </form>
          </div>
        );
      }
    
      
  }


  export default InputTextSearch