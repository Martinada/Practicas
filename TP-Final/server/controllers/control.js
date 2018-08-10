var express = require('express');
var router = express.Router();
var axios = require('axios');
const self = {};

self.search = function(req, res, next){
  let query = req.query.search;
  let items = [];

   return axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=4`)
       .then(response => {
         return response.data
       })
       .then(res => {
       var filters = res.filters
       var res = res.results

        for (var i = 0; i < filters.length; i++) {
        var i = filters[0].values[0].path_from_root

        var  categories = i.length ? i.map(p => p.name) : ''
}
         res.map(r => {
           let itemsCompleto = {
               'id': r.id,
               'title': r.title,
               'price': {
                 'currency' : r.currency_id == "ARS" ? "$" : r.currency_id,
                 'amount' : Math.trunc(r.price),
                 'decimals' : r.price - Math.trunc(r.price)
               },
               'picture' : r.thumbnail,
               'condition' : r.condition,
               'freeShipping' : r.shipping.free_shipping,
               'location' : r.address.state_name
           }
           items.push(itemsCompleto)
       })

          return {products: items, categories}
     })
       .then(({ products, categories }) =>{
         res.json({
           author: {
              'name' : "Martina",
              'lastname' : "Gonzalez"
           },
            categoria : categories,
           items: products
         })
       })
       .catch(function(e){
           console.log('Error', e)
       })
 }

 self.productDetail = function(req,res,next){
   let query = req.query;
   let id = req.params.id;

   return axios.get('https://api.mercadolibre.com/items/'+id)
               .then(response => {
                 return response.data
               })
               .then(res => {
                   objetoCompleto = {
                       'id': res.id,
                       'title': res.title,
                       'price': {
                         'currency' : res.currency_id == "ARS" ? "$" : res.currency_id,
                         'amount' : Math.trunc(res.price),
                         'decimals' : res.price - Math.trunc(res.price)
                       },
                       'picture' : res.thumbnail,
                       'condition' : res.condition,
                       'freeShipping' : res.shipping.free_shipping,
                       'sold_quantity' : res.sold_quantity,
                   }
                   return objetoCompleto
               })
               .then(detail =>{
                 return axios.get('https://api.mercadolibre.com/items/'+id+'/description')
                              .then(respuesta => respuesta.data)
                              .then(rta => {
                                objetoCompleto.description = rta.plain_text;
                                return objetoCompleto
                              })
               })
               .then(data =>{
                 res.json({
                   author: {
                      'name' : "Martina",
                      'lastname' : "Gonzalez"
                   },
                   items: objetoCompleto
                 })
               })
               .catch(function(e){
                   console.log('Error', e)
               })
         }

module.exports = self;
