<p class="m-0">
    {#if minutes.toString().length > 1}
        <span>{minutes}:</span>
    {:else}
        <span>0{minutes}:</span>
    {/if}
    {#if seconds.toString().length > 1}
        <span>{seconds}</span>
    {:else}
        <span>0{seconds}</span>
    {/if}
</p>