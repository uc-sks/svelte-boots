<script>
    import { fly } from 'svelte/transition';
    import {questionData,attemptQuestion} from '../store'
    import { createEventDispatcher } from 'svelte';
    const dispatch =createEventDispatcher()
    export let show = false;
    function truncate(input) {
		if (input.length > 12) {
			return input.substring(0, 12) + '...';
		}
		return input;
	}
    const displayQues = (i) => {
		dispatch('displayQuesNum', i);
	};
</script>

{#if show}
	<div on:click={()=>show=false} class="list position-fixed  start-0 h-100 bg-white text-dark border d-flex flex-column p-2" style="width:210px;top:70px" transition:fly={{ x: -250, opacity: 1 }}>
		<p class=" mb-1">Attempte question:{$attemptQuestion} </p>
		<p class="">Unuttempted Question:{$questionData.length-$attemptQuestion} </p>
		{#each $questionData as data, i}
			<!-- svelte-ignore a11y-accesskey -->
			<span class="para" style="cursor: pointer;" on:click={() => displayQues(i)} accesskey={`${i + 1}`}>
				<span class="text-black fw-bold">Ques {i + 1}.</span> <span>{truncate(`${JSON.parse(data.content_text).question}`)}</span>
			</span>
		{/each}
	</div>
{/if}