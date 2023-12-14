import React, { useEffect, useState, useContext } from 'react';
import { View, Image, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { CartContext } from '../context/CartContext';
import { Feather } from '@expo/vector-icons';

function Cart({ navigation }: any) {
  
  const { items, getTotalPrice, removeItemToCart, checkout }: any = useContext(CartContext);
  const quantidade = items.length;
  function SignOutButton({ onPress }: any) {
    return (
      <TouchableOpacity onPress={onPress} style={styles.btnRemove}>
        <Feather name="trash-2" size={20} color="purple" />
      </TouchableOpacity>
    );
  }
  function handleCheckout(){
    checkout()
  }

  function Totals() {
    let [total, setTotal] = useState(0);
    useEffect(() => {
      setTotal(getTotalPrice());
    }, [items]);

    return (
      <View style={styles.cartLineTotal}>
        <View style={styles.line}>
          <Text style={[styles.lineLeft, styles.lineTotal]}>Total</Text>
          <Text style={styles.mainTotal}>$ {total}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutButton} onPress={() => handleCheckout()}>
          <Text style={styles.checkoutButtonText}>Finalizar Compra</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderItem({ item }: any) {
    return (
      <View style={styles.cartLine}>
        <Image style={styles.image} source={{ uri: item.product.image }} />
        <View style={styles.itemDetails}>
          <Text style={styles.productName}>{item.product.name}</Text>
          <Text style={styles.quantity}>Quantidade: {item.qtd}</Text>
          <Text style={styles.productTotal}>Total: ${item.totalPrice}</Text>
        </View>
        <SignOutButton onPress={() => removeItemToCart(item.product._id)} />
      </View>
    );
  }
  function Empty(){
    return(
      <View style={styles.vazio}>
        <View style={styles.vazioContent}>
          <Feather name="shopping-bag" size={62} color="purple" />
          <Text style={styles.vazioText}>Seu carrinho está vazio :( </Text>
        </View>
      </View>
    )
  }

  return (
    <>  
    {quantidade > 0 ? <FlatList
      style={styles.itemsList}
      contentContainerStyle={styles.itemsListContainer}
      data={items}
      renderItem={renderItem}
      keyExtractor={(item, index) => item.product._id}
      ListFooterComponent={Totals}
      /> :
       <Empty />}
    
      </>
  );
}

export default Cart;

const styles = StyleSheet.create({
  cartLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
  },
  vazioContent:{
    alignItems: 'center'
  },
  vazioText:{
    color: 'purple',
    paddingLeft: 15,
    paddingTop: 10
  },
  vazio:{
    flex:1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'auto'
  },
  line:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8
  },
  btnRemove: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 5,
  },
  itemDetails: {
    flex: 1,
    marginRight: 10,
  },
  productName: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 5,
  },
  quantity: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 5,
  },
  productTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  cartLineTotal: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    marginTop: 10,
    paddingTop: 10,
  },
  lineTotal: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333333',
  },
  lineLeft: {
    fontSize: 16,
    lineHeight: 40,
    color: '#333333',
  },
  mainTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 40,
    color: '#333333',
  },
  itemsList: {
    backgroundColor: '#f4f4f4',
  },
  itemsListContainer: {
    backgroundColor: '#f4f4f4',
    paddingHorizontal: 8,
  },
  checkoutButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'purple',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
