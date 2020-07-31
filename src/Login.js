import React from 'react';
import { Redirect } from 'react-router'

class Login extends React.Component { //Tela de login

	constructor(props) { //construtor, inicializa a função
		super(props)
		this.state = {
			page: "here", // página que deve ser renderizada
			emaillocal: "",
			senhalocal: ""
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleClick = (props) => {
		var aux = 0;

		for (var i = 0 ; i < this.props.users.length; i++) {
			
			if (this.props.users[i].email == this.state.emaillocal && this.props.users[i].senha == this.state.senhalocal){
				this.setState({
					page: "vai_produtos" // indica a tela de produtos como página que deve ser renderizada				
				});
				aux = 1
			}
		}

		if (aux == 0) { // mensagem de erro caso o usuário não esteja no sistema
			alert("Usuário não reconhecido - email ou senha inválidos");
		}
		
	}

	handleChange(event) { // ativa mudança no estado do input (mostra e guarda cada novo caracter digitado no input)

		this.setState({
			[event.target.name]: event.target.value,
		});

	}

		render () { 
			if(this.state.page === "vai_produtos" ) { // caso a página que deva ser renderizada seja a de login, redireciona para a página de login
				return <Redirect to ="/produtos" />
			}
			else {
				return (
					<div>
						<h1>Faça seu login</h1>

						<div class="form-group" style={{width: "20rem"}}> 
							
							<label name="emaillocal" id="ExampEmail" adb="EmailHelp">Email</label>
							<input name="emaillocal" type="email" class="form-control" id="ExampleEmail" valueE={this.state.emaillocal} onChange={this.handleChange}/>
							
							<label name="senhalocal" id="ExampPassword" adb="PasswordHelp">Senha</label>
						 	<input name="senhalocal" type="password" class="form-control" id="ExamplePassword" valueP={this.state.senhalocal} onChange={this.handleChange}/>
							
							<br/>
							
							<button type="button" class="btn btn-info" onClick={this.handleClick.bind(this,this.props.users)}>Pronto!</button>
						
						</div>
					</div>
				);
			}
		}
}

export default Login;