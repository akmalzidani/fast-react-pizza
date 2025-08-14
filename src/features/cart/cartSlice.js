import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.cart.push(action.payload);
    },
    deleteItem: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    increaseItemQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload.id);
      item.quantity++;
      item.totalPrice = item.unitPrice * item.quantity;
    },
    decreaseItemQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload.id);
      item.quantity--;
      item.totalPrice = item.unitPrice * item.quantity;
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addItem, deleteItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

export const getCart = (state) => state.cart.cart;

export const getTotalCartQuantity = (state) =>
  getCart(state).reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (state) =>
  getCart(state).reduce((sum, item) => sum + item.totalPrice, 0);
