import React, { createContext, useState, ReactNode} from 'react';
import { getProduct } from '../services/Products';
import { ProductType } from '../types/ProductType';

type FavItem = {
    id: string;
    qtd: number;
    product: ProductType;
    totalPrice: number;
}

type FavContextType = {
    items: FavItem[];
    getItemsCount: () => number;
    addItemToFavs: (id: string) => void;
    removeItemToFav: (id: string) => void;
    getTotalPrice: () => void;
    checkoutFav: () => void;
};

export const FavContext = createContext<FavContextType | undefined>({} as FavContextType);

interface FavProviderProps {
    children: ReactNode;
}

export function FavProvider(props: FavProviderProps) {
    const [items, setItems] = useState<FavItem[]>([]);
  
    async function addItemToFavs(id: string){
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
      async function removeItemToFav(id: string) {
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
    
    function checkoutFav(){
      setItems([])
    }
  
    function getItemsCount() {
      return items.reduce((sum, item) => sum + item.qtd, 0);
    }
  
    function getTotalPrice() {
      return items.reduce((sum, item) => sum + item.totalPrice, 0);
    }
  
    return (
      <FavContext.Provider value={{ items, checkoutFav, removeItemToFav ,getItemsCount, addItemToFavs, getTotalPrice }}>
        {props.children}
      </FavContext.Provider>
    );
  }
  