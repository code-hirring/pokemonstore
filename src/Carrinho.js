import React, { Component } from 'react'



const TableHeader = () => {
  return (
    <thead key='theader_pokemon' id ='theader_pokemon'>
      <th></th>
      <th style={{textAlign: 'center'}}>Nome</th>
      <th style={{textAlign: 'center'}}>Preço</th>
      <th></th>
      <th style={{textAlign: 'center'}}>Qt</th>
      <th></th>
    </thead>
  )
}

const TableBody = (props) => {

      const tabela  = props.pokemons.map((pokemon, index) => {
      return (

            <tr key={index}>
              <td><img src={pokemon.url} alt={pokemon.name}/> </td> 
              <td>{pokemon.name}</td> 
              <td>R$ {pokemon.preco}</td>
              <td><button onClick={() => props.removerPokemonCarrinho(pokemon) } className='butao_vermelho'>-</button></td> 
              <td style={{textAlign: 'center'}} >{pokemon.quantidade}</td>
              <td><button onClick={() => props.adicionarPokemonCarrinho(pokemon)} className='butao_verde'>+</button></td>
            </tr>
    )
  })

  return <tbody key='tbody_carrinho' id='tbody_carrinho'>{tabela}</tbody>
}

const TableFooter = (props) => {
  const total = props.total_carrinho;
  return (
    <tfoot key='tfooter_pokemon' id ='tfooter_pokemon'>
      <tr>
      <th>Total</th>
      <th></th>
      <th></th>
      <th></th>
      <th>R$ {total}</th>
      </tr>
    </tfoot>
  )
}

class Carrinho extends Component {
  render() {

    const {pokemons_carrinho, total, adicionarPokemonCarrinho, removerPokemonCarrinho} = this.props
    console.log(total)

    return (
      <div id='frame_carrinho' key='frame_carrinho'>
      <table key='table_carrinho' id='table_carrinho'>
        <TableHeader />
        <TableBody pokemons={pokemons_carrinho} adicionarPokemonCarrinho={adicionarPokemonCarrinho} removerPokemonCarrinho={removerPokemonCarrinho} />
        <TableFooter total_carrinho={total} />
      </table>
      </div>
    )
  }
}

export default Carrinho