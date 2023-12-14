import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, LogBox } from 'react-native';
import Product from '../components/Product';
import { ProductType } from '../types/ProductType';
import { getProducts } from '../services/Products';
import api from '../services/api';

interface ProductListProps {
  navigation: any; 
}
const ProductList: React.FC<ProductListProps> = ({ navigation }) => {

  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/products')
        console.log('oie')
        setProducts(response.data);
      } catch (error: any) {
        console.error('Erro ao buscar produtos:', error.stack);
      }
    };

    fetchData();
  }, []);

  const handleProductPress = (productId: string) => {
    navigation.navigate('ProductDetails', { productId });
  };

  const renderProduct = ({ item }: { item: ProductType }) => (
    <Product {...item} onPress={() => handleProductPress(item._id)} />
  );
  const keyExtractor = () => Math.random().toString();

  console.log('this is my keys', keyExtractor());
  return (
    <FlatList
      style={styles.productList}
      contentContainerStyle={styles.productListContainer}
      data={products}
      renderItem={renderProduct}
      keyExtractor={keyExtractor}
    />
  );
};

const styles = StyleSheet.create({
  productList: {
    backgroundColor: '#372D8A5B',
  },
  productListContainer: {
    paddingVertical: 8,
    marginHorizontal: 8,
  },
});

export default ProductList;
