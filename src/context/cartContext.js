import React, {useState} from "react";

export const CartContext = React.createContext({
    cartItems: [],
    totalNumberOfItems: [],
    addToCart: (value) => {},
    removeFromCart: (id) => {},
    removeAllFromCart: () => {}
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
        removeFromCart: (cartItem) => setCartItems((prevState) => {
            return prevState.map((item) => {
                if(item.id === cartItem.id) {
                    return  {...item, quantity: item.quantity - 1}
                }
                return item
            }).filter((item) => item.quantity > 0)
        }),
        removeAllFromCart: () => setCartItems([]),
        cartItems
    }

    return <CartContext.Provider value={value}>
        {children}
    </CartContext.Provider>
}
