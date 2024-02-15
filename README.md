# Wiki:

## API Development

In SvelteKit, we have at least 2 ways to connect to the server:

1. Via API endpoints
2. Using Form actions

In general, we'll be using API endpoints to **get** data from the server. If we want to **submit** data to the browser, we'll prefer to use Form actions.

&nbsp;

### API Endpoints:

We must complete the following steps to develop a new API endpoint:

1. **Choose a logical endpoint:** For example, if we want to get product data, we can create the following path inside the `routes` folder: `routes/api/products/`.
2. **Create a `+server.ts` file:** This is where the endpoint logic will live. We should create the file as: `routes/api/products/+server.ts`.
3. **Write an HTTP method function:** Inside our new file, we'll create and export every HTTP method associated with the route where our file lives:

```TypeScript
// +server.ts
import { json } from '@sveltejs/kit';

export async function GET(params) {
    try {
        let result;
        // Write your logic here
        // ...

        // Wrap your response as JSON and choose a proper status code
        return json( JSON.stringify(result), { status: 200 } );
    } catch (error) {
        // Deal with errors here

        // Log error for developers
        console.error(error);
        // Show censored error to users
        // (do not share information about error's nature if users don't need it)
        return json({ message: 'Server side error' }, { status: 500 } );
    }
}
```

The key takeaways here are:
- Function names must correspond to known HTTP methods such as `GET`, `POST`, `PUT`, `DELETE`, etc...
- You must export such functions in order to use them.
- Wrap your responses with the `json` function from `@sveltejs/kit`.

4. **Call your new endpoints from the Front End:**

```HTML
<!-- routes/products/+page.svelte -->
<script>

    let products: Product[];
    async function getProducts() {
        const response: Product[] | Error = await fetch('/api/products')
            .then((res) => res.json())
            .catch((err) => err);
        if (response instanceof Error) alert(response)
        else products = response;
    }
</script>
```

The parameters our endpoint methods receive depend upon the method itself.
For instance, the `GET` method has access to the `url` object:

```TypeScript
export async function GET({ url }) { ... }
```

While the `POST` method has access to the `request` object:

```TypeScript
export async function POST({ request }) { ... }
```

&nbsp;

### Form Actions:
Usually, we'll submit data to the server using HTML `form`'s. If that's the case, we should prefer to use Form actions instead of API calls as it allows the application to work even if JavaScript is disabled by the user.

In this case, we have a different course of action:
1. Create a `+page.server.ts` file along with the `+page.svelte` that has the correspondent `form`.
2. Inside `+page.server.ts` file, we'll create the desired form actions:

```TypeScript
// routes/products/[id]/+page.server.ts
export const actions = {
    addToCart:  async (event) => {...},
    addReview:  async (event) => {...},
    buyProduct: async (event) => {...},
}
```
3. Inside the `+page.svelte` file, implement the desired actions in your `form`s as:
```HTML
<!-- routes/products/[id]/+page.svelte -->
<form method="POST" action="?/buyProduct" >
    ...
</form>
```

If you have a form with multiple actions inside (e.g.: the same form for adding a product to a cart and for creating and order), you can omit the `action` attribute and add the `formaction` attribute to the different buttons:

```HTML
<!-- routes/products/[id]/+page.svelte -->
<form method="POST" >
    ...
    <button formaction="?/addToCart">Add to Cart</button>
    <button formaction="?/buyProduct">Buy</button>
</form>
```

If you want to access form actions from another part of the application, you can write the full path to such action:

```HTML
<!-- routes/products/+page.svelte -->
<form method="POST" action="/{product.id}?/buyProduct" >
    ...
</form>
```
