import React, {useState} from "react";

export const CartContext = React.createContext({
    cartItems: [],
    addToCart: (value) => {},
    removeFromCart: (id) => {},
})

export const CartContextProvider = ({children}) => {
    const [cartItems, setCartItems] = useState([])

    const value = {
        addToCart: (cartItem) => setCartItems((prevState) => [...prevState, cartItem]),
        removeFromCart: (cartItem) => setCartItems((prevState) => prevState.filter((item) => item.id !== cartItem.id)),
        cartItems
    }

    return <CartContext.Provider value={value}>
        {children}
    </CartContext.Provider>
}
