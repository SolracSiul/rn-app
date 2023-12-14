import React, { createContext, useState, ReactNode} from 'react';
import { getProduct } from '../services/Products';
import { ProductType } from '../types/ProductType';

type CartItem = {
    id: string;
    qtd: number;
    product: ProductType;
    totalPrice: number;
}

type CartContextType = {
    items: CartItem[];
    getItemsCount: () => number;
    addItemToCart: (id: string) => void;
    removeItemToCart: (id: string) => void;
    getTotalPrice: () => number;
    checkout: () => void;
};

export const CartContext = createContext<CartContextType | undefined>({} as CartContextType);

interface CartProviderProps {
    children: ReactNode;
}

export function CartProvider(props: CartProviderProps) {
    const [items, setItems] = useState<CartItem[]>([]);
  
    async function addItemToCart(id: string){
      try {
        const product = await getProduct(id);
        if (product) {
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
    
          console.log('Adicionado ao carrinho');
        } else {
          console.error('Produto não encontrado');
        }
      } catch (error) {
        console.error('Erro ao obter produto:', error);
      }
    }
    async function removeItemToCart(id: string) {
      try {
        const product = await getProduct(id);
    
        if (product) {
          setItems((prevItems) => {
            const itemIndex = prevItems.findIndex((item) => item.id === id);
            if (itemIndex !== -1) {
              const updatedItems = [...prevItems];
              const removedItem = updatedItems.splice(itemIndex, 1)[0];
              
              console.log('Removido do carrinho:', removedItem);
    
              return updatedItems;
            } else {
              console.warn('Item não encontrado no carrinho');
              return prevItems;
            }
          });
        } else {
          console.error('Produto não encontrado');
        }
      } catch (error) {
        console.error('Erro ao obter produto:', error);
      }
    }
    function checkout(){
      setItems([])
      
    }
    function getItemsCount() {
      return items.reduce((sum, item) => sum + item.qtd, 0);
    }
  
    function getTotalPrice() {
      return items.reduce((sum, item) => sum + item.totalPrice, 0);
    }
  
    return (
      <CartContext.Provider value={{ items, getItemsCount, addItemToCart, getTotalPrice, removeItemToCart, checkout }}>
        {props.children}
      </CartContext.Provider>
    );
  }
  