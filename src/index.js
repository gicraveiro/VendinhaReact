import React from 'react';
import ReactDOM from 'react-dom';
import TelaInicial from './TelaInicial.js';
import Login from './Login.js'
import TelaCadastro from './Cadastro.js'
import TelaProdutos from './TelaProdutos.js'
import TelaCarrinho from './Carrinho.js'
import TelaPedido from './Pedido.js'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// indica qual componente de tela deve ser renderizado, de acordo com o path
// inicialmente indica o componente App

/*
export function adicionarCarrinho (qtd) {
	return qtd + 1;

}
*/

class App extends React.Component {

	constructor(props) {
		super(props);

		this.state ={
			users: [
				{"email" : "lenelena@gmail.com", "senha" : "alo123", "cpf" :"0", "nome" : "Lena Elena", 
				"carrinho" : 
					[{"item" : "3", "qtd" : "2"}] 
				},
				{"email" : "gi@email.com", "senha" : "cheguei", "cpf" : "1230", "nome" : "Gi",
				"carrinho" : 
					[] 
				},
				{"email" : "gabriel@email.com", "senha" : "abracadabra", "cpf": "234", "nome" : "Gabriel",
				"carrinho" : 
					[]
				},
				{"email" : "araceli@email.com", "senha" : "senhadificil", "cpf" : "3432", "nome" : "Araceli",
				"carrinho" : 
					[]
				}
			], 
			page: "here"
		};
		this.adicionarCarrinho = this.adicionarCarrinho.bind(this);
		this.diminuirCarrinho = this.diminuirCarrinho.bind(this);
	}
/*
	addCadastro(props){

		const updatedUsers = this.state.users

		updatedUsers.push({"email" : props.email, "senha" : props.senha, "cpf" : props.cpf, "nome" : props.nome, "carrinho": []})

		this.setState({
			page: "vai_produtos",
			...this.state.users = updatedUsers

		});
	}
*/

	addItem(props, e) {

		e.preventDefault();

		var qtd = props.qtd
		const user = props.user
		const index = props.index
		const itens = this.state.users[user].carrinho.slice();

		itens.push({"item" : props.id, "qtd" : props.qtd});

		this.setState({
			...this.state.users[this.state.users[user] = itens]		

		});

	}

	additem2 (e) { // adicionar parametros id do produto e id do usuario
		e.preventDefault();

		var itens = this.state.user.carrinho.slice();
		const userid = this.props.userid
		const prodid = this.props.produtos.id
		var qtd = 1

		for (var i=0; i < this.state.users[userid].carrinho.length; i++) {
			if ( this.state.users[userid].carrinho[i].item === prodid) {
				qtd = parseInt(this.state.users[userid].carrinho[i].qtd,10) + 1
			}
		}

		itens.push({"item" : prodid, "qtd" : qtd});

		this.setState({
			...this.state.users[this.state.users[userid] = itens]
			

		});

	}

	adicionarCarrinho(e){// necessario passar como parametro o id do item, o id do usuário
		
		e.preventDefault();
		var value = parseInt(this.state.users[0].carrinho[0].qtd,10) + 1

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
					component={() => <TelaInicial 
					users={this.state.users}
					/> } 
				/>

				<Route 
					path="/login" 
					component={() => <Login
						users={this.state.users}
						id={this.state.users.id}
					/> }
				/>

				<Route 
					path="/cadastro" 
					component={() => <TelaCadastro
						addCadastro={this.state.addCadastro}
					/> }
				/>

				<Route 
					path="/produtos" 
					component={() => <TelaProdutos
						user={this.state.users[0]} // ARRUMAR ÍNDICE DO USUÁRIO
						adicionarCarrinho={this.addItem}
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
	<App />,
	document.getElementById('root')
);
