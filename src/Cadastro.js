import React from 'react';
import { Redirect } from 'react-router';
import CPF, { validate } from 'cpf-check'

//Tela de cadastro
// inclui campos de nome, email, senha, data de nascimento e cpf com validação e botão de enviar

// Tela de Cadastro
class TelaCadastro extends React.Component { 

	constructor(props) {  // inicializa os dados do componente
		super(props); //necessário em todo construtor (até onde entendi)

		this.state = { 
			pagina: 'tela_cadastro', //página que deve ser renderizada 
			nome:'', // inicializa os campos de cadastro que se atualizarão com o input do usuário
			email:'',
			senha:'',
			data_nascimento:'',
			cpf:'',
		};
		this.handleChange = this.handleChange.bind(this); // necessário para que as funções sejam reconhecidas nas chamadas
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

	handleSubmit(event){ // valida dados de input e redireciona para a página de produtos, ativado com o botão de enviar

		var validar_email = require("email-validator")

		// se algum dado é inválido ou nulo, validação de cpf e email importada
		if( !CPF.validate(this.state.cpf.toString()) || this.state.nome === '' || this.state.senha === '' || 
		 this.state.data_nascimento === '' || !validar_email.validate(this.state.email)){
		
			alert("Dados inválidos ou incompletos")
		
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
							value_name={this.state.nome} // recebe o input do usuário
							onChange={this.handleChange} />
						</label>

						<br />

						<label>
							Email:
							<input 
							name="email"
							type="email" 
							value_email={this.state.email} // recebe o input do usuário
							onChange={this.handleChange} />
						</label>

						<br />
						
						<label>
							Senha:
							<input 
							name="senha"
							type="password" 
							value_senha={this.state.senha} // recebe o input do usuário
							onChange={this.handleChange} />
						</label>

						<br />

						<label>
							Data de nascimento:
							<input 
							name="data_nascimento"
							type="date" 
							value_data_nascimento={this.state.data_nascimento} // recebe o input do usuário
							onChange={this.handleChange} />
						</label>

						<br />

						<label>
							cpf:
							<input 
							name="cpf"
							type="text" 
							value_cpf={this.state.cpf} // recebe o input do usuário
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