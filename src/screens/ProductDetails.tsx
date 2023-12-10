import React, {useContext, useEffect, useState} from 'react'
import {View, StyleSheet, Image, ScrollView, SafeAreaView, Button , Text} from 'react-native'
import { getProduct } from '../services/Products'
// import { CartContext } from '../Context/CartContext';

function ProductDetails({route}: any) {
    
    const {productId} = route.params;
    const [product, setProduct] = useState({} as any)
    // const {addItemToCart} = useContext(CartContext);
    
    useEffect(() =>{
        setProduct(getProduct(productId))
    })
    function onAddTocart(id: number){
        console.log('adicionando produto', id)
        // addItemToCart(product.id)
    }

  return (
   <SafeAreaView>
        <ScrollView>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{uri:product.image}}></Image>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{product.name}</Text>
                <Text style={styles.price}>${product.price}</Text>
                <Text style={styles.description}>${product.description}</Text>
                <Button title="Add to card" onPress={() =>{onAddTocart(product.id)}}/>
            </View>
        </ScrollView>
   </SafeAreaView>
  )
}

export default ProductDetails

const styles = StyleSheet.create({
    imageContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    image:{
        width: '100%',
        aspectRatio: 1
    },
    infoContainer:{
        padding: 16
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    price: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8
    },
    description:{
        fontSize:16,
        fontWeight: '400',
        color: '#787878',
        marginBottom: 16,
    }
})
