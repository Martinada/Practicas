import React, { Component } from 'react';
import '../styles/productos.css';
import { Link } from 'react-router-dom'
const queryString = require('query-string');

class Productos extends Component{
  constructor(){
    super();
    this.state = {
      search: [],
      data: {
        items: [],
        categoria: []
      }
    };
  }
  componentDidMount() {
    var search = queryString.parse(this.props.location.search);
    fetch(`/items?search=${search.search}`)
      .then(res => res.json())
      .then(data => {this.setState({ data }); })
      .catch(err => console.log('error', err))


}
  render() {
    return (
        <div className = "DivContenedor">
          {this.state.data.categoria &&
            <section className = "breadcrumb">
                {this.state.data.categoria.map(i => (
            <p key={i}>{i} ></p>
          ))}
            </section>
          }
          {this.state.data.items.map(i =>
            <div className = "mainDiv" key={i.id}>
            <Link to={`/items/${i.id}`}>
            <div className = "imagen">
            <img src={i.picture}/>
            </div>
            <p className = "titulo">{i.title}</p>
            </Link>
            <p className = "precio">{i.price.currency}{i.price.amount + i.price.decimals}</p>
            <p className = "ubicacion">{i.location}</p>
          </div>
        )}
      </div>
    )

  }
}

export default Productos;
