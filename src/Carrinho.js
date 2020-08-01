import React from 'react';
import { Redirect } from 'react-router'

// Tela do carrinho de compras 
// inclui todos os minicards correspondentes a cada produto se tiver produtos no carrinho, 
// escolha da forma de pagamento e botão de finalização da compra

// Layout do minicard para cada produto no carrinho
class ProdutoNoCarrinho extends React.Component {

	render () {

		return ( 

			<div name="card_produto_no_carrinho" className="card" style={{width: "12rem", backgroundColor:"aliceblue", color:"teal"}}>	
				
				<div className="card-body">

					<h6 name="nome_produto" > {this.props.name} </h6>
					
					<div name="preco_produto"> $ {this.props.price} </div> 
 		
					<label name="qtd_produto">  Qtd: {this.props.qtd} </label>					
				
				</div>
			</div>
		);
	}
}

// retorna uma lista com todos os produtos do carrinho
function Carrinho(props) { 

	if(props.carrinho.length === 0) { // se a quantidade de itens do carrinho é 0
		return (
			<label> O carrinho está vazio! </label> 
		);
	}

	// chama o minicard de produto para cada produto que está no carrinho
	const ProdutoCarrinho = props.carrinho.map((produtos) =>
		<ProdutoNoCarrinho key={produtos.item_id.toString()} name={produtos.name} price={produtos.preco} qtd={produtos.qtd} />
	);

	return (
		<ul className="row">{ProdutoCarrinho}</ul> // retorna lista com todos os cards dos produtos no carrinho
	);

}

// Tela do carrinho de compras
class TelaCarrinho extends React.Component {

	constructor(props){
		super(props); //necessário em todo construtor (até onde entendi)

		this.state = {
			pagina: "tela_carrinho",
		}
		this.chamaFinaliza = this.chamaFinaliza.bind(this); // necessário para que as funções sejam reconhecidas nas chamadas
	}

	chamaFinaliza() { // indica a tela de produtos como página que deve ser renderizada
		this.setState({
			pagina: "tela_pedido"
		});
	}

	render (){
		if(this.state.pagina === "tela_pedido" ) { // redireciona para a página de login se for indicado
			return <Redirect to ="/pedido" />
		}
		else {
			return (
				<div>	
					<h1>Carrinho de compras</h1>

					<Carrinho carrinho={this.props.carrinho} />

					<div name="formulario" className="form-group" style={{width: "20rem"}}>

						<label name="label_forma_pagamento">Forma de pagamento</label>
						<select name="select_forma_pagamento" className="form-control">
							<option>Boleto</option>
							<option>Cartão de crédito</option>
							<option>Cartão de débito</option>
						</select>
					</div>

					<button name="botao_finalizar_compra"type="button" className="btn btn-info" onClick={this.chamaFinaliza}> Finalizar compra! </button>
				</div>

			);
		}
	}
}

export default TelaCarrinho;