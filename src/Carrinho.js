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

			<div class="card" style={{width: "12rem", backgroundColor:"LemonChiffon", color:"sienna"}}>
				
				<div class="card-body">
					<h6> {/*this.props.name*/} lala </h6>
				
					<div> $  </div> 
 
					<button type="button" class="btn btn-info" /*onClick={this.props.adicionarCarrinho.bind(this,[this.props.user, index, qtd,this.props.id])}*/ >+</button>  
		
					<label>  Qtd: {qtd} </label>					
				
					<button type="button" class="btn btn-info" onClick={this.props.diminuirCarrinho} >-</button>
				</div>
			</div>
		);
	}
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

					<MiniCard />

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