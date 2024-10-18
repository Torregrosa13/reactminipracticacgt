import React, { Component } from 'react'
import Global from './Global'
import axios from 'axios';

export default class MiniPractica extends Component {

  selectequipo = React.createRef();
  cajaNombre = React.createRef();

  urlEquipos = Global.urlApiEquipos;
  urlJugadores = Global.urlApiJugadores;

  state = {
    equipos: [],
    jugadores: []
  }
  buscarJugadores = (e) => {
    e.preventDefault();
    var jugadorSeleccionado = this.selectequipo.current.value;
    var request = "/JugadoresEquipos/" + jugadorSeleccionado;
    axios.get(this.urlJugadores + request).then(response => {
      this.setState({
        jugadores: response.data
      })
    })

  }

  mostrarEquipos = () => {
    axios.get(this.urlEquipos).then(response => {
      this.setState({
        equipos: response.data
      })
    })
  }

  buscarPorNombre = (e) => {
    e.preventDefault();
    var nombreJugador = this.cajaNombre.current.value;
    var request = "/FindJugadores/" + nombreJugador;
    axios.get(this.urlJugadores + request).then(response => {
      console.log(response.data);
      this.setState({
        jugadores: response.data
      })
    })

  }

  componentDidMount() {
    this.mostrarEquipos();
  }

  render() {

    

    return (
      <div>
        <h1>Mini Practica Jugadores</h1>
        <form>
          <label>Nombre jugador</label>
          <input type='text' ref={this.cajaNombre}></input>
          <button onClick={this.buscarPorNombre}>Buscar por NOMBRE</button>
        </form>
        <br />
        <form>
          <label>Seleccione un equipo</label>
          <select ref={this.selectequipo}>
            {
              this.state.equipos.map((equipo, index) => {
                return (<option key={index} value={equipo.idEquipo}>{equipo.nombre}</option>)
              })
            }

          </select>
          <button onClick={this.buscarJugadores}>Buscar Jugadores</button>
        </form>
      {
        this.state.jugadores.length != 0 &&(
        <table border={1}>
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Posición</th>
              <th>País</th>
              <th>Fecha de Nacimiento</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.jugadores.map((jugador, index) => {
                return (<tr key={index}>
                  <td><img src={jugador.imagen} style={{ width: "150px", height: "150px" }}></img></td>
                  <td>{jugador.nombre}</td>
                  <td>{jugador.posicion}</td>
                  <td>{jugador.pais}</td>
                  <td>{jugador.fechaNacimiento}</td>
                </tr>)
              })
            }
          </tbody>
        </table>
        )
  }
      </div>
    )
  }
}
