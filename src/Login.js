import React from 'react';
import { Redirect } from 'react-router'

// Tela de login
// inclui campos de email e senha com validação referente aos dados incluídos no sistema, e botão de enviar

class Login extends React.Component { //Tela de login

	constructor(props) { // inicializa os dados do componente
		super(props) //necessário em todo construtor (até onde entendi)

		this.state = { 
			pagina: "tela_login", // página que deve ser renderizada
			email_do_input: "",  // inicializa os campos que se atualizarão com o input do usuário
			senha_do_input: ""
		};
		this.handleChange = this.handleChange.bind(this); // necessário para que as funções sejam reconhecidas nas chamadas
	}

	// valida inputs e redireciona para a página de produtos, ativado com botão de envio
	handleClick(props) {
		var usuario_encontrado = 0; // usuario_encontrado para indicar se o usuário foi encontrado

		for (var i = 0 ; i < this.props.users.length; i++) { // percorre o vetor de usuários procurando um usuário cujo email e senha coincidam com os inputs
			
			if (this.props.users[i].email === this.state.email_do_input && this.props.users[i].senha === this.state.senha_do_input){
				this.setState({
					pagina: "tela_produtos" // indica a tela de produtos como página que deve ser renderizada				
				});
				usuario_encontrado = 1
			}
		}

		if (usuario_encontrado === 0) { // mensagem de erro caso o usuário não esteja no sistema
			alert("Usuário não reconhecido - email ou senha inválidos");
		}
		
	}

	handleChange(event) { // ativa mudança no estado do input (mostra e guarda cada novo caracter digitado no input)

		this.setState({
			[event.target.name]: event.target.value,
		});

	}

		render () { 
			// redireciona para tela de produtos
			if(this.state.pagina === "tela_produtos" ) { 
				return <Redirect to ="/produtos" />
			}
			else {
				return (
					<div id="tela_login">

						<h1>Faça seu login</h1>

						<div id="formulario_entrada" className="form-group" style={{width: "20rem"}}> 
							
							<label name="label_email">Email</label>
							<input 
								name="email_do_input" 
								type="email" 
								className="form-control" 
								value_email={this.state.email_do_input} 
								onChange={this.handleChange}
							/>
							
							<label name="label_email">Senha</label>
						 	<input 
						 		name="senha_do_input" 
						 		type="password" 
						 		className="form-control" 
						 		value_senha={this.state.senha_do_input} 
						 		onChange={this.handleChange}
						 	/>
							
							<br/>
							
							<button id="botao_login" type="button" className="btn btn-info" onClick={this.handleClick.bind(this,this.props.users)}>Pronto!</button>
						
						</div>
					</div>
				);
			}
		}
}

export default Login;