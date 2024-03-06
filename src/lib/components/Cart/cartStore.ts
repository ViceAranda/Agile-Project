// src/lib/cartStore.ts
import { writable } from 'svelte/store';

export const cartItems = writable([
    { id: 1, 
        name: 'Jumper', 
        quantity: 2, 
        price: 9.99, 
        size: 'M',
        image: '../../../../static/image 1.png' 
    },
    { id: 2, 
        name: 'T-Shirt', 
        quantity: 3, 
        price: 12.99, 
        size: 'L',
        image: '../../../../static/image 1.png' 
    },
    { id: 3, 
        name: 'Socks', 
        quantity: 6, 
        price: 10.45, 
        size: 'L',
        image: '../../../../static/image 1.png' 
    },

    { id: 4, 
        name: 'Hat', 
        quantity: 1, 
        price: 10.45, 
        size: 'L',
        image: '../../../../static/image 1.png' 
    },
]);


