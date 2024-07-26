import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        restaurant: null,
    },

    reducers: {
        addItems: (state, action) => {
            const data = action.payload;

            if(state.restaurant === null) {
                state.restaurant = data.resNeededData;
                state.items.push({...data.itemInfo, quantity: 1});
            }
            else if (state.restaurant.id !== data.resNeededData.id) {
                state.restaurant = data.resNeededData;
                state.items = [{...data.itemInfo, quantity: 1}];
            }else {
                state.items.push({...data.itemInfo, quantity: 1});
            }
        },

        increaseItemCount: (state, action) => {
            let index = 0;
            for(let i=0; i<state.items.length; i++){
                if(state.items[i].card.info.id === action.payload) {
                    index = i;
                    break;
                }
            }

            state.items[index].quantity += 1; 
        },

        decreaseItemCount: (state, action) => {
            let index = 0;
            for(let i=0; i<state.items.length; i++){
                if(state.items[i].card.info.id === action.payload) {
                    index = i;
                    break;
                }
            }

            if(state.items[index].quantity > 1){
                state.items[index].quantity -= 1;
            }else{
                state.items.splice(index, 1);  // remove from items, if item_quantity < 1
            }
        },

        // to remove any item from list
        clearItem: (state, action) => {
            for(let i=0; i<state.items.length; i++){
                if(state.items[i].card.info.id === action.payload) {
                    state.items.splice(i, 1);
                    break;
                }
            }
        },

        clearCart: (state) => {
            state.items = [];
            state.restaurant = null;
        }
    }
})

export const { 
    addItems, 
    increaseItemCount, 
    decreaseItemCount, 
    clearCart, 
    clearItem 
} = cartSlice.actions;

export default cartSlice.reducer;