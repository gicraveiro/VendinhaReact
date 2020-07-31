import React from 'react';
//import { Redirect } from 'react-router'



class TelaPedido extends React.Component {


	render (){
		return (
			<div> 
				<h1>Resumo do pedido</h1> 

				<label> {this.props.calcular()} </label>

				<br />

				<button type="button" class="btn btn-info" onClick={this.esvaziarCarrinho}> Finalizar compra! </button>
			</div>

		);
	}
}

export default TelaPedido;