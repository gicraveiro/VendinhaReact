import React from 'react';
import { Redirect } from 'react-router'

//Tela de produtos
// Mostra cards com todos os produtos disponíveis, permite aumentar e diminuir quantidade de cada item no carrinho

class CardProduto extends React.Component {

	render () {

		const indice_no_carrinho = this.props.carrinho.map(function(produto) { // procura o produto dentro do carrinho e retorna o seu indice no carrinho se encontrar
					 					return produto.item_id.toString();
					 				}).indexOf(this.props.id)
		var qtd_produtoX_carrinho = 0

		if (indice_no_carrinho !== -1) {
			qtd_produtoX_carrinho = this.props.carrinho[indice_no_carrinho].qtd // atribui a quantidade de unidades daquele item está no carrinho
		}

		return (

			<div name="card_produto" className="card" style={{width: "12rem", backgroundColor:"aliceblue", color:"teal"}}>
				
				<img name="foto_produto" src={this.props.image} className="card-img-top" alt="Foto do produto"/>
				
				<div className="card-body">
					
					<h6 name="nome_produto" className="card-title"> {this.props.name} </h6>
				
					<div name="preco_produto"> $ {this.props.price} </div> 

					<br />
					
					<label>Colocar no carrinho</label> 

					<button name="botao_adicionar_carrinho" type="button" className="btn btn-info" onClick={() => this.props.adicionarCarrinho(this.props.id, this.props.price, this.props.name)} >+</button>  
		
				 	<label>  Qtd: {qtd_produtoX_carrinho}  </label> 			
				
					<button name="botao_diminuir_carrinho" type="button" className="btn btn-info" onClick={() => this.props.diminuirCarrinho(this.props.id, this.props.price, this.props.name)} >-</button>
				</div>
			
			</div>
		
		);
	}
	
}

function Lista_Produtos_Disponiveis(props) { 

	// retorna um card de produto que exibe suas informações relevantes para o usuário para cada produto disponível
	const Lista_Produtos_Disponiveis = props.produtos.map((produtos) =>
		<CardProduto key={produtos.id.toString()} name={produtos.name} price={produtos.price} image={produtos.image} id={produtos.id} user={props.user} carrinho={props.carrinho} adicionarCarrinho={props.adicionarCarrinho} diminuirCarrinho={props.diminuirCarrinho}/>
	);

	return (
		<ul className="row">{Lista_Produtos_Disponiveis}</ul>
	);

}

// Tela de produtos
class TelaProdutos extends React.Component { 

	constructor(props){
		super(props); // necessário em todo construtor (até onde entendi)

		this.state = {
			carregando: true, // flag que indica carregamento dos dados do .json (porque demora um pouco)
			produtos: null, // vetor que receberá os produtos
			pagina: "tela_produtos" // página que deve ser renderizada
		};
		this.chamaCarrinho = this.chamaCarrinho.bind(this);

	}

	chamaCarrinho() { // indica a tela de produtos como página que deve ser renderizada
		this.setState({
			pagina: "tela_carrinho"
		});
	}

	// função que busca os dados do json
	async componentDidMount () { //função é assíncrona, para que possa esperar a resposta de fetch
		const url = "https://5d6da1df777f670014036125.mockapi.io/api/v1/product";
		const response = await fetch(url); //espera a resposta de fetch
		const dados = await response.json();
		this.setState({
			carregando: false, 
			produtos: dados, // resgata o vetor com todos os produtos do json, para acessá-los deve-se usar as "props" id, createdAt, name, price, image, stock
		}) 
	}

	render () {
	
		if(this.state.pagina === "tela_carrinho" ) { // redireciona para a página do carrinho de compras
			return <Redirect to ="/carrinho" />
		}
		else {
			return (
				<div name="tela_produtos">
					<p name="mensagem_boas_vindas"> Bem-vinda {this.props.user.nome}</p>

					<button name="botao_ir_carrinho" type="button" className="btn btn-info" onClick={this.chamaCarrinho}> Ver carrinho de compras </button>

					<h2 name="titulo_pagina"> Produtinhos disponíveis </h2>
					
					{this.state.carregando || !this.state.produtos ? ( // verifica se os dados já foram resgatados
						<div>carregando...</div> 
					) : ( 
						
						<div name="lista_produtos">
							
							<Lista_Produtos_Disponiveis produtos={this.state.produtos}  carrinho={this.props.carrinho} adicionarCarrinho={this.props.adicionarCarrinho} diminuirCarrinho={this.props.diminuirCarrinho}/>

						</div>
					)}
				</div>
			);
		}
	}
}

export default TelaProdutos;

