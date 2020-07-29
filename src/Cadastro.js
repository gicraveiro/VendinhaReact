import React from 'react';
import { Redirect } from 'react-router'

class TelaCadastro extends React.Component { // Tela de Cadastro
	constructor(props) { //construtor
		super(props);
		this.state = { // inicializa as variáveis de estado da função
			nome:'',
			email:'',
			senha:'',
			datanasc:'',
			cpf:'',
			page: 'here',

		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	chamaProdutos = () => { // indica a tela de produtos como página que deve ser renderizada
		this.setState({
			page: "vai_produtos"
		});
	}

	handleChange(event) { // ativa mudança no estado do input (mostra e guarda cada novo caracter digitado no input)
//		const value = target.name === 'nome' ? target.valuename : target.valuepassword;

		this.setState({
			[event.target.name]: event.target.value
			//value: event.target.value
		});
	}

	handleSubmit(event) { // ativa o envio do input para submissão
//		const target = event.target
//		const value = target.name === 'nome' ? target.valuename : target.valuepassword;
		const {nome, email, senha, datanasc, cpf} = this.state;
		localStorage.setItem('nome', nome);
		localStorage.setItem('email', email);
		localStorage.setItem('senha', senha);
		localStorage.setItem('datanasc', datanasc);
		localStorage.setItem('cpf', cpf);

	}
	/*	alert('Oooopaaa' + event.target.value);
		event.preventDefault();


		const data = new FormData(event.target); // tentativa de pegar os dados, arrumar esse handlesubmit
		fetch('/api/form-submit/url', {
			method: 'POST',
			body: data,
		});
	
	}*/

	render () { // representa tudo que será mostrado na tela de cadastro
		if(this.state.page === "vai_produtos" ) { // caso a página que deva ser renderizada seja a de login, redireciona para a página de login
			return <Redirect to ="/produtos" />
		}
		else {
			return (

				<div>
					<h1>Cadastre-se em nossa lojinha virtual</h1> 

					<form onSubmit={this.handleSubmit}> 

						<label>
							Nome:
							<input 
							name="nome"
							type="text" 
							valueN={this.state.nome} 
							id ="nome" // n adiantou, entao ta de inutil aqui
							onChange={this.handleChange} />
						</label>

						<br />

						<label>
							Email:
							<input 
							name="email"
							type="email" 
							valueE={this.state.email} 
							onChange={this.handleChange} />
						</label>

						<br />
						
						<label>
							Senha:
							<input 
							name="senha"
							type="password" 
							valuepassword={this.state.senha} 
							onChange={this.handleChange} />
						</label>

						<br />

						<label>
							Data de nascimento:
							<input 
							name="datanasc"
							type="date" 
							valueDN={this.state.datanasc} 
							onChange={this.handleChange} />
						</label>

						<br />

						<label>
							cpf:
							<input 
							name="cpf"
							type="number" // MUDAR PRA VALIDAR O TIPO DE CPF
							valueCPF={this.state.cpf} 
							onChange={this.handleChange} />
						</label>

						<br />

						<button type="button" class="btn btn-info" onClick={this.chamaProdutos}> Pronto! </button>

					</form>


				</div>

			);
		}
	}
}

export default TelaCadastro;