"use client";
import { openCartModal } from "@/utlis/openCartModal";

import React, { useEffect } from "react";
import { useContext, useState } from "react";

const dataContext = React.createContext();
export const useCartContextElement = () => {
    return useContext(dataContext);
};

export default function CartContext({ children }) {
    const [cartProducts, setCartProducts] = useState([]);
    const [quickViewItem, setQuickViewItem] = useState({});
    const [quickViewItemId, setQuickViewItemId] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const subtotal = cartProducts.reduce((accumulator, product) => {
            const price = product.new_selling_price > 0 ? product.new_selling_price : product.selling_price;
            return accumulator + product.quantity * price;
        }, 0);
        setTotalPrice(subtotal);
    }, [cartProducts]);

    const isAddedToCartProducts = (id) => {
        if (cartProducts.filter((elm) => elm.id == id)[0]) {
            return true;
        }
        return false;
    };
    const addProductToCart = (product, qty, isModal = true) => {
        if (!isAddedToCartProducts(product.id)) {
            const item = {
                ...product,
                quantity: qty ? qty : 1,
            };
            setCartProducts((pre) => [...pre, item]);
            if (isModal) {
                openCartModal();
            }
        }
    };

    const updateQuantity = (id, qty) => {
        if (isAddedToCartProducts(id)) {
            let item = cartProducts.filter((elm) => elm.id == id)[0];
            let items = [...cartProducts];
            const itemIndex = items.indexOf(item);

            item.quantity = qty / 1;
            items[itemIndex] = item;
            setCartProducts(items);
        }
    };

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem("cartList"));
        if (items?.length) {
            setCartProducts(items);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("cartList", JSON.stringify(cartProducts));
    }, [cartProducts]);

    const contextElement = {
        cartProducts,
        setCartProducts,
        totalPrice,
        addProductToCart,
        isAddedToCartProducts,
        quickViewItem,
        setQuickViewItem,
        updateQuantity,
        quickViewItemId,
        setQuickViewItemId,
    };
    return (
        <dataContext.Provider value={contextElement}>
            {children}
        </dataContext.Provider>
    );
}
