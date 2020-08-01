import React from 'react';
import { Redirect } from 'react-router';
import CPF, { validate } from 'cpf-check'

class TelaCadastro extends React.Component { // Tela de Cadastro
	constructor(props) { //construtor
		super(props);
		this.state = { // inicializa as variáveis de cadastro que se atualizarão com o input do usuário
			nome:'',
			email:'',
			senha:'',
			data_nascimento:'',
			cpf:'',
			pagina: 'tela_cadastro',

		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	chamaProdutos() { // indica a tela de produtos como página que deve ser renderizada
		this.setState({
			pagina: "tela_produtos"
		});

	}

	handleChange(event) { // ativa mudança no estado do input (mostra e guarda no state local cada novo caracter digitado no input)

		this.setState({
			[event.target.name]: event.target.value
		});

	}

	handleSubmit(event){

		var validar_email = require("email-validator")

		if( !CPF.validate(this.state.cpf.toString()) || this.state.nome === '' || this.state.senha === '' || //validação de cpf e email importada, todos os campos devem estar preenchidos
		 this.state.data_nascimento === '' || !validar_email.validate(this.state.email)){
		
			alert("Dados inválidos ou incompletos")
			console.log("cpf", this.state.cpf.toString(), !validate(this.state.cpf.toString()) )
		
		} else {

			this.setState({
					pagina: "tela_produtos" // indica a tela de produtos como página que deve ser renderizada				
				});
		}
	}

	render () { // representa tudo que será mostrado na tela de cadastro

		if(this.state.pagina === "tela_produtos" ) { // redireciona para a página de produtos
			return <Redirect to ="/produtos" />
		}

		else {
			return (

				<div id="tela_de_cadastro">

					<h1>Cadastre-se em nossa lojinha virtual</h1> 

					<form onSubmit={this.handleSubmit}> 

						<label>
							Nome:
							<input 
							name="nome"
							type="text" 
							value_name={this.state.nome} 
							onChange={this.handleChange} />
						</label>

						<br />

						<label>
							Email:
							<input 
							name="email"
							type="email" 
							value_email={this.state.email} 
							onChange={this.handleChange} />
						</label>

						<br />
						
						<label>
							Senha:
							<input 
							name="senha"
							type="password" 
							value_senha={this.state.senha} 
							onChange={this.handleChange} />
						</label>

						<br />

						<label>
							Data de nascimento:
							<input 
							name="data_nascimento"
							type="date" 
							value_data_nascimento={this.state.data_nascimento} 
							onChange={this.handleChange} />
						</label>

						<br />

						<label>
							cpf:
							<input 
							name="cpf"
							type="text" 
							value_cpf={this.state.cpf} 
							onChange={this.handleChange} />
						</label>

						<br />

						<button id="envia_cadastro" type="button" className="btn btn-info" onClick={this.handleSubmit}> Pronto! </button>

					</form>

				</div>
			);
		}
	}
}

export default TelaCadastro;