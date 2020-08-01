import React from 'react';
import { Redirect } from 'react-router'

// Tela do resumo do pedido
// inclui o preço total, um botão de finalizar compra que esvazia o carrinho e um botão de voltar à página de produtos

 class TelaPedido extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			pagina: "tela_pedido"
		};

	}

	volta_pagina_produtos () { // indica a tela de produtos como página que deve ser renderizada
		this.setState({
			pagina: "tela_produtos"
		});
	}

	render (){

		if(this.state.pagina === "tela_produtos" ) { // caso a página que deva ser renderizada seja a de login, redireciona para a página de login
			return <Redirect to ="/produtos" />
		}
		else {
			return (
				<div> 
					<h1>Resumo do pedido</h1> 

					<label> {this.props.calcular_preco_total()} </label>

					<br />

					<button type="button" className="btn btn-info" onClick={this.props.esvaziarCarrinho}> Finalizar compra! </button>

					<br /> <br />

					<button type="button" className="btn btn-info" onClick={this.volta_pagina_produtos}> Voltar para a página de produtos </button>
				</div>

			);	
		}
		
	}
}

export default TelaPedido;