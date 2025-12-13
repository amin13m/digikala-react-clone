import React, { createContext, useReducer, useContext, useEffect, useRef, useCallback, useMemo } from "react";
import { CartAPI } from "../api/api";
import { useAuth } from "./AuthContext";

// --- ACTIONS ---
const SET_CART = "SET_CART";
const ADD_ITEM = "ADD_ITEM";
const REMOVE_ITEM = "REMOVE_ITEM";
const UPDATE_QTY = "UPDATE_QTY";
const CLEAR_CART = "CLEAR_CART";

// --- INITIAL STATE ---
const initialState = {
  cartId: null,
  items: [],
  loading: true,
};

// --- REDUCER ---
function cartReducer(state, action) {
  switch (action.type) {
    case SET_CART:
      return {
        cartId: action.payload.id,
        items: action.payload.items,
        loading: false,
      };
    case ADD_ITEM:
    case REMOVE_ITEM:
    case UPDATE_QTY:
      return { ...state, items: action.payload };
    case CLEAR_CART:
      return { cartId: null, items: [], loading: false };
    default:
      return state;
  }
}

// --- CONTEXT ---
const CartContext = createContext();

// --- PROVIDER ---
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { user } = useAuth();

  // --- Refs for debounced sync ---
  const syncTimer = useRef(null);
  const latestItems = useRef([]);

  // --- Load user cart on login ---
  useEffect(() => {
    const loadCart = async () => {
      if (!user) {
        dispatch({ type: CLEAR_CART });
        return;
      }

      const res = await CartAPI.getAll();
      const cart = res.data.find((c) => c.userId === user.id);

      if (cart) dispatch({ type: SET_CART, payload: cart });
      else {
        const created = await CartAPI.create({ userId: user.id, items: [] });
        dispatch({ type: SET_CART, payload: created.data });
      }
    };

    loadCart();
  }, [user]);

  // --- Debounced sync to server ---
  useEffect(() => {
    if (!state.cartId || !user) return;

    latestItems.current = state.items;

    if (syncTimer.current) clearTimeout(syncTimer.current);

    syncTimer.current = setTimeout(async () => {
      try {
        await CartAPI.update(state.cartId, {
          userId: user.id,
          items: latestItems.current,
        });
      } catch (err) {
        console.error("Cart sync failed:", err);
      }
    }, 600); // 600ms debounce
  }, [state.items, state.cartId, user]);

  // --- ACTIONS ---
  const addItem = useCallback(
    (product) => {
      if (!user) {
        alert("ابتدا وارد حساب خود شوید.");
        return;
      }

      const existing = state.items.find((i) => i.productId === product.id);
      let updatedItems;

      if (existing) {
        updatedItems = state.items.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, product.quantity) }
            : item
        );
      } else {
        updatedItems = [
          ...state.items,
          {
            productId: product.id,
            quantity: 1,
            price: product.price,
            discount: product.discount,
            name: product.name,
          },
        ];
      }

      dispatch({ type: ADD_ITEM, payload: updatedItems });
    },
    [state.items, user]
  );

  const removeItem = useCallback(
    (productId) => {
      dispatch({
        type: REMOVE_ITEM,
        payload: state.items.filter((i) => i.productId !== productId),
      });
    },
    [state.items]
  );

  const updateQty = useCallback(
    (productId, qty) => {
      dispatch({
        type: UPDATE_QTY,
        payload: state.items.map((item) =>
          item.productId === productId ? { ...item, quantity: qty } : item
        ),
      });
    },
    [state.items]
  );

  const clearCart = useCallback(async () => {
    if (state.cartId) await CartAPI.delete(state.cartId);
    dispatch({ type: CLEAR_CART });
  }, [state.cartId]);

  // --- MEMOIZED CONTEXT VALUE ---
  const value = useMemo(
    () => ({
      ...state,
      addItem,
      removeItem,
      updateQty,
      clearCart,
    }),
    [state, addItem, removeItem, updateQty, clearCart]
  );

  return <CartContext.Provider value={value}>
    {children}
  </CartContext.Provider>;
};

// --- HOOK ---
export const useCart = () => useContext(CartContext);