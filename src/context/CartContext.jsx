
import React, { createContext, useReducer, useContext, useEffect } from "react";
import { CartAPI } from "../api/api.js";

// --- ACTION TYPES ---
const ADD_ITEM = "ADD_ITEM";
const REMOVE_ITEM = "REMOVE_ITEM";
const UPDATE_QTY = "UPDATE_QTY";
const CLEAR_CART = "CLEAR_CART";
const SET_CART = "SET_CART";

// --- INITIAL STATE ---
const initialState = {
  items: [],
  total: 0,
  loading: true,
};



// --- REDUCER ---
function cartReducer(state, action) {
  switch (action.type) {
    case SET_CART:
      return {
        ...state,
        items: action.payload,
        total: action.payload.reduce((sum, item) => sum + item.price * item.quantity, 0),
        loading: false,
      };
    case ADD_ITEM:
      {
        const exist = state.items.find(item => item.id === action.payload.id);
        let updatedItems;
        if (exist) {
          updatedItems = state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          );
        } else {
          updatedItems = [...state.items, action.payload];
        }
        return {
          ...state,
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        };
      }
    case REMOVE_ITEM:
      {
        const updatedItems = state.items.filter(item => item.id !== action.payload);
        return {
          ...state,
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        };
      }
    case UPDATE_QTY:
      {
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
        );
        return {
          ...state,
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        };
      }
    case CLEAR_CART:
      return { ...state, items: [], total: 0 };
    default:
      return state;
  }
}

// --- CONTEXT ---
const CartContext = createContext();

// --- PROVIDER ---
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      dispatch({ type: SET_CART, payload: JSON.parse(savedCart) });
    } else {
      dispatch({ type: SET_CART, payload: [] });
    }
  }, []);

  // Sync cart to localStorage whenever items change
  useEffect(() => {
    if (!state.loading) {
      localStorage.setItem("cart", JSON.stringify(state.items));
    }
  }, [state.items, state.loading]);

  // --- ACTIONS ---
  const addItem = async (item) => {
    dispatch({ type: ADD_ITEM, payload: item });
 
  };

  const removeItem = async (id) => {
    dispatch({ type: REMOVE_ITEM, payload: id });
  
  };

  const updateQty = async (id, quantity) => {
    dispatch({ type: UPDATE_QTY, payload: { id, quantity } });
  
  };

  const clearCart = async () => {
    dispatch({ type: CLEAR_CART });
   
  };

  return (
    <CartContext.Provider value={{ ...state, addItem, removeItem, updateQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// --- CUSTOM HOOK ---
export const useCart = () => useContext(CartContext);