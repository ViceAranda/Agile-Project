// src/lib/cartStore.ts
import { writable } from 'svelte/store';

export const cartItems = writable([
    { id: 1, 
        name: 'Item 1', 
        quantity: 2, 
        price: 9.99, 
        size: 'M',
        image: '../../../../static/image 1.png' 
    },
    { id: 2, 
        name: 'Item 2', 
        quantity: 3, 
        price: 12.99, 
        size: 'L',
        image: '../../../../static/image 1.png' 
    },
    { id: 2, 
        name: 'Item 2', 
        quantity: 3, 
        price: 12.99, 
        size: 'L',
        image: '../../../../static/image 1.png' 
    },
]);


