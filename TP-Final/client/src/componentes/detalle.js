import React, { Component } from 'react';
import '../styles/detalle.css';
const queryString = require('query-string');

class Detalle extends Component{
  constructor(props){
    super(props);
    this.state = {item: {}};
  }

  componentDidMount(){
    var id = this.props.match.params.id;
    fetch(`/items/${id}`)
    .then(res => res.json())
    .then(resp => {this.setState({item : resp.items}) })
    .catch(err => console.log('error', err))

  }

  render(){
    return(
      <div className= "productos">
        <p className = "titulo">{this.state.item.title}</p>
        {this.state.item.price &&
        <p className = "precio">{this.state.item.price.currency}{this.state.item.price.amount + this.state.item.price.decimals}</p>
        }
        <img src={this.state.item.picture}/>
        <button className = "comprar">Comprar</button>
        <div className = "description">
          <p>Descripcion del producto</p>
          <p>{this.state.item.description}</p>
        </div>

      </div>
    )
  }
}

export default Detalle;
