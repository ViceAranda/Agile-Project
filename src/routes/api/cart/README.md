# Usage:

## Get Cart:

Use the `GET` method as:

```TS
const response = await fetch("/api/cart?user_id=1", { method: "GET" });
```

## Add item to cart:

Either if you want to update the quantity of an item in the cart or add another one, use the same method:

```TS

const body = { cartId: 2, productId: 11, qty: 1 };

const response = await fetch("/api/cart", { method "PUT", body: JSON.stringify(body) });
```

## Remove items:

To delete items from the cart, use the `DELETE` method:

```TS

const body = { cartId: 2, productId: 11 };

const response = await fetch("/api/cart", { method "DELETE", body: JSON.stringify(body) });
```
