import React, { createContext, useReducer, useContext, useEffect } from "react";
import { UserAPI } from "../api/api";

// --- ACTION TYPES ---
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const REGISTER = "REGISTER";
const SET_USER = "SET_USER";
const UPDATE_USER = "UPDATE_USER";

// --- INITIAL STATE ---
const initialState = {
  user: null,
  loading: true,
};

// --- REDUCER ---
function authReducer(state, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload, loading: false };
    case LOGIN:
      return { ...state, user: action.payload };
    case REGISTER:
      return { ...state, user: action.payload };
    case LOGOUT:
      return { ...state, user: null };
    case UPDATE_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

// --- CONTEXT ---
const AuthContext = createContext();

// --- PROVIDER ---
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    
    if (savedUser) {
      dispatch({ type: SET_USER, payload: JSON.parse(savedUser) });
    } else {
      dispatch({ type: SET_USER, payload: null });
    }
  }, []);

  // Sync user to localStorage
  useEffect(() => {
    if(state.loading) return

    if (state.user) {
      localStorage.setItem("user", JSON.stringify(state.user));
    } else {
      localStorage.removeItem("user");
    }
  }, [state.user , state.loading]);

  // --- ACTIONS ---
  const login = async (email, password) => {
    try {
      const res = await UserAPI.getAll();
      const users = res.data;
      const user = users.find(u => u.email === email && u.password === password);
      if (!user) throw new Error("ایمیل یا رمز عبور اشتباه است");

      dispatch({ type: LOGIN, payload: user });
      return user;
    } catch (err) {
      throw err;
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await UserAPI.getAll();
      const exist = res.data.find(u => u.email === email);
      if (exist) throw new Error("این ایمیل قبلا ثبت شده");

      const newUser = { name, email, password, role: "user" };
      const created = await UserAPI.create(newUser);
      dispatch({ type: REGISTER, payload: created.data });
      return created.data;
    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    dispatch({ type: LOGOUT });
  };


  const setUser= async (user) => {
    await UserAPI.update(user.id, user);
    dispatch({type:SET_USER,payload:user});
  };


  // --- UPDATE NAME ---
const updateName = async (newName) => {
  const updated = { ...state.user, name: newName };
  await UserAPI.update(updated.id, updated);
  dispatch({ type: UPDATE_USER, payload: updated });
};

// --- UPDATE PASSWORD ---
const updatePassword = async (oldPass, newPass) => {
  if (state.user.password !== oldPass) {
    throw new Error("رمز فعلی اشتباه است");
  }

  const updated = { ...state.user, password: newPass };
  await UserAPI.update(updated.id, updated);
  dispatch({ type: UPDATE_USER, payload: updated });
};

// --- CHARGE WALLET ---
const chargeWallet = async (amount) => {
  const updated = { ...state.user, wallet: state.user.wallet + amount };
  await UserAPI.update(updated.id, updated);
  dispatch({ type: UPDATE_USER, payload: updated });
};

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout , setUser , updateName , updatePassword , chargeWallet}}>
      {children}
    </AuthContext.Provider>
  );
};

// --- CUSTOM HOOK ---
export const useAuth = () => useContext(AuthContext);