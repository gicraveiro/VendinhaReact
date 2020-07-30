import React from 'react';
import { Redirect } from 'react-router'
import { render } from 'react-dom'

class CardProduto extends React.Component {

	constructor(props){
		super(props);

	}

	render () {
		return (

			<div class="card" style={{width: "12rem", backgroundColor:"LemonChiffon", color:"sienna"}}>
				
				<img src={this.props.image} class="card-img-top" alt="Foto"/>
				<div class="card-body">
					
					<h6 class="card-title"> {this.props.name} </h6>
				
					<div> $ {this.props.price} </div>

					<br />
					
					<label>Colocar no carrinho</label> 
					<button type="button" class="btn btn-info" onClick={this.props.adicionarCarrinho} >+</button>  
					<label>Qtd: {this.props.carrinho[0].qtd /*ARRUMAR INDICE DO CARRINHO*/} </label> 
					<button type="button" class="btn btn-info" onClick={this.props.diminuirCarrinho} >-</button>
				</div>
			
			</div>
		
		);
	}
	
}

function Lista(props) { 

	const listaProd = props.produtos.map((produtos) =>
		<CardProduto key={produtos.id.toString()} name={produtos.name} price={produtos.price} image={produtos.image} carrinho={props.user.carrinho} adicionarCarrinho={props.adicionarCarrinho} diminuirCarrinho={props.diminuirCarrinho}/>
	);

	return (
		<ul class="row">{listaProd}</ul>
	);

}

class TelaProdutos extends React.Component { 
	constructor(props){
		super(props);

		this.state = {
			carregando: true,
			produtos: null,
			page: "here"
		};

	}

	chamaCarrinho = () => { // indica a tela de produtos como página que deve ser renderizada
		this.setState({
			page: "vai_carrinho"
		});
	}

	// função que busca os dados do json
	async componentDidMount () { //função é assíncrona, para que possa esperar a resposta de fetch
		const url = "https://5d6da1df777f670014036125.mockapi.io/api/v1/product";
		const response = await fetch(url); //espera a resposta de fetch
		const data = await response.json();
		this.setState({
			carregando: false, 
			produtos: data, // resgata o produtos com todos os produtos do json, para acessá-los deve-se usar as "props" id, createdAt, name, price, image, stock
			tam2: data.length //desnecessário - apagar
		}) 
	}

	render () {
	
		if(this.state.page === "vai_carrinho" ) { // caso a página que deva ser renderizada seja a de login, redireciona para a página de login
			return <Redirect to ="/carrinho" />
		}
		else {
			return (
				<div>
					<p> Bem-vinda {this.props.users[0].nome}</p>
					<button type="button" class="btn btn-info" onClick={this.chamaCarrinho}> Ver carrinho de compras </button>
					<h2> Produtinhos</h2>
					{this.state.carregando || !this.state.produtos ? (
						<div>carregando...</div> 
					) : ( 
						
						<div>
							
							<Lista produtos={this.state.produtos} user={this.props.users[0]} adicionarCarrinho={this.props.adicionarCarrinho} diminuirCarrinho={this.props.diminuirCarrinho}/>

						</div>
				)}
				</div>
			);
		}
	
	}
}

export default TelaProdutos;

