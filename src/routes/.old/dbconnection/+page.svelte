<!-- src/App.svelte -->
<script > //lang="ts"
    export let data;
  
    let res;
  let namedata = '';
  async function xget(st) {
        const response = await fetch("/api/getserver", {
            method: 'POST',
            body: JSON.stringify({st}),
            headers: {
                'content-type': 'application/json'
            }
        
        });
  
        res =  await response.json();
        namedata = res[0];
  }
  
  
  </script>
    
    <h1>Get User Information</h1>
    <p>Click user name to see data at bottom.</p>
    {#each data.data as fname}
    <button on:click={() => xget(fname.fname)}>{fname.fname}</button>
    {/each}
    {#if namedata}
      <p>The last name of {namedata.fname} is {namedata.lname}</p>
      <p>His email address is {namedata.email}.</p>
      <p>His physical address is {namedata.address}. </p>
      <p>His region ID is {namedata.region_id}.</p>
  {/if}
    
    
    <style>
    button, p {
        padding: .5em .8em;
        margin: .5em;
        font-size: 110%;
    }
    </style>
    