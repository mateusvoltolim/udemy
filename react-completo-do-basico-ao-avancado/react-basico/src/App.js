import React, { Component } from 'react'
import './App.css';
import Comentario from './components/Comentario'

class App extends Component {

  state = {
    comentarios: [
      {
        nome: 'João',
        email: 'joao@mail.com',
        data: new Date(2023, 0, 29, 10, 0, 0),
        mensagem: 'Olá, tudo bem?'
      },
      {
        nome: 'Pedro',
        email: 'pedro@mail.com',
        data: new Date(2023, 0, 31, 9, 0, 0),
        mensagem: 'Olá, tudo bem!'
      }
    ],
    novoComentario: {
      nome: '',
      email: '',
      mensagem: ''
    }
  }

  adicionarComentario = evento => {
    evento.preventDefault()

    this.setState({
      comentarios: [...this.state.comentarios, { ...this.state.novoComentario, data: new Date() }],
      novoComentario: { nome: '', email: '', mensagem: '' }
    })
  }

  onChangeProp = event => {
    const { name, value } = event.target
    this.setState({
      novoComentario: {
        ...this.state.novoComentario, [name]: value
      }
    })
  }

  removerComentario = comentario => {
    this.setState({
      comentarios: this.state.comentarios.filter(c => c != comentario)
    })
  }

  render() {
    return (
      <div className="App">
        <h1>Meu projeto</h1>

        {
          this.state.comentarios.map((comentario, idx) => (
            <Comentario
              key={idx}
              nome={comentario.nome}
              email={comentario.email}
              data={comentario.data}
              onRemove={this.removerComentario.bind(this, comentario)}
            >
              {comentario.mensagem}
            </Comentario>
          ))
        }

        <form method="post" onSubmit={this.adicionarComentario} className="NovoComentario">
          <h2>Adicionar comentário</h2>
          <div>
            <input
              type="text"
              name="nome"
              value={this.state.novoComentario.nome}
              onChange={this.onChangeProp}
              required
              placeholder="Digite seu nome"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={this.state.novoComentario.email}
              onChange={this.onChangeProp}
              required
              placeholder="Digite seu email"
            />
          </div>
          <div>
            <textarea
              name="mensagem"
              rows="4"
              onChange={this.onChangeProp}
              required
              value={this.state.novoComentario.mensagem}
            />
          </div>
          <button
            type="submit"
          >
            Adicionar Comentário
          </button>
        </form>
      </div>
    )
  }
}

export default App;
