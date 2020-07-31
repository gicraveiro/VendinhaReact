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

class App extends React.Component {

	constructor(props) {
		super(props);

		this.state ={
			users: [
				{"email" : "lenelena@gmail.com", "senha" : "alo123", "cpf" :"0", "nome" : "Lena Elena", 
				"carrinho" : 
					[{"item" : 3, "qtd" : 2, "preco" : 993.00, "name" : "Small Cotton Shoes"},{"item" : 4, "qtd" : 8, "preco" : 259.00, "name" : "Ergonomic Frozen Towels"}, {"item" : 11, "qtd" : 5, "preco" : 345.00, "name" : "Fantastic Metal Cheese"}] 
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
		this.esvaziarCarrinho = this.esvaziarCarrinho.bind(this);
		this.calcular = this.calcular.bind(this);

	}

	//Função para adicionar uma unidade de um item no carrinho, necessário passar id do produto e id do usuário como parâmetros FALTA FAZER
	adicionarCarrinho(e) {

		console.log("Entrando em adicionar carrinho")

		e.preventDefault();

		var user = 0 // e.target.user ? // id do usuário , necessário buscar de algum lugar
		var idP = e.target.idP//this.idP //7 // id do produto, passar como parametro

		console.log("idP:", idP)

		var index = this.state.users[user].carrinho.map(function(e) { // indice do produto dentro do carrinho
					 		return e.item;
					 	}).indexOf(idP) // ENCONTRA O ÍNDICE DO ITEM DE ID idP // funciona com numero  hardcoded

		this.setState(state => {

			if (index === -1) { // item não existe no carrinho

				index = this.state.users[user].carrinho.length // indice do produto no carrinho é o próximo indice disponível
				var qtd = 0 // qtd do item é 0
				var carrinho = state.users[user].carrinho.concat({"item" : idP, "qtd" : 1}); //cria uma cópia do carrinho com o novo item adicionado
				console.log("carrinho se o item era inexistente", carrinho)
			}
			else {	

				//var qtd = this.state.users[user].carrinho[index].qtd // qtd daquele item
				idP = this.state.users[user].carrinho[index].item // calcula o id do item a partir do state global pois já está no carrinho
				carrinho = state.users[user].carrinho.map((item,j) => { // cria uma cópia do vetor de carrinho, mas com a quantidade do item atualizada
					if (j === index){
					
						return {"item" : idP, "qtd" : qtd+1}; // INCLUIR PREÇO E NAME
		
					} else {

						return {"item" : idP, "qtd" : qtd}; //item;
					}
				});
				console.log("carrinho se o item já estava no carrinho", carrinho)
			}

			const users = state.users.map((user, j) => { // atualiza o vetor de users
				if (user === j){ 
					user.carrinho = carrinho
				}
				return user
			})
			console.log("novo state global do vetor de usuários:", users) // indica o que será colocado no state, mas não garante que funcionou...
			return { // coloca o vetor de users atualizado no state
				users,
			}
			
		});

	}

// Função que diminui a quantidade de um item no carrinho, necessário passar parâmetros de id do produto, índice do usuário no vetor de usuários do state FALTA FAZER
	diminuirCarrinho(e) {

		console.log("Entrando em diminuir carrinho")

		e.preventDefault();

		var user = 0 // e.target.user ? // id do usuário , necessário buscar de algum lugar
		var idP = e.target.idP//this.idP //7 // id do produto, passar como parametro

		var index = this.state.users[user].carrinho.map(function(e) { // indice do produto dentro do carrinho
					 		return e.item;
					 	}).indexOf(idP) // ENCONTRA O ÍNDICE DO ITEM DE ID idP // funciona com numero  hardcoded

		if (index !== -1) { // item existe no carrinho
			var qtd = this.state.users[user].carrinho[index].qtd // qtd daquele item
			
			if (qtd > 0){ // só se a qtd do item for maior que 0, é possível diminuir sua quantidade no carrinho

				idP = this.state.users[user].carrinho[index].item // calcula o id do item a partir do state global pois já está no carrinho

				this.setState(state => {

					if (qtd === 1) { // remove o item do carrinho
						var carrinho = state.users[user].carrinho.filter((item,j) => index !== j);
					}
					else {
						carrinho = state.users[user].carrinho.map((item,j) => { // cria uma cópia do vetor de carrinho, mas com a quantidade do item atualizada
							if (j === index){
							
								return {"item" : idP, "qtd" : qtd-1}; 
				
							} else {

								return {"item" : idP, "qtd" : qtd};
							}
						});
					}
					const users = state.users.map((user, j) => { // atualiza o vetor de users
						if (user === j){ 
							user.carrinho = carrinho
						}
						return user
					})

					return { // coloca o vetor de users atualizado no state
						users,
					}		
				});	
			}			
		} 
	}

	// Função que esvazia o carrinho, necessário passar parâmetro com o índice do usuário no vetor de usuários do state ! FALTA FAZER
	esvaziarCarrinho(e) {

		e.preventDefault();

		const carrinho = []
		const userId = 0

		console.log(this.state.users[userId].carrinho)

		this.setState( state => {

			const users = state.users.map((user, j) => { // atualiza o vetor de users
							if (userId === j){ 
								user.carrinho = carrinho
							}
							return user
						})
			console.log(users)
			return{
				users,
			}
			
		})
	}

	//Função que calcula o preço total
	calcular(){ // ADICIONAR O PARÂMETRO USER

	//	e.preventDefault();

		var soma = 0;

		soma = this.state.users[0].carrinho.map( function(a) { // percorre o vetor carrinho retornando o preço da soma de itens de cada tipo e acrescenta à soma total
			return a.preco*a.qtd 

			}).reduce(function(soma, produto) { 
			 	return soma + produto 
			 });

		return ( 
			<label> Preço Total: $ {soma} </label> 
		);
	}

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
						adicionarCarrinho={this.adicionarCarrinho}
						diminuirCarrinho={this.diminuirCarrinho}
					 />}
				/>

				<Route 
					path="/carrinho" 
					component={() => <TelaCarrinho 
						users={this.state.users}
						carrinho={this.state.users[0].carrinho}
					/>}
				/>

				<Route 
					path="/pedido" 
					component={() => <TelaPedido
						//users={this.state.users}
						calcular={this.calcular}
						//index={0}
						//qtd={0}
						carrinho={this.state.users[0].carrinho}
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
