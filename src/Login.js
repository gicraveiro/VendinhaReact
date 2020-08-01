import React from 'react';
import { Redirect } from 'react-router'

class Login extends React.Component { //Tela de login

	constructor(props) { //construtor, inicializa a função
		super(props)
		this.state = {
			pagina: "tela_login", // página que deve ser renderizada
			email_do_input: "",
			senha_do_input: ""
		};
		this.handleChange = this.handleChange.bind(this);
	}
// encontra o índice do carrinho que contém o produto que deve ser 
	handleClick(props) {
		var aux = 0;

		for (var i = 0 ; i < this.props.users.length; i++) {
			
			if (this.props.users[i].email === this.state.email_do_input && this.props.users[i].senha === this.state.senha_do_input){
				this.setState({
					pagina: "tela_produtos" // indica a tela de produtos como página que deve ser renderizada				
				});
				aux = 1
			}
		}

		if (aux === 0) { // mensagem de erro caso o usuário não esteja no sistema
			alert("Usuário não reconhecido - email ou senha inválidos");
		}
		
	}

	handleChange(event) { // ativa mudança no estado do input (mostra e guarda cada novo caracter digitado no input)

		this.setState({
			[event.target.name]: event.target.value,
		});

	}

		render () { 
			if(this.state.pagina === "tela_produtos" ) { // caso a página que deva ser renderizada seja a de login, redireciona para a página de login
				return <Redirect to ="/produtos" />
			}
			else {
				return (
					<div>
						<h1>Faça seu login</h1>

						<div className="form-group" style={{width: "20rem"}}> 
							
							<label name="email_do_input" id="ExampEmail" adb="EmailHelp">Email</label>
							<input name="email_do_input" type="email" className="form-control" value_email={this.state.email_do_input} onChange={this.handleChange}/>
							
							<label name="senha_do_input" id="ExampPassword" adb="PasswordHelp">Senha</label>
						 	<input name="senha_do_input" type="password" className="form-control" value_senha={this.state.senha_do_input} onChange={this.handleChange}/>
							
							<br/>
							
							<button type="button" className="btn btn-info" onClick={this.handleClick.bind(this,this.props.users)}>Pronto!</button>
						
						</div>
					</div>
				);
			}
		}
}

export default Login;