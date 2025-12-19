"use client";

import { useCartContextElement } from "@/context/CartContext";

export default function CartLength() {
  const { cartProducts } = useCartContextElement();
  return <>{cartProducts.length}</>;
}
