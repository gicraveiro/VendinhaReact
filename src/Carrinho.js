import React from 'react';
import { Redirect } from 'react-router'

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