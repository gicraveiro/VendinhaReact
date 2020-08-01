import React from 'react';
import ReactDOM from 'react-dom';
import TelaInicial from './TelaInicial.js';
import Login from './Login.js'
import TelaCadastro from './Cadastro.js'
import TelaProdutos from './TelaProdutos.js'
import TelaCarrinho from './Carrinho.js'
import TelaPedido from './Pedido.js'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// Arquivo de index
// contém o global state com credenciais dos usuários e um carrinho de compras, funções de aumentar, diminuir a qtd de itens no carrinho,
//  esvaziar carrinho e calcular preço total
// indica qual componente de tela deve ser renderizado, de acordo com o path
// inicialmente indica o componente App


class App extends React.Component {

	constructor(props) { // inicializa os dados do componente
		super(props); // necessário em todo construtor (até onde entendi)

		this.state ={
			users: [
				{"email" : "lenelena@gmail.com", "senha" : "alo123", "cpf" :"0", "nome" : "Lena Elena"},
				{"email" : "gi@email.com", "senha" : "cheguei", "cpf" : "1230", "nome" : "Gi"},
				{"email" : "gabriel@email.com", "senha" : "abracadabra", "cpf": "234", "nome" : "Gabriel"},
				{"email" : "araceli@email.com", "senha" : "senhadificil", "cpf" : "3432", "nome" : "Araceli"}
			], 
			carrinho: [],
		};
		this.adicionarCarrinho = this.adicionarCarrinho.bind(this);
		this.diminuirCarrinho = this.diminuirCarrinho.bind(this);
		this.esvaziarCarrinho = this.esvaziarCarrinho.bind(this);
		this.calcular_preco_total = this.calcular_preco_total.bind(this);

	}

	//Função para adicionar uma unidade de um produto no carrinho
	adicionarCarrinho(id_produto, preco_produto, name_produto) {

		var indice_produto_carrinho = this.state.carrinho.map(function(produto) { 
					 							return produto.item_id.toString();
					 						}).indexOf(id_produto) // encontra o índice do carrinho que contém o produto que deve ser adicionado

		this.setState(state => {

			if (indice_produto_carrinho === -1) { // se o produto não existe no carrinho

				indice_produto_carrinho = this.state.carrinho.length // índice do produto no carrinho é o próximo indice disponível
				var qtd_produto_carrinho = 0 // qtd do produto é 0
				var carrinho = state.carrinho.concat({"item_id" : parseInt(id_produto), "qtd" : 1, "preco" : parseFloat(preco_produto), "name" : name_produto}); //cria uma cópia do carrinho com o novo produto adicionado
			}
			else {	

				qtd_produto_carrinho = this.state.carrinho[indice_produto_carrinho].qtd // qtd do produto no carrinho atualmente

				carrinho = state.carrinho.map((produto,j) => { // cria uma cópia do vetor de carrinho, mas com a quantidade do produto atualizada
					if (j === indice_produto_carrinho){
					
						return {"item_id" : parseInt(id_produto), "qtd" : qtd_produto_carrinho+1, "preco" : parseFloat(preco_produto), "name" : name_produto}; 
		
					} else {

						return produto; // não modifica os outros produtos do carrinho
					}
				});
			}

			return { // atualiza o state com o carrinho
				carrinho,
			}		
		});
	}

// Função que diminui a quantidade de um produto no carrinho
	diminuirCarrinho(id_produto, preco_produto, name_produto) {

		var indice_produto_carrinho = this.state.carrinho.map(function(produto) { 
					 							return produto.item_id.toString();
					 						}).indexOf(id_produto) // encontra o índice do carrinho que contém o produto que deve ser diminuído

		if (indice_produto_carrinho !== -1) { // produto existe no carrinho

			var qtd_produto_carrinho = this.state.carrinho[indice_produto_carrinho].qtd // qtd daquele produto no carrinho
			
			if (qtd_produto_carrinho > 0){ // só se a qtd do produto for maior que 0 será possível diminuir sua quantidade no carrinho

				id_produto = this.state.carrinho[indice_produto_carrinho].item_id // calcula o id do produto a partir do state global pois já está no carrinho

				this.setState(state => {

					if (qtd_produto_carrinho === 1) { // remove o produto do carrinho
						var carrinho = state.carrinho.filter((produto,j) => indice_produto_carrinho !== j);
					}
					else {
						carrinho = state.carrinho.map((produto,j) => { // cria uma cópia do vetor de carrinho, mas com a quantidade do item_id atualizada
							if (j === indice_produto_carrinho){
							
								return {"item_id" : parseInt(id_produto), "qtd" : qtd_produto_carrinho-1, "preco" : parseFloat(preco_produto), "name" : name_produto}; 
				
							} else {

								return produto; // não modifica os outros produtos do carrinho
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

	// Função que esvazia o carrinho
	esvaziarCarrinho(event) {

		event.preventDefault();

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

			// Seleciona a página a ser renderizada de acordo com a rota fornecida (permite troca de páginas)
			<BrowserRouter> 
			<Switch> 

				<Route 
					path="/" 
					exact={true} 
					component={() => <TelaInicial /> } 
				/>

				<Route 
					path="/login" 
					component={() => <Login // TELA DE LOGIN
										users={this.state.users} 
									/> }
				/>

				<Route 
					path="/cadastro" 
					component={() => <TelaCadastro /> }
				/>

				<Route 
					path="/produtos" 
					component={() => <TelaProdutos
										user={this.state.users[0]} // só para passar o nome do usuário, mudar o índice para diferentes usuários
										carrinho={this.state.carrinho}
										adicionarCarrinho={this.adicionarCarrinho}
										diminuirCarrinho={this.diminuirCarrinho}
					 				/>}
				/>

				<Route 
					path="/carrinho" 
					component={() => <TelaCarrinho 
										carrinho={this.state.carrinho}
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

ReactDOM.render ( // INICIA APLICAÇÃO
	<App />,
	document.getElementById('root')
);
