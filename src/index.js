import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import Login from './Login.js'
import TelaCadastro from './Cadastro.js'
import TelaProdutos from './TelaProdutos.js'
import TelaCarrinho from './Carrinho.js'
import TelaPedido from './Pedido.js'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// indica qual componente de tela deve ser renderizado, de acordo com o path
// inicialmente indica o componente App

// criar state global

export function adicionarCarrinho (qtd) {
	return qtd + 1;

}


class Index extends React.Component {

	constructor(props) {
		super(props);

		this.state ={
			users: [
				{"email" : "lenelena@gmail.com", "senha" : "alo123", "cpf" :"0123", "nome" : "Lena Elena", 
				"carrinho" : [
					{"item" : "1", "qtd" : "0" }]
				},
//				{"email" : "gi@email.com", "senha" : "cheguei", "cpf" : "1230", "nome" : "Gi"},
//				{"email" : "gabriel@gmail.com", "senha" : "abracadabra", "cpf": "234", "nome" : "Gabriel"},
//				{"email" : "araceli@gmail.com", "senha" : "senhadificil", "cpf" : "3432", "nome" : "Araceli"}
			], // talvez trocar aspas duplas por aspas simples
		
		};
		this.adicionarCarrinho = this.adicionarCarrinho.bind(this);
		this.diminuirCarrinho = this.diminuirCarrinho.bind(this);
	}

	adicionarCarrinho(e){// necessario passar como parametro o id do item, o id do usuário
		
		e.preventDefault();
		const value = parseInt(this.state.users[0].carrinho[0].qtd,10) + 1

		this.setState({
			...this.state.users[this.state.users[0].carrinho[0].qtd = value]
		});
	}

	diminuirCarrinho(e){// necessario passar como parametro o id do item, o id do usuário
		
		e.preventDefault();
		if (parseInt(this.state.users[0].carrinho[0].qtd,10) >= 1) {
		const value = parseInt(this.state.users[0].carrinho[0].qtd,10) - 1
			this.setState({
			...this.state.users[this.state.users[0].carrinho[0].qtd = value]
			});
		}
		
	}

	// criar funções adicionar e remover do carrinho e passar como parametro

	render (){
		return (

			<BrowserRouter> 
			<Switch> 

				<Route 
					path="/" 
					exact={true} 
					component={() => <App 
						users={this.state.users}
					/> } 
				/>

				<Route 
					path="/login" 
					component={() => <Login
						users={this.state.users}
						users={this.state.users}
						id={this.state.users.id}
					/> }
				/>

				<Route 
					path="/cadastro" 
					component={() => <TelaCadastro
						users={this.state.users}
					/> }
				/>

				<Route 
					path="/produtos" 
					component={() => <TelaProdutos
						users={this.state.users}
						users={this.state.users}
						id={this.state.users.id}
						adicionarCarrinho={this.adicionarCarrinho}
						diminuirCarrinho={this.diminuirCarrinho}
					 />}
				/>

				<Route 
					path="/carrinho" 
					component={() => <TelaCarrinho 
						users={this.state.users}
					/>}
				/>

				<Route 
					path="/pedido" 
					component={() => <TelaPedido
						users={this.state.users}
					/>}
				/>
			
			</Switch>
		</BrowserRouter>
		
		);
	}

}

ReactDOM.render (
	<Index />,
	document.getElementById('root')
);