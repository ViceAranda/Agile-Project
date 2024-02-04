<!-- integrated HeroBanner by Svelte Splide https://splidejs.com/integration/svelte-splide/ -->
<script lang="ts">
    import { Splide, SplideSlide } from '@splidejs/svelte-splide';
    // default theme
    import '@splidejs/svelte-splide/css';
</script>
<Splide
  options={ {
    rewind: true,
    rewindByDrag: true,
    width: '80%',
  } }
>
    <SplideSlide>
        <img src="image 1.png" alt="students in uniform" />
    </SplideSlide>
    <SplideSlide>
        <img src="image 1.png" alt="students in uniform" />
    </SplideSlide>
    <SplideSlide>
        <img src="image 1.png" alt="students in uniform" />
    </SplideSlide>
</Splide>
