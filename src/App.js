import React, { Component } from 'react'
//Import table.js
import Table from './Table'

/* Import Form */
import InputTextSearch from './InputTextSearch'
import Carrinho from './Carrinho'

import CompraFinalizada from './CompraFinalizada'

import './pokemon.css'

class App extends Component {

  state = {
    pokemons: [],
    pokemons_query: [],
    data: [],
    pokemons_carrinho: [],
    total: parseFloat(0),
    show_compra_finalizada : false
  }

  // Code is invoked after the component is mounted/inserted into the DOM tree.
  componentDidMount() {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=151'

    fetch(url)
      .then((result) => result.json())
      .then((result) => {
        var ct = 1;
        const pokemons_fetch = result.results.map((entry, index) => {
          var id = index + 1;
          var url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
          entry.url = url
          const min = 1;
          const max = 100;
          
          const rand = ((min+Math.random() * (max-min))).toFixed(2);
          if (ct  >= 3 ){
            ct =1;
          }else{
            ct++;
          }

          return { ...entry, ['preco']: parseFloat(rand), ['preco_inicial']: parseFloat(rand) }
        })

        const pokemons_reduce = pokemons_fetch.reduce((total, current, index) => {
          const ITEMS_PER_PAGE = 3;
          const belongArrayIndex = Math.ceil((index + 1) / ITEMS_PER_PAGE) - 1
          total[belongArrayIndex] ? total[belongArrayIndex].push(current) : total.push([current])
          return total;
        }, [])


        console.log(pokemons_reduce)
        this.setState({
          pokemons: pokemons_reduce,
          pokemons_query: pokemons_reduce,
        })
      })
  }



  /* Filter Pokemon */
  handleSubmit = (name_pokemon) => {

    console.log("================")
    console.log("UPDATING GRID")
    console.log("================")
    console.log("================")
    console.log("NAME POKEMON")
    console.log("================")
    console.log(name_pokemon)
    const { pokemons } = this.state
    console.log("================")
    console.log("POKEMONS")
    console.log("================")
    console.log(pokemons)

    const pokemons_filter = pokemons.reduce((super_total, pokemon_slice, index) => {
      const pokemon = pokemon_slice.reduce((total, pokemon, index) => {
        console.log("================")
        console.log("FILTER")
        console.log("================")
        console.log(index)
        console.log(name_pokemon)
        console.log(pokemon.name)
        console.log(pokemon.name.includes((name_pokemon)))
        console.log(typeof total)
        console.log(total)

        if (pokemon.name.includes((name_pokemon))) {
          const ITEMS_PER_PAGE = 3;
          const belongArrayIndex = Math.ceil((index + 1) / ITEMS_PER_PAGE) - 1
          /* total[belongArrayIndex] ? total[belongArrayIndex].push(pokemon) :  */
          total.push(pokemon)
        }
        return total
      }, [])

      console.log("================")
      console.log("SUPER REDUCE")
      console.log("================")
      console.log(pokemon)
      console.log(pokemon.length)
      if (pokemon !== 'undefined' && pokemon.length > 0 && pokemon !== []) {

        const ITEMS_PER_PAGE = 3;
        const belongArrayIndex = Math.ceil((index + 1) / ITEMS_PER_PAGE) - 1
        console.log(pokemon)
        super_total[belongArrayIndex] ? super_total.push(pokemon) : super_total.push(pokemon)
        console.log("================")
        console.log("SUPER TOTAL")
        console.log("================")

        console.log(super_total)

      }

      return super_total;

    }, []);
    console.log("================")
    console.log("POKEMON FILTER")
    console.log("================")
    console.log(pokemons_filter)

    this.setState({
      pokemons_query: pokemons_filter,
    })
  }

  addPokemonCarrinho = (pokemon) => {
    const { pokemons_carrinho, total } = this.state
    console.log(pokemon)


    var pokemons_update = []
    var exist_pokemon = pokemons_carrinho.filter(x => x.name === pokemon.name);
    var sum = parseFloat(0);
    if (exist_pokemon.length > 0) {
      pokemons_update = pokemons_carrinho.map((element, index) => {
        if (pokemon.name == element.name) {
          element['quantidade'] = element.quantidade + 1 ;
          element['preco'] = (element.preco * element.quantidade).toFixed(2);
        }
        sum = (parseFloat(sum) + parseFloat(element.preco)).toFixed(2)
        return element
      })
    } else {
      pokemon = { ...pokemon, ['quantidade']: 1 };
      pokemons_update = pokemons_carrinho;
      sum = (parseFloat(total) + parseFloat(pokemon.preco)).toFixed(2)
      pokemons_update.push(pokemon);
    }
    console.log(sum)
    this.setState({
      pokemons_carrinho: pokemons_update,
      total:sum,
    })
  }

  removerPokemonCarrinho = (pokemon) => { 
    const { pokemons_carrinho} = this.state


    const pokemons_update = pokemons_carrinho.filter((element, index) => {
      if (pokemon.name === element.name) {
        if(parseInt(element.quantidade) > 1){
          element['quantidade'] = parseInt(element.quantidade) -1 ;
          element['preco'] = (parseFloat(element.preco) - parseFloat(element.preco_inicial)).toFixed(2)

        }else if (parseInt(element.quantidade) === 1 ){
          
          element['quantidade'] = parseInt(element.quantidade) -1 ;
          element['preco'] = parseFloat(element.preco) - parseFloat(element.preco_inicial).toFixed(2)
        }
      }
      return element.quantidade > 0
    })
    var sum = 0;
    console.log(typeof(pokemons_update));
    console.log(pokemons_update);
    if (typeof pokemons_update !== 'undefined' && pokemons_update.length > 0){
      sum = parseFloat(pokemons_update.reduce((total, pokemon) => {total += parseFloat(pokemon.preco); return total},0)).toFixed(2);
    }else{
      sum = 0;
      
    }
    this.setState({
      pokemons_carrinho: pokemons_update,
      total: sum,
    })

  }


  trigger_popup = () =>{


  }

  resumir_compra_pokemon = () =>{
    console.log("RESUMIR COMPRA POKEMON")
    const { pokemons_carrinho, total } = this.state;
    const total_itens = pokemons_carrinho.reduce((total, current, index) => {
      total += current.quantidade
      return total;
    }, 0)
    const preco_total = total;

    return {total_itens:total_itens, preco_total:preco_total}
  }


  finalizar_compra_pokemon = () => {
    
    this.setState({
      show_compra_finalizada: true,
    })
    const { show_compra_finalizada } = this.state;
    console.log("Teste Finalizar Compra")
    console.log(show_compra_finalizada)
    console.log("")
  }

  voltar_compra_mais = () => {


    this.setState({
      pokemons_carrinho: [],
      total: 0,
      show_compra_finalizada: false
    })

  }


  render() {

    const { pokemons_query, pokemons_carrinho,total,show_compra_finalizada } = this.state

    const display_acao_finalizada = total > 0 ? 'flex' : 'none';

    return (

      <div id="container" className="container">
        <div id='frame_buscar_grid' className="frame_buscar_grid">
        <InputTextSearch handleSubmit={this.handleSubmit} />{/* Pass method param */}
        {/* Loading Table Class */}
        {<Table pokemon_data={pokemons_query} adicionarPokemonCarrinho={this.addPokemonCarrinho}  />}
        </div>
        <div className='section_carrinho'>
          <div className='label_carrinho'>Carrinho</div>
          <div className='carrinho'>
        {<Carrinho pokemons_carrinho={pokemons_carrinho} total={total} adicionarPokemonCarrinho={this.addPokemonCarrinho} removerPokemonCarrinho={this.removerPokemonCarrinho} />}
        </div>
        <a id='link_finalizar_compra_pokemon' className='label_finalizar' url='#' onClick={() => this.finalizar_compra_pokemon()}  style={{ display: display_acao_finalizada }} >Finalizar</a>
        </div>
        {<CompraFinalizada show_compra_finalizada={show_compra_finalizada} resumir_compra_pokemon={this.resumir_compra_pokemon} voltar_compra_mais={this.voltar_compra_mais} />}
            
      </div>

      
    )
  }
}

export default App
