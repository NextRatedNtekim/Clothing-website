import { createContext, useContext, useReducer, useCallback, useRef } from 'react';

const CartContext = createContext(null);

const initialState = {
  items:      [],
  isOpen:     false,
  flyingItem: null, // { id, image, fromRect }
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((i) => i.id === action.payload.id);
      return {
        ...state,
        items: existing
          ? state.items.map((i) =>
              i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i
            )
          : [...state.items, { ...action.payload, quantity: 1 }],
      };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((i) => i.id !== action.payload) };
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      return {
        ...state,
        items:
          quantity < 1
            ? state.items.filter((i) => i.id !== id)
            : state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
      };
    }
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'OPEN_CART':
      return { ...state, isOpen: true };
    case 'CLOSE_CART':
      return { ...state, isOpen: false };
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };
    case 'SET_FLYING':
      return { ...state, flyingItem: action.payload };
    case 'CLEAR_FLYING':
      return { ...state, flyingItem: null };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  // ref to the cart icon DOM node so we can compute its position for the arc
  const cartIconRef = useRef(null);

  const addItem = useCallback((product, fromRect) => {
    // 1. Trigger flying animation
    dispatch({ type: 'SET_FLYING', payload: { ...product, fromRect } });
    // 2. After arc lands (~700ms) add to cart and open drawer
    setTimeout(() => {
      dispatch({ type: 'ADD_ITEM', payload: product });
      dispatch({ type: 'CLEAR_FLYING' });
      dispatch({ type: 'OPEN_CART' });
    }, 680);
  }, []);

  const removeItem     = useCallback((id) => dispatch({ type: 'REMOVE_ITEM', payload: id }), []);
  const updateQuantity = useCallback((id, qty) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity: qty } }), []);
  const clearCart      = useCallback(() => dispatch({ type: 'CLEAR_CART' }), []);
  const openCart       = useCallback(() => dispatch({ type: 'OPEN_CART' }), []);
  const closeCart      = useCallback(() => dispatch({ type: 'CLOSE_CART' }), []);
  const toggleCart     = useCallback(() => dispatch({ type: 'TOGGLE_CART' }), []);

  const totalItems = state.items.reduce((s, i) => s + i.quantity, 0);
  const subtotal   = state.items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items, isOpen: state.isOpen, flyingItem: state.flyingItem,
        totalItems, subtotal,
        cartIconRef,
        addItem, removeItem, updateQuantity, clearCart,
        openCart, closeCart, toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
