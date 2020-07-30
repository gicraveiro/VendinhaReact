import React from 'react';
import { Redirect } from 'react-router'



class Login extends React.Component { //Tela de login

	constructor(props) { //construtor, inicializa a função
		super(props)
		this.state = {
			page: "here", // página que deve ser renderizada
			//email: "",
			//senha: ""
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleClick = (props) => {
		//console.log({users.length})

		for (var i = 0 ; i < this.props.users.length; i++) {
			console.log({i})
			
			if (this.props.users[i].email === this.state.email && this.props.users[i].senha === this.state.senha){
				this.setState({
					page: "vai_produtos" // indica a tela de produtos como página que deve ser renderizada
				
				}, function () {
				//	console.log(this.state.page)
				});
				console.log("mudou")
			}
		}
		if (this.state.page === "here") { 
			alert("Usuário não reconhecido - email ou senha inválidos");
			//console.log({this.state.page})
		}
		
	}

	handleChange(event) { // ativa mudança no estado do input (mostra e guarda cada novo caracter digitado no input)
//		const value = target.name === 'nome' ? target.valuename : target.valuepassword;

		this.setState({
			[event.target.name]: event.target.value
			//value: event.target.value
		});
	}


	/*
	handleChange = (event) => {

		const value = event.target.type === 'text' ? event.target.usuario : event.target.senha; 

		this.setState({
			[event.target.name]: value
		})
	}

	handleSubmit = () => {
		const { usuario, senhaa } = this.state;

		localStorage.setItem('usuario', usuario);
		localStorage.setItem('senhaa', senhaa);
	} */


	
		render () { 
			if(this.state.page === "vai_produtos" ) { // caso a página que deva ser renderizada seja a de login, redireciona para a página de login
				return <Redirect to ="/produtos" />
			}
			else {
				return (
					<div>
						<h1>Faça seu login</h1>

						<div class="form-group" style={{width: "20rem"}}> 

							<label name="Email" id="ExampEmail" adb="EmailHelp">Email</label>
							<input name="email" type="email" class="form-control" id="ExampleEmail" valueE={this.state.email} onChange={this.handleChange}/>
							<label name="Password" id="ExampPassword" adb="PasswordHelp">Password</label>
						 	<input name="password" type="password" class="form-control" id="ExamplePassword" valueP={this.state.senha} onchange={this.handleChange}/>
							<br/>
							<button type="button" class="btn btn-info" onClick={this.handleClick.bind(this,this.props.users)}>Pronto!</button>
						</div>
					</div>
				);
			}
		}
}

export default Login;