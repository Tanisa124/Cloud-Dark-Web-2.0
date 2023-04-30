import { createSlice } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"
import { AppState } from "./store"

export interface CartItem{
    _id : string,
    title : string,
    price: number,
    amount : number,
}

export interface CartState{
    cartState : CartItem[]
}

const initialState: CartState = {
    cartState : []
}

export const cartslice = createSlice({
    name: 'cart',
    initialState,
    reducers : {
        addToCart(state,action){
            const idToAdd = state.cartState.findIndex(item=>{
                return item._id == action.payload._id;
            })
            if(idToAdd !== -1){
                state.cartState[idToAdd].amount += 1;
            }
            else{
                state.cartState.push(action.payload);
            }
            
        },
        removeFromCart(state,action){
            const idToRemove = state.cartState.findIndex(item=>{
                return item._id == action.payload;
            })
            if(idToRemove !== -1){
                if(state.cartState[idToRemove].amount <= 1){
                    state.cartState.splice(idToRemove,1);
                }
                else{
                    state.cartState[idToRemove].amount -= 1;
                }
            }
        },
    },
    extraReducers: {
        [HYDRATE]: (state,action) =>{
            return {
                ...state,
                ...action.payload.cart
            }
        }
    }
})

export const { addToCart, removeFromCart} = cartslice.actions;

export const selectCartState = (state: AppState) => state.cart.cartState;

export default cartslice.reducer;