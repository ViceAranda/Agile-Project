// src/lib/cartStore.ts
import { writable } from 'svelte/store';

export const cartItems = writable([
    { id: 1, name: 'Item 1', quantity: 2 },
    { id: 2, name: 'Item 2', quantity: 3 }
]);


