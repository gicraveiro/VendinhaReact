import React from 'react';
//import { Redirect } from 'react-router'

class TelaPedido extends React.Component {


	render (){
		return (
			<div> 
				<h1>Resumo do pedido</h1> 

				

				<button type="button" class="btn btn-info" onClick={this.chamaFinaliza}> Finalizar compra! </button>
			</div>

		);
	}
}

export default TelaPedido;