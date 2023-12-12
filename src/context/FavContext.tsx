import React, { createContext, useState, ReactNode} from 'react';
import { getProduct } from '../services/Products';
import { ProductType } from '../types/ProductType';

type FavItem = {
    id: number;
    qtd: number;
    product: ProductType;
    totalPrice: number;
}

type FavContextType = {
    items: FavItem[];
    getItemsCount: () => number;
    addItemToFavs: (id: number) => void;
    getTotalPrice: () => void;
};

export const FavContext = createContext<FavContextType | undefined>({} as FavContextType);

interface FavProviderProps {
    children: ReactNode;
}

export function FavProvider(props: FavProviderProps) {
    const [items, setItems] = useState<FavItem[]>([]);
  
    function addItemToFavs(id: number) {
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
      <FavContext.Provider value={{ items, getItemsCount, addItemToFavs, getTotalPrice }}>
        {props.children}
      </FavContext.Provider>
    );
  }
  