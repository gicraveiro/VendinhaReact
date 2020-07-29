import React from 'react';
import { Redirect } from 'react-router'


class TelaInicial extends React.Component { // Tela inicial

	constructor(props) { //construtor, inicializa a função
		super(props)
		this.state = {
			page: "here" // página que deve ser renderizada

		};
	}
	
	chamaLogin = () => { // indica a tela de login como página que deve ser renderizada
		this.setState({
			page: "vai_login",
		});
	}
	
	chamaCadastro = () => { // indica a tela de cadastro como página que deve ser renderizada
		this.setState({
			page: "vai_cadastro",
		});
	}

	render (){ // indica o que deve ser renderizado na tela

		if(this.state.page === "vai_login" ) { // caso a página que deva ser renderizada seja a de login, redireciona para a página de login
			return <Redirect to ="/login" />
		}
		else if(this.state.page === "vai_cadastro"){ // caso a página que deva ser renderizada seja a de cadastro, redireciona para a página de cadastro
			return <Redirect to ="/cadastro"/>
		}
		else { // contém os componentes da tela inicial que devem ser renderizados
			return (
				<div classname="TelaInicial">
					
					<header classname="TelaInicial-header">
						<h1>Vendinha Virtual</h1>

						<p> Rosas são vermelhas <br/> 
							Violetas são azuis <br/> 
							Aqui vende cinquenta coisas <br/> 
							Talvez até cuzcuz <br/> 
						</p>
					</header>

					<button type="button" class="btn btn-info" onClick={this.chamaLogin} >Login</button> 
					
					<button type="button" class="btn btn-info" onClick={this.chamaCadastro} >Cadastrar-se</button> 
				
				</div>
			);
		}
		
	}
	
}

class App extends React.Component { // função principal, é chamada pelo index inicialmente e chama a tela inicial
	render () {
		return (
			<div>
				<TelaInicial />
			</div>
		);
	}
}

export default App;
