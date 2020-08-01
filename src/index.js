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
				{"email" : "lenelena@gmail.com", "senha" : "alo123", "cpf" :"0", "nome" : "Lena Elena"},
				{"email" : "gi@email.com", "senha" : "cheguei", "cpf" : "1230", "nome" : "Gi"},
				{"email" : "gabriel@email.com", "senha" : "abracadabra", "cpf": "234", "nome" : "Gabriel"},
				{"email" : "araceli@email.com", "senha" : "senhadificil", "cpf" : "3432", "nome" : "Araceli"}
			], 
			carrinho: [],
			pagina: "here"
		};
		this.adicionarCarrinho = this.adicionarCarrinho.bind(this);
		this.diminuirCarrinho = this.diminuirCarrinho.bind(this);
		this.esvaziarCarrinho = this.esvaziarCarrinho.bind(this);
		this.calcular_preco_total = this.calcular_preco_total.bind(this);

	}

	//Função para adicionar uma unidade de um item no carrinho, necessário passar id do produto e id do usuário como parâmetros FALTA FAZER
	adicionarCarrinho(id_produto, preco, name) {

		var indice_do_produto_no_carrinho = this.state.carrinho.map(function(e) { // indice do produto dentro do carrinho
					 		return e.item.toString();
					 	}).indexOf(id_produto) // encontra o índice do carrinho que contém o produto que deve ser adicionado

		this.setState(state => {

			if (indice_do_produto_no_carrinho === -1) { // item não existe no carrinho

				indice_do_produto_no_carrinho = this.state.carrinho.length // indice do produto no carrinho é o próximo indice disponível
				var qtd = 0 // qtd do item é 0
				var carrinho = state.carrinho.concat({"item" : parseInt(id_produto), "qtd" : 1, "preco" : parseFloat(preco), "name" : name}); //cria uma cópia do carrinho com o novo item adicionado
			}
			else {	

				qtd = this.state.carrinho[indice_do_produto_no_carrinho].qtd // qtd daquele item

				carrinho = state.carrinho.map((item,j) => { // cria uma cópia do vetor de carrinho, mas com a quantidade do item atualizada
					if (j === indice_do_produto_no_carrinho){
					
						return {"item" : parseInt(id_produto), "qtd" : qtd+1, "preco" : parseFloat(preco), "name" : name}; // INCLUIR PREÇO E NAME
		
					} else {

						return item;
					}
				});
			}

			return { // coloca o vetor de users atualizado no state
				carrinho,
			}
			
		});

	}

// Função que diminui a quantidade de um item no carrinho, necessário passar parâmetros de id do produto, índice do usuário no vetor de usuários do state FALTA FAZER
	diminuirCarrinho(id_produto, preco, name) {

		var indice_do_produto_no_carrinho = this.state.carrinho.map(function(e) { 
					 		return e.item.toString();
					 	}).indexOf(id_produto) // encontra o índice do carrinho que contém o produto que deve ser diminuído

		if (indice_do_produto_no_carrinho !== -1) { // item existe no carrinho

			var qtd = this.state.carrinho[indice_do_produto_no_carrinho].qtd // qtd daquele item
			
			if (qtd > 0){ // só se a qtd do item for maior que 0 será possível diminuir sua quantidade no carrinho

				id_produto = this.state.carrinho[indice_do_produto_no_carrinho].item // calcula o id do item a partir do state global pois já está no carrinho

				this.setState(state => {

					if (qtd === 1) { // remove o item do carrinho
						var carrinho = state.carrinho.filter((produto,j) => indice_do_produto_no_carrinho !== j);
					}
					else {
						carrinho = state.carrinho.map((produto,j) => { // cria uma cópia do vetor de carrinho, mas com a quantidade do item atualizada
							if (j === indice_do_produto_no_carrinho){
							
								return {"item" : parseInt(id_produto), "qtd" : qtd-1, "preco" : parseFloat(preco), "name" : name}; 
				
							} else {

								return produto;
							}
						});
					}

					return { // atribui o carrinho atualizado ao state
						carrinho,
					}		
				});	
			}			
		} 
	}

	// Função que esvazia o carrinho, necessário passar parâmetro com o índice do usuário no vetor de usuários do state ! FALTA FAZER
	esvaziarCarrinho(e) {

		e.preventDefault();

		const carrinho = []

		this.setState( state => { //atribui um vetor vazio ao carrinho para esvaziá-lo

			return{
				carrinho,
			}
			
		})

		alert("A compra foi finalizada!")
	}

	//Função que calcula o preço total do pedido
	calcular_preco_total(){ 

		var preco_total_da_compra = 0;

		if (this.state.carrinho.length !== 0){
			preco_total_da_compra = this.state.carrinho.map( function(produto) { // percorre o vetor carrinho retornando o preço da soma de itens de cada tipo e acrescenta à soma total
				return produto.preco*produto.qtd 

				}).reduce(function(preco_total_da_compra, preco_total_do_produto) { 
			 		return preco_total_da_compra + preco_total_do_produto 
			 	});

			return ( 
				<label> Preço Total: $ {preco_total_da_compra} </label> 
			);	
		}
		else{
			return (
				<label> Carrinho Vazio... </label>
			)
		}
		
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
						user={this.state.users[0]} 
						carrinho={this.state.carrinho}
						adicionarCarrinho={this.adicionarCarrinho}
						diminuirCarrinho={this.diminuirCarrinho}
					 />}
				/>

				<Route 
					path="/carrinho" 
					component={() => <TelaCarrinho 
						carrinho={this.state.carrinho}
						adicionarCarrinho={this.adicionarCarrinho}
						diminuirCarrinho={this.diminuirCarrinho}
					/>}
				/>

				<Route 
					path="/pedido" 
					component={() => <TelaPedido
						calcular_preco_total={this.calcular_preco_total} // preço total será calculado na tela de pedidos
						esvaziarCarrinho={this.esvaziarCarrinho} // carrinho será esvaziado na tela de pedidos
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
