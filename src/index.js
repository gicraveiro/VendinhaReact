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

class Index extends React.Component {

	constructor(props) {
		super(props);

		this.state ={
			users: ["Lena Elena", "Ana Banana"], //deletarr
			users2: [
				{"email" : "lenelena@gmail.com", "senha" : "alo123", "cpf" :"0123", "nome" : "Lena Elena"},
				{"email" : "gi@email.com", "senha" : "cheguei", "cpf" : "1230", "nome" : "Gi"},
				{"email" : "gabriel@gmail.com", "senha" : "abracadabra", "cpf": "234", "nome" : "Gabriel"},
				{"email" : "araceli@gmail.com", "senha" : "senhadificil", "cpf" : "3432", "nome" : "Araceli"}
			], // talvez trocar aspas duplas por aspas simples
		
		};
	}

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
						users2={this.state.users2}
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
						users2={this.state.users2}
						id={this.state.users.id}
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