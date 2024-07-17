import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/cartReducer";


const CartContext = createContext();

const getLocalCartData = () => {
    let localCartData = localStorage.getItem("thapaCart");
    if (localCartData == []) {
        //return JSON.parse(localCartData);
        return [];
    } else {
        //return [];
        return JSON.parse(localCartData);
    }
}; 

const initialState = {
    //cart: [],
    cart: getLocalCartData(),
    total_item: "",
    total_price: "",
    shipping_fee: 50000,
    userAuthenticated: false,
    
};


const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    

    const addToCart = (id, color, amount, product, navigate) => {
        if (!state.userAuthenticated) {
            console.log('User not authenticated, redirecting to register page');
            navigate('/register');
            return;
        }
        dispatch({ type: "ADD_TO_CART", payload: { id, color, amount, product } });
        
    };

    //increment and decrement the product
    const setDecrease = (id) => {
        dispatch({ type: "SET_DECREMENT", payload: id });
    };

    const setIncrease = (id) => {
        dispatch({ type: "SET_INCREMENT", payload: id });
    };


    const removeItem = (id) => {
        dispatch({ type: "REMOVE_ITEM", payload: id });
    };

    //to clear the cart
    const clearCart = () => {
        dispatch({ type: "CLEAR_CART"});
    };

    const setAuthentication = (status) => {
        console.log("Setting authentication status:", status);
        dispatch({ type: "SET_AUTHENTICATION", payload: status});
    };


    //to add the data in localStorage
    useEffect(() => {
        //dispatch({ type: "CART_TOTAL_ITEM" });
        //dispatch({ type: "CART_TOTAL_PRICE" });
        dispatch({ type: "CART_ITEM_PRICE_TOTAL" })
        localStorage.setItem("thapaCart", JSON.stringify(state.cart));
    }, [state.cart]);

    return (
        <CartContext.Provider value={{ ...state, addToCart, removeItem, clearCart, setDecrease, setIncrease, setAuthentication }}>
            {children}
        </CartContext.Provider>
    );
};

const useCartContext = () => {
    return useContext(CartContext);
};

export { CartProvider, useCartContext };