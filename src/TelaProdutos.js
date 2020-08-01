import React from 'react';
import { Redirect } from 'react-router'

class CardProduto extends React.Component {

	render () {

		const indice_no_carrinho = this.props.carrinho.map(function(e) { // procura o produto dentro do carrinho e retorna o seu indice no carrinho se encontrar
					 		return e.item.toString();
					 	}).indexOf(this.props.id)
		var qtd = 0

		if (indice_no_carrinho !== -1) {
			qtd = this.props.carrinho[indice_no_carrinho].qtd
		}

		return (

			<div className="card" style={{width: "12rem", backgroundColor:"aliceblue", color:"teal"}}>
				
				<img src={this.props.image} className="card-img-top" alt="Foto"/>
				<div className="card-body">
					
					<h6 className="card-title"> {this.props.name} </h6>
				
					<div> $ {this.props.price} </div> 

					<br />
					
					<label>Colocar no carrinho</label> 
					<button type="button" className="btn btn-info" id_produto={this.props.id} onClick={() => this.props.adicionarCarrinho(this.props.id, this.props.price, this.props.name)} >+</button>  
		
				 	<label>  Qtd: {qtd}  </label> 			
				
					<button type="button" className="btn btn-info" id_produto={this.props.id} onClick={() => this.props.diminuirCarrinho(this.props.id, this.props.price, this.props.name)} >-</button>
				</div>
			
			</div>
		
		);
	}
	
}

function Lista(props) { 


	const listaProd = props.produtos.map((produtos) =>
		<CardProduto key={produtos.id.toString()} name={produtos.name} price={produtos.price} image={produtos.image} id={produtos.id} user={props.user} carrinho={props.carrinho} adicionarCarrinho={props.adicionarCarrinho} diminuirCarrinho={props.diminuirCarrinho}/>
	);

	return (
		<ul className="row">{listaProd}</ul>
	);

}

class TelaProdutos extends React.Component { 
	constructor(props){
		super(props);

		this.state = {
			carregando: true,
			produtos: null,
			pagina: "here"
		};

	}

	chamaCarrinho = () => { // indica a tela de produtos como página que deve ser renderizada
		this.setState({
			pagina: "tela_carrinho"
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
		}) 
	}

	render () {
	
		if(this.state.pagina === "tela_carrinho" ) { // caso a página que deva ser renderizada seja a de login, redireciona para a página de login
			return <Redirect to ="/carrinho" />
		}
		else {
			return (
				<div>
					<p> Bem-vinda {this.props.user.nome}</p>
					<button type="button" className="btn btn-info" onClick={this.chamaCarrinho}> Ver carrinho de compras </button>
					<h2 text-align='center'> Produtinhos</h2>
					{this.state.carregando || !this.state.produtos ? (
						<div>carregando...</div> 
					) : ( 
						
						<div>
							
							<Lista produtos={this.state.produtos}  carrinho={this.props.carrinho} adicionarCarrinho={this.props.adicionarCarrinho} diminuirCarrinho={this.props.diminuirCarrinho}/>

						</div>
				)}
				</div>
			);
		}
	
	}
}

export default TelaProdutos;

