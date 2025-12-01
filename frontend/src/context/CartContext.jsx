import { createContext, useReducer, useContext } from 'react';

const CartContext = createContext();
const CartDispatchContext = createContext();

const initialState = { items: [] };

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      console.log('Adding item:', action.payload);
      console.log('Existing items:', state.items);
      const item = action.payload;
      const existingItem = state.items.find(i => i._id === item._id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(i =>
            i._id === item._id 
              ? { ...i, quantity: i.quantity + 1 } 
              : i
          ),
        };
      }
      return { 
        ...state, 
        items: [...state.items, { ...item, quantity: 1 }] };
    }

    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i._id !== action.payload) };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(i =>
          i._id === action.payload._id 
          ? { ...i, quantity: action.payload.quantity } 
          : i
        ),
      };

    case 'CLEAR_CART':
      return { items: []};

    default:
      throw new Error('Unknown action: ' + action.type);
  }
}


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