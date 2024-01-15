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
            SkewerSimpleList: SkewerSimples,    // Lista de Espetinhos Simples
            SkewerCompleteList: SkewerComplete, // Lista de Espetinhos Completos
            HamburguerList: Hamburguer,        // Lista de Hamburgueres
            FoodList: Food,                   // Lista de Arrumadinho
            DrinksList: Drinks,             // Lista de Bebidas
            CartPrice: 0,               // Preço Total do Carrinho
            CartList: [],           // Lista de Itens do Carrinho
            ListaVendas: [],    // Lista de Vendas
            ListaDespesas: [],  // Lista de Despesas
            addToVendas: (venda: any) =>    // Adiciona uma venda à lista de vendas
                set(
                    produce(state => {
                        state.ListaVendas.push(venda);  // Adiciona a venda à lista de vendas
                    }),
                ),
            addToDespesas: (despesa: any) =>    // Adiciona uma despesa à lista de despesas
                set(
                    produce(state => {
                        state.ListaDespesas.push(despesa);  // Adiciona a despesa à lista de despesas
                    }),
                ),
            addToCart: (cartItem: any) =>   // Adiciona um item ao carrinho
                set(
                    produce(state => {
                        state.CartList.push(cartItem);  // Adiciona o item ao carrinho
                    }),
                ),
            calculateCartPrice: () =>   // Calcula o preço total do carrinho
                set(
                    produce(state => {
                        let totalprice = 0;

                        for (let i = 0; i < state.CartList.length; i++) {   // Percorre a lista de itens do carrinho
                            let tempprice = 0;
                            if (!isNaN(parseFloat(state.CartList[i].price))) { // Certifica que o preço é um número antes de adicionar
                                tempprice = parseFloat(state.CartList[i].price);    // Adiciona o preço do item
                            }
                            // else {
                            //     console.error(`Preço para o item no índice ${i} não é um número válido`);
                            // }
                            state.CartList[i].ItemPrice = tempprice.toFixed(2).toString();  // Adiciona o preço do item
                            totalprice = totalprice + tempprice;    // Adiciona o preço do item ao preço total
                        }

                        state.CartPrice = totalprice.toFixed(2).toString(); // Adiciona o preço total ao carrinho
                    }),
                ),
            cleanCartList: () =>    // Limpa a lista de itens do carrinho e o preço total
                set(
                    produce(state => {
                        state.CartList = [];   // Limpa a lista de itens do carrinho
                        state.CartPrice = 0;    // Limpa o preço total
                    }),
                ),
            cleanListaDespesas: () =>    // Limpa a lista de despesas
                set(
                    produce(state => {
                        state.ListaDespesas = [];   // Limpa a lista de despesas
                    }),
                ),
            cleanListaVendas: () =>    // Limpa a lista de vendas
                set(
                    produce(state => {
                        state.ListaVendas = [];   // Limpa a lista de vendas
                    }),
                ),
            removeFromCart: (cartItem: any) =>  // Remove um item do carrinho e diminui o preço total
                set(
                    produce(state => {
                        for (let i = 0; i < state.CartList.length; i++) {   // Percorre a lista de itens do carrinho
                            if (state.CartList[i].id == cartItem.id && state.CartList[i].type == cartItem.type) {   // Verifica se o item é o mesmo que o item a ser removido
                                state.CartList.splice(i, 1);    // Remove o item do carrinho
                                state.CartPrice = (parseFloat(state.CartPrice) - parseFloat(cartItem.ItemPrice)).toFixed(2).toString(); // diminui o valor do Price Total
                                break;  // Para o loop
                            }
                        }
                    }),
                ),
            removeFromVendas: (venda: any) =>  // Remove uma venda da lista de vendas
                set(
                    produce(state => {
                        for (let i = 0; i < state.ListaVendas.length; i++) {   // Percorre a lista de vendas
                            if (state.ListaVendas[i].id == venda.id && state.ListaVendas[i].date == venda.date) {   // Verifica se a venda é a mesma que a venda a ser removida
                                state.ListaVendas.splice(i, 1);    // Remove a venda da lista de vendas
                                break;  // Para o loop
                            }
                        }
                    }),
                ),
            removeFromDespesas: (despesa: any) =>  // Remove uma despesa da lista de despesas
                set(
                    produce(state => {
                        for (let i = 0; i < state.ListaDespesas.length; i++) {   // Percorre a lista de despesas
                            if (state.ListaDespesas[i].id == despesa.id && state.ListaDespesas[i].date == despesa.date) {   // Verifica se a despesa é a mesma que a despesa a ser removida
                                state.ListaDespesas.splice(i, 1);    // Remove a despesa da lista de despesas
                                break;  // Para o loop
                            }
                        }
                    }),
                ),
        }),
        {
            name: 'Hilda_Finance',  // Nome do Storage
            storage: createJSONStorage(() => AsyncStorage), // Armazena os dados no AsyncStorage do React Native
        },
    ),
);