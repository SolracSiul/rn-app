import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Image, ScrollView, SafeAreaView, Button, Text } from 'react-native';
import { getProduct } from '../services/Products';
import { CartContext } from '../context/CartContext';
import { ProductType } from '../types/ProductType';

function ProductDetails({ route }: any) {
  const { productId } = route.params;
  const [product, setProduct] = useState<ProductType | undefined>(undefined);
  const { addItemToCart }: any = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProduct(productId);
        setProduct(productData);
        console.log('current product:', productData);
        console.log('currentId',  productData?._id);
        console.log('id via params',  productId);
      } catch (error) {
        console.log('Erro ao obter produto', error);
      }
    };

    fetchProduct();
  }, [productId]);

  function onAddToCart(id: string) {
    console.log('Estou clicando,', id);
    addItemToCart(id);
  }

  return (
    <SafeAreaView>
      <ScrollView>
        {product && (
          <>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: product.image }} />
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{product.name}</Text>
              <Text style={styles.price}>${product.price}</Text>
              <Text style={styles.description}>{product.description}</Text>
              <Button title="Add to cart" onPress={() => onAddToCart(product._id)} />
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default ProductDetails;

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    color: '#787878',
    marginBottom: 16,
  },
});
