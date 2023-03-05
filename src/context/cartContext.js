import React, {useState} from "react";

export const CartContext = React.createContext({
    cartItems: [],
    addToCart: (value) => {},
    removeFromCart: (id) => {},
})

export const CartContextProvider = ({children}) => {
    const [cartItems, setCartItems] = useState([])

    const value = {
        addToCart: (cartItem) => setCartItems((prevState) => {
            if(!prevState.find(({id}) => cartItem.id === id)) {
                return  [...prevState, {...cartItem, quantity: 1}]
            }

           return  prevState.map((item) => {
                if(item.id === cartItem.id) {
                   return  {...item, quantity: item.quantity + 1}
                }
                return item
            })

        }),
        removeFromCart: (cartItem) => setCartItems((prevState) => prevState.filter((item) => item.id !== cartItem.id)),
        cartItems
    }

    return <CartContext.Provider value={value}>
        {children}
    </CartContext.Provider>
}
