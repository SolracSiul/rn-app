import axios from "axios";

export function getProducts(){
    return axios.get('http://localhost:3001/products')
    .then(response =>{
        console.log('meus produtos srk: ', response.data)
        return response.data
    }).catch(error =>{
        console.error('Erro get products', error)
        throw error;
    })
}

export function getProduct(id: string){
    return axios.get(`http://192.168.15.6:3001/product/${id}`)
    .then(response =>{
        console.log('meus produtos: ', response.data)
        return response.data
    }).catch(error =>{
        console.error('Erro get products', error)
        throw error;
    })
}
