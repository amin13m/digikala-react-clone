import React, { createContext, useReducer, useContext, useEffect } from "react";
import { CartAPI } from "../api/api";
import { useAuth } from "./AuthContext";

// ACTIONS
const SET_CART = "SET_CART";
const ADD_ITEM = "ADD_ITEM";
const REMOVE_ITEM = "REMOVE_ITEM";
const UPDATE_QTY = "UPDATE_QTY";
const CLEAR_CART = "CLEAR_CART";

const initialState = {
  cartId: null,
  items: [],
  loading: true,
};

// REDUCER
function cartReducer(state, action) {
  switch (action.type) {
    case SET_CART:
      return {
        ...state,
        cartId: action.payload.id,
        items: action.payload.items,
        loading: false,
      };

    case ADD_ITEM:
    case REMOVE_ITEM:
    case UPDATE_QTY:
      return {
        ...state,
        items: action.payload,
      };

    case CLEAR_CART:
      return { cartId: null, items: [], loading: false };

    default:
      return state;
  }
}

// CONTEXT
const CartContext = createContext();

// PROVIDER
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { user } = useAuth();

  // Load user's cart on login
  useEffect(() => {
    const loadUserCart = async () => {
      if (!user) {
        dispatch({ type: CLEAR_CART });
        return;
      }

      const res = await CartAPI.getAll();
      const userCart = res.data.find((c) => c.userId === user.id);

      if (userCart) {
        dispatch({ type: SET_CART, payload: userCart });
      } else {
        // Create empty cart for user
        const newCart = {
          userId: user.id,
          items: [],
        };

        const created = await CartAPI.create(newCart);
        dispatch({ type: SET_CART, payload: created.data });
      }
    };

    loadUserCart();
  }, [user]);

  // Sync cart to server whenever items change
  const syncToServer = async (updatedItems) => {
    if (!state.cartId) return;

    await CartAPI.update(state.cartId, {
      userId: user.id,
      items: updatedItems,
    });
  };

  // ACTIONS
  const addItem = async (product) => {
    
    if(!user){
      alert("ابتدا وارد حساب خود شوید.");
      return
    }

    const existing = state.items.find((item) => item.productId === product.id);

    let updatedItems;

    if (existing) {
      updatedItems = state.items.map((item) =>{

        if(item.productId === product.id ){
          return item.quantity < product.quantity?
           { ...item, quantity: item.quantity + 1 }
           :{ ...item, quantity: item.quantity }
        }
        else{
          return item
        } 
      }
      );
    } else {
      updatedItems = [
        ...state.items,
        { productId: product.id, quantity: 1 , price: product.price, discount: product.discount ,name: product.name },
      ];
    }

    dispatch({ type: ADD_ITEM, payload: updatedItems });
    syncToServer(updatedItems);
  };

  const removeItem = async (productId) => {
    let updatedItems = state.items.filter(item=> item.productId !== productId);

    dispatch({ type: REMOVE_ITEM, payload : updatedItems });
    syncToServer(updatedItems);
  }

  const updateQty = (productId, qty) => {
    const updatedItems = state.items.map((item) =>
      item.productId === productId ? { ...item, quantity: qty } : item
    );

    dispatch({ type: UPDATE_QTY, payload: updatedItems });
    syncToServer(updatedItems);
  };

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
    if (state.cartId) CartAPI.update(state.cartId, { userId: user.id, items: [] });
  };


  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        state,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// HOOK
export const useCart = () => useContext(CartContext);