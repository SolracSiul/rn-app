import React, { createContext, useState, ReactNode} from 'react';
import { getProduct } from '../services/Products';
import { ProductType } from '../types/ProductType';

type CartItem = {
    id: number;
    qtd: number;
    product: ProductType;
    totalPrice: number;
}

type CartContextType = {
    items: CartItem[];
    getItemsCount: () => number;
    addItemToCart: (id: number) => void;
    getTotalPrice: () => number;
};

export const CartContext = createContext<CartContextType | undefined>({} as CartContextType);

interface CartProviderProps {
    children: ReactNode;
}

export function CartProvider(props: CartProviderProps) {
    const [items, setItems] = useState<CartItem[]>([]);
  
    function addItemToCart(id: number) {
      const product = getProduct(id);
      if(product){
          setItems((prevItems) => {
            const item = prevItems.find((item) => item.id === id);
            if (!item) {
              return [
                ...prevItems,
                {
                  id,
                  qtd: 1,
                  product,
                  totalPrice: product.price,
                },
              ];
            } else {
              return prevItems.map((item) => {
                if (item.id === id) {
                  item.qtd++;
                  item.totalPrice += product.price;
                }
                return item;
              });
            }
          });
      }
    }
  
    function getItemsCount() {
      return items.reduce((sum, item) => sum + item.qtd, 0);
    }
  
    function getTotalPrice() {
      return items.reduce((sum, item) => sum + item.totalPrice, 0);
    }
  
    return (
      <CartContext.Provider value={{ items, getItemsCount, addItemToCart, getTotalPrice }}>
        {props.children}
      </CartContext.Provider>
    );
  }
  