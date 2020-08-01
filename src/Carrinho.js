import React from 'react';
import { Redirect } from 'react-router'

class MiniCard extends React.Component {

	render () {

		return ( 

			<div className="card" style={{width: "12rem", backgroundColor:"aliceblue", color:"teal"}}>
				
			
				<div className="card-body">
					<h6> {this.props.name} </h6> 
				
					<div> $ {this.props.price} </div> 
 
					{/*<button type="button" className="btn btn-info" idProduto={this.props.id} user={this.props.user}  onClick={() => this.props.adicionarCarrinho(this.props.id, this.props.price, this.props.name)} >+</button>*/}   
		
					<label>  Qtd: {this.props.qtd} </label>					
				
					{/*<button type="button" className="btn btn-info" idProduto={this.props.id} onClick={() => this.props.diminuirCarrinho(this.props.id, this.props.price, this.props.name)} >-</button>*/}
				</div>
			</div>
		);
	}
}

function Lista(props) { 

	const listaProd = props.carrinho.map((produtos) =>
//		<CardProduto key={produtos.id.toString()} name={produtos.name} price={produtos.price} image={produtos.image} id={produtos.id} user={props.user} carrinho={props.user.carrinho} adicionarCarrinho={props.adicionarCarrinho} diminuirCarrinho={props.diminuirCarrinho}/>
		<MiniCard key={produtos.item.toString()} name={produtos.name} price={produtos.preco} qtd={produtos.qtd} id={produtos.item} adicionarCarrinho={props.adicionarCarrinho} diminuirCarrinho={props.diminuirCarrinho}/>
	);

	return (
		<ul className="row">{listaProd}</ul>
	);

}


class TelaCarrinho extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			pagina: "tela_carrinho",
		}
	}

	chamaFinaliza = () => { // indica a tela de produtos como página que deve ser renderizada
		this.setState({
			pagina: "tela_pedido"
		});
	}

	render (){
		if(this.state.pagina === "tela_pedido" ) { // caso a página que deva ser renderizada seja a de login, redireciona para a página de login
			return <Redirect to ="/pedido" />
		}
		else {
			return (
				<div>	
					<h1>Carrinho de compras</h1>

					<Lista carrinho={this.props.carrinho} adicionarCarrinho={this.props.adicionarCarrinho} diminuirCarrinho={this.props.diminuirCarrinho}/>

					{/*<MiniCard name={this.props.users[0].carrinho[0].name} price={this.props.users[0].carrinho[0].price}/>*/}

					<div className="form-group" style={{width: "20rem"}}>

						<label>Forma de pagamento</label>
						<select className="form-control">
							<option>Boleto</option>
							<option>Cartão de crédito</option>
							<option>Cartão de débito</option>
						</select>
					</div>
					<button type="button" className="btn btn-info" onClick={this.chamaFinaliza}> Finalizar compra! </button>
				</div>

			);
		}
	}
}

export default TelaCarrinho;