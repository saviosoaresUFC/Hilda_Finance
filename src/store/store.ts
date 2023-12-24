import { create } from 'zustand';
import { produce } from 'immer';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SkewerSimples from '../data/SkewerSimple';
import SkewerComplete from '../data/SkewerComplete';
import Hamburguer from '../data/Hamburguer';
import Food from '../data/Food';
import Drinks from '../data/Drinks';

export const useStore = create(
    persist(
        (set, get) => ({
            SkewerSimpleList: SkewerSimples,
            SkewerCompleteList: SkewerComplete,
            HamburguerList: Hamburguer,
            FoodList: Food,
            DrinksList: Drinks,
            CartPrice: 0,
            CartList: [],
            addToCart: (cartItem: any) =>
                set(
                    produce(state => {
                        state.CartList.push(cartItem);
                    }),
                ),
                calculateCartPrice: () =>
                set(
                    produce(state => {
                        let totalprice = 0;
            
                        for (let i = 0; i < state.CartList.length; i++) {
                            let tempprice = 0;
            
                            // Certifique-se de que o preço é um número antes de adicionar
                            if (!isNaN(parseFloat(state.CartList[i].price))) {
                                tempprice = parseFloat(state.CartList[i].price);
                            } else {
                                console.error(`Preço para o item no índice ${i} não é um número válido`);
                            }
            
                            state.CartList[i].ItemPrice = tempprice.toFixed(2).toString();
                            totalprice = totalprice + tempprice;
                        }
            
                        state.CartPrice = totalprice.toFixed(2).toString();
                    }),
                ),
            cleanCartList: () =>
                set(
                    produce(state => {
                        state.CartList = [];
                        state.CartPrice = 0;
                    }),
                ),
        }),
        {
            name: 'Hilda_Finance',
            storage: createJSONStorage(() => AsyncStorage),
        },
    ),
);
