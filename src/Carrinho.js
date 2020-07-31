import React from 'react';
import { Redirect } from 'react-router'

class MiniCard extends React.Component {

	render () {

/*		const index = this.props.carrinho.map(function(e) {
			return e.item;
		}).indexOf(this.props.id)
*/		var qtd = 0

		/*if (index !== -1) {
			//qtd = this.props.carrinho[index].qtd
		}*/
		return ( // {this.props.price}

			<div class="card" style={{width: "12rem", backgroundColor:"aliceblue", color:"sienna"}}>
				
				<div class="card-body">
					<h6> {this.props.name} </h6> {/*NOME NAO ESTÁ CHEGANDO*/}
				
					<div> $ {this.props.price} </div> 
 
					<button type="button" class="btn btn-info" /*onClick={this.props.adicionarCarrinho.bind(this,[this.props.user, index, qtd,this.props.id])}*/ >+</button>  
		
					<label>  Qtd: {this.props.qtd} </label>					
				
					<button type="button" class="btn btn-info" onClick={this.props.diminuirCarrinho} >-</button>
				</div>
			</div>
		);
	}
}

function Lista(props) { 

	const listaProd = props.carrinho.map((produtos) =>
//		<CardProduto key={produtos.id.toString()} name={produtos.name} price={produtos.price} image={produtos.image} id={produtos.id} user={props.user} carrinho={props.user.carrinho} adicionarCarrinho={props.adicionarCarrinho} diminuirCarrinho={props.diminuirCarrinho}/>
		<MiniCard key={produtos.item.toString()} name={produtos.name} price={produtos.preco} qtd={produtos.qtd} />
	);

	return (
		<ul class="row">{listaProd}</ul>
	);

}


class TelaCarrinho extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			page: "here",
		}
	}

	chamaFinaliza = () => { // indica a tela de produtos como página que deve ser renderizada
		this.setState({
			page: "vai_finaliza"
		});
	}

	render (){
		if(this.state.page === "vai_finaliza" ) { // caso a página que deva ser renderizada seja a de login, redireciona para a página de login
			return <Redirect to ="/pedido" />
		}
		else {
			return (
				<div>	
					<h1>Carrinho de compras</h1>

					<Lista carrinho={this.props.carrinho} />

					{/*<MiniCard name={this.props.users[0].carrinho[0].name} price={this.props.users[0].carrinho[0].price}/>*/}

					<div class="form-group" style={{width: "20rem"}}>

						<label>Forma de pagamento</label>
						<select class="form-control">
							<option>Boleto</option>
							<option>Cartão de crédito</option>
							<option>Cartão de débito</option>
						</select>
					</div>
					<button type="button" class="btn btn-info" onClick={this.chamaFinaliza}> Finalizar compra! </button>
				</div>

			);
		}
	}
}

export default TelaCarrinho;