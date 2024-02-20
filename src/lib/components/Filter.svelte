<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  
  enum Price {
    low = '14',
    mid = '15-24',
    high = '25+',
  }

  enum Size {
    s = '1-6',
    m = '7-8',
    l = '9-12',
    xl = '13-16',
  }

  enum Fit {
    standard = 'Standard Fit',
    slim = 'Slim Fit',
    tailed = 'Tailed Fit',
  }

  let selectedPrice: any = [];
  let selectedSize: any= [];
  let selectedFit: any = [];

  $: dispatch('filterChange', { selectedPrice, selectedSize, selectedFit });
  
</script>

<aside class="flex justify-left w-full pl-[20%]">
  <div class="filters-container">
    <div class="price-container py-4 border-b-2 border-solid border-black">
      <h2 class=" text-xl underline pb-3">Price</h2>
      <label>
      <input type="checkbox" bind:group={selectedPrice} value={Price.low} /> {Price.low}
      </label> <br>
      <label>
      <input type="checkbox" bind:group={selectedPrice} value={Price.mid} /> {Price.mid}
      </label> <br>
      <label> 
      <input type="checkbox" bind:group={selectedPrice} value={Price.high} /> {Price.high} 
      </label>
    </div>

    <div class="size-container py-4 border-b-2 border-solid border-black">
      <h2 class=" text-xl underline pb-3">Size</h2>
      <label>
      <input type="checkbox" bind:group={selectedSize} value={Size.s} /> {Size.s}
      </label> <br>
      <label>
      <input type="checkbox" bind:group={selectedSize} value={Size.m} /> {Size.m}
      </label> <br>
      <label>
      <input type="checkbox" bind:group={selectedSize} value={Size.l} /> {Size.l}
      </label> <br>
      <label>
      <input type="checkbox" bind:group={selectedSize} value={Size.xl} /> {Size.xl}
      </label>
    </div>

    <div class="fit-container py-4 border-b-2 border-solid border-black mb-2">
      <h2 class=" text-xl underline mb-2">Fit</h2>
      <label>
      <input type="checkbox" bind:group={selectedFit} value={Fit.standard} /> {Fit.standard}
      </label> <br>
      <label>
      <input type="checkbox" bind:group={selectedFit} value={Fit.slim} /> {Fit.slim}
      </label> <br>
      <label>
      <input type="checkbox" bind:group={selectedFit} value={Fit.tailed} /> {Fit.tailed}
      </label> <br>
    </div>

    <div class='mt-5'>
      <button 
      class="bg-black text-white p-2 rounded-md disabled:bg-gray-300 disabled:opacity-0" 
      on:click={() => {
        selectedPrice = [];
        selectedSize = [];
        selectedFit = [];
      }}
      disabled={selectedPrice.length === 0 && selectedSize.length === 0 && selectedFit.length === 0}
      >

      Clear Filters
      </button>
    </div>

  </div>
</aside>
