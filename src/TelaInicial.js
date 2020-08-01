import React from 'react';
import { Redirect } from 'react-router'


class TelaInicial extends React.Component { // Tela inicial

	constructor(props) { // inicializa os dados do componente
		super(props) // necessário em todo construtor (até onde entendi)
		this.state = {
			pagina: "tela_inicial" // página que deve ser renderizada

		};
	}
	
	redireciona_tela_login = () => { // indica a tela de login como página que deve ser renderizada
		this.setState({
			pagina: "tela_login",
		});
	}
	
	redireciona_tela_cadastro = () => { // indica a tela de cadastro como página que deve ser renderizada
		this.setState({
			pagina: "tela_cadastro",
		});
	}

	render (){ // indica o que deve ser renderizado na tela

		if(this.state.pagina === "tela_login" ) { // caso a página que deva ser renderizada seja a de login, redireciona para a página de login
			return <Redirect to ="/login" />
		}
		else if(this.state.pagina === "tela_cadastro"){ // caso a página que deva ser renderizada seja a de cadastro, redireciona para a página de cadastro
			return <Redirect to ="/cadastro"/>
		}
		else { // contém os componentes da tela inicial que devem ser renderizados
			return (
				<div className="TelaInicial">
					
					<header className="TelaInicial-header">
						<h1>Vendinha Virtual</h1>

						<p> Rosas são vermelhas <br/> 
							Violetas são azuis <br/> 
							Aqui vende cinquenta coisas <br/> 
							Talvez até cuzcuz <br/> 
						</p>
					</header>

					<button name="botao_login" type="button" className="btn btn-info" onClick={this.redireciona_tela_login} >Login</button> 
					
					<button name="botao_cadastro" type="button" className="btn btn-info" onClick={this.redireciona_tela_cadastro} >Cadastrar-se</button> 
				
				</div>
			);
		}	
	}	
}

export default TelaInicial;