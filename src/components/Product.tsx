import React from 'react';
import { Text, Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import { ProductType } from '../types/ProductType';
import { CartContext } from '../context/CartContext';
import { useContext } from 'react';
import { FavContext } from '../context/FavContext';

interface ProductProps extends ProductType {
  onPress: () => void;
}

const Product: React.FC<ProductProps> = ({ name, price, image, onPress, _id }) => {

  const {addItemToCart}:any = useContext(CartContext);
  const {addItemToFavs}:any = useContext(FavContext);
  
  const addToCart =(_id: string) =>{
    console.log('estou adicionando esse id:', _id)
    addItemToCart(_id)
  }
  const addToFav = (_id: string) =>{
    console.log('estou adicionando esse id:', _id)
    addItemToFavs(_id)
  }
  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.imageContainer} onPress={onPress}>
        <Image style={styles.image} source={{ uri: image }} />
      </TouchableOpacity>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>${price}</Text>
      </View>
      <TouchableOpacity style={styles.addToCartButton} onPress={()=> addToCart(_id)}>
        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.addToFavButton} onPress={()=> addToFav(_id)}>
        <Text style={styles.addToCartFavText}>Add to FAV</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    card: {
      backgroundColor: '#FFFFFF',
      borderRadius: 12,
      overflow: 'hidden',
      marginBottom: 16,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    imageContainer: {
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      aspectRatio: 1,
    },
    infoContainer: {
      padding: 12,
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    price: {
      fontSize: 16,
      fontWeight: '600',
      color: '#007BFF',
    },
    addToCartButton: {
      backgroundColor: '#007BFF',
      padding: 12,
      alignItems: 'center',
    },
    addToCartButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
    addToFavButton:{
      backgroundColor: '#32CD32',
      padding: 12,
      alignItems: 'center',
    },
    addToCartFavText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default Product;
