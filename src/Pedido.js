import React from 'react';
import { Redirect } from 'react-router'

// Tela do resumo do pedido
// inclui o preço total, um botão de finalizar compra que esvazia o carrinho e um botão de voltar à página de produtos

 class TelaPedido extends React.Component {

	constructor(props){ // inicializa os dados do componente
		super(props); //necessário em todo construtor (até onde entendi)

		this.state = {
			pagina: "tela_pedido" // página que deve ser renderizada
		};
		this.volta_pagina_produtos = this.volta_pagina_produtos.bind(this); // necessário para que as funções sejam reconhecidas nas chamadas
	}

	volta_pagina_produtos () { // indica a tela de produtos como página que deve ser renderizada
		this.setState({
			pagina: "tela_produtos"
		});
	}

	render (){

		if(this.state.pagina === "tela_produtos" ) { // redireciona para a página de produtos
			return <Redirect to ="/produtos" />
		}
		else {
			
			return (
				<div> 
					<h1>Resumo do pedido</h1> 

					<label name="calculo_preco_total"> {this.props.calcular_preco_total()} </label> 

					<br />

					<button name="botao_finaliza_compra" type="button" className="btn btn-info" onClick={this.props.esvaziarCarrinho}> Finalizar compra! </button>

					<br /> <br />

					<button name="botao_volta_produtos" type="button" className="btn btn-info" onClick={this.volta_pagina_produtos}> Voltar para a página de produtos </button>
				</div>

			);	
		}	
	}
}

export default TelaPedido;