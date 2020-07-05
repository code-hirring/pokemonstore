import React, { Component } from 'react'





class CompraFinalizada extends Component {
  render() {

    const { show_compra_finalizada, voltar_compra_mais, resumir_compra_pokemon } = this.props

    const display = show_compra_finalizada ? 'flex' : 'none';
    const {total_itens, preco_total } = resumir_compra_pokemon();
    console.log("CompraFinalizada")
    console.log(total_itens);
    console.log(preco_total);

    return (


      <div className='container_compra_finalizada' style={{ display: display }} >

        <div className='popup_compra_finalizada'>
    <div className='content_popup_compra_finalizada'> <h1>Parabéns</h1> <h3> Compra Realizada!!!</h3> <span>{total_itens} items de pokemon, total R$ {preco_total}</span> </div>

          <div className='action_popup_compra_finalizada'> <button onClick={() => voltar_compra_mais()}>Compra Mais</button>

          </div>

        </div>
      </div>


    )
  }
}

export default CompraFinalizada