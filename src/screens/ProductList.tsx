import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getProducts } from '../services/Products';
import Product from '../components/Product';
import { ProductType } from '../types/ProductType';

interface ProductListProps {
  navigation: any; 
}

const ProductList: React.FC<ProductListProps> = ({ navigation }) => {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchData();
  }, []);

  const handleProductPress = (productId: number) => {
    navigation.navigate('ProductDetails', { productId });
  };

  const renderProduct = ({ item }: { item: ProductType }) => (
    <Product {...item} onPress={() => handleProductPress(item.id)} />
  );

  return (
    <FlatList
      style={styles.productList}
      contentContainerStyle={styles.productListContainer}
      data={products}
      renderItem={renderProduct}
      keyExtractor={(item) => item.id.toString()}
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
