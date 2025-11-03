import React, { createContext, useReducer, useContext } from 'react';

const CartContext = createContext();
const CartDispatchContext = createContext();

const initialState = { items: [] };

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const item = action.payload;
      const existingItem = state.items.find(i => i.id === item.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(i =>
            i.menuItem === item.menuItem ? { ...i, quantity: i.quantity + item.quantity } : i
          ),
        };
      };
      return { ...state, items: [...state.items, item] };
    };
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.menuItem !== action.payload.id) };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(i =>
          i.menuItem === action.payload.id ? { ...i, quantity: action.payload.quantity } : i
        ),
      };
    case 'CLEAR_CART':
      return initialState;
    default:
      throw new Error('Unknown action: ' + action.type);
  };
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartContext.Provider value={state}>{children}</CartContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
export const useCartDispatch = () => useContext(CartDispatchContext);