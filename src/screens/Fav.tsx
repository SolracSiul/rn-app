import { View, Image, Text , Button , FlatList, StyleSheet } from "react-native";
import { FavContext } from "../context/FavContext";
import  React, { useEffect, useState, useContext } from 'react';



function Fav({navigation}: any) {

  const {items, getTotalPrice}: any = useContext(FavContext)

  function totals(){
      let [total, setTotal] = useState(0);
      useEffect(() =>{
          setTotal(getTotalPrice())
      })
      return(
          <View style={styles.cartLineTotal}>
              <Text style={[styles.lineLeft, styles.lineTotal]}>Total</Text>
              <Text style={styles.mainTotal}>$ {total}</Text>
          </View>
      )
  }
  function renderItem({item}: any){
      return(
          <>
              <View style={styles.cartLine}>
                  <Image style={styles.image} source={{uri: item.product.image}} />
                  <Text style={styles.lineLeft}>{item.product.name} x {item.qtd} <Text style={styles.productTotal}>${item.totalPrice}</Text></Text>
              </View>
          </>
      )
  }

return (
  <FlatList
          style={styles.itemsList}
          contentContainerStyle={styles.itemsListContainer}
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.product.id.toString()}
          ListFooterComponent={totals}
      />
)
}

export default Fav

const styles = StyleSheet.create({
  cartLine: {
    flexDirection: 'row',
    width: '80%',
    paddingVertical: 10
  },
  image: {
    width: '25%',
    aspectRatio: 1,
    marginRight: 5
  },
  cartLineTotal: {
    flexDirection: 'row',
    borderTopColor: '#dddddd',
    borderTopWidth: 1
  },
  productTotal: {
    fontWeight: 'bold'
  },
  lineTotal: {
    fontWeight: 'bold'
  },
  lineLeft: {
    fontSize: 20,
    lineHeight: 40,
    color: '#333333'
  },
  lineRight: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'left',
  },
  mainTotal: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 40,
    color: '#333333',
    textAlign: 'right'
  },
  itemsList: {
    backgroundColor: '#eeeeee'
  },
  itemsListContainer: {
    backgroundColor: '#eeeeee',
    paddingVertical: 8,
    marginHorizontal: 8
  }
})