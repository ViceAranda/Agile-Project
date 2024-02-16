<script lang="ts">

import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  
  // enum variables need to later match database
  enum Price {
    all = 'all',
    low = '10',
    mid = '15-20',
    high = '21+',
  }

  enum Size {
    s = 'Age 5-6',
    m = 'Age 7-8',
    l = 'Age 9-12',
    xl = 'Age 13-16',
  }

  enum Fit {
    standard = 'Standard Fit',
    slim = 'Slim Fit',
    tailed = 'Tailed Fit',
  }

  let selectedPrice: Price = Price.all;
  let selectedSize: Size = Size.s;
  let selectedFit: Fit = Fit.standard;

  $: dispatch('filterChange', { selectedPrice, selectedSize, selectedFit });

  //functions to apply filter base on selected option
  //function filterSelectedPrice etc.
</script>

<aside class="flex justify-center">
  <div class="filters-container">
    <div class="price-container py-4 border-b-2 border-solid border-black">
      <h2 class=" text-xl underline pb-3">Price</h2>
      <label>
      <input type="radio" bind:group={selectedPrice} value={Price.all} /> {'All'}
      </label> <br>
      <label>
      <input type="radio" bind:group={selectedPrice} value={Price.low} /> {'< £10'}
      </label> <br>
      <label>
      <input type="radio" bind:group={selectedPrice} value={Price.mid} /> {'£15-20'}
      </label> <br>
      <label> 
      <input type="radio" bind:group={selectedPrice} value={Price.high} /> {' £21+'}
      </label>
      <p>selected price group is {selectedPrice}</p>
    </div>

    <div class="size-container py-4 border-b-2 border-solid border-black">
      <h2 class=" text-xl underline pb-3">Size</h2>
      <label>
      <input type="radio" bind:group={selectedSize} value={Size.s} /> {Size.s}
      </label> <br>
      <label>
      <input type="radio" bind:group={selectedSize} value={Size.m} /> {Size.m}
      </label> <br>
      <label>
      <input type="radio" bind:group={selectedSize} value={Size.l} /> {Size.l}
      </label> <br>
      <label>
      <input type="radio" bind:group={selectedSize} value={Size.xl} /> {Size.xl}
      </label>
      <p>selected Size group is {selectedSize}</p>
    </div>

    <div class="fit-container py-4 border-b-2 border-solid border-black">
      <h2 class=" text-xl underline">Fit</h2>
      <label>
      <input type="radio" bind:group={selectedFit} value={Fit.standard} /> {Fit.standard}
      </label> <br>
      <label>
      <input type="radio" bind:group={selectedFit} value={Fit.slim} /> {Fit.slim}
      </label> <br>
      <label>
      <input type="radio" bind:group={selectedFit} value={Fit.tailed} /> {Fit.tailed}
      </label> <br>
      <p>selected Fit group is {selectedFit}</p>
    </div>
  </div>
</aside>
