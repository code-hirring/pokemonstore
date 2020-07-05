import React, { Component } from 'react'


const TableBody = (props) => {

      
      const grid  = props.pokemons.map((row, index) => {
      return (

            <tr key={row[0]}>
                
              {row.map(cellId => <th key={cellId.name} id={cellId.name}>  <img src={cellId.url} alt={cellId.name}/> <br /> Nome:{cellId.name} <br /> Preço: R$ {cellId.preco} <br /> <button onClick={() => props.adicionarPokemonCarrinho(cellId)}>Adicionar</button></th>)}
            </tr>
    )
  })

 
  

  return <tbody key='tbody_pokemon' id ='tbody_pokemon'>{grid}</tbody>
}



class Table extends Component {
  render() {

    const { pokemon_data, adicionarPokemonCarrinho } = this.props;

   /*  console.log(adicionarPokemonCarrinho) */
    return (
        
      <table key='table_pokemon' id='table_pokemon'>
        <TableBody pokemons={pokemon_data} adicionarPokemonCarrinho={adicionarPokemonCarrinho}  />
      </table>
    )
  }
}

export default Table