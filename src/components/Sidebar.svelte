<script>
	import { fly } from 'svelte/transition';
	import { question__data, choose__ans } from '../store';
	import { clickOutside } from '../function/clickOutside';
	import { createEventDispatcher } from 'svelte';
	import { truncate } from '../function/truncate';
	import { afterUpdate } from 'svelte';
	const dispatch = createEventDispatcher();
	export let show = false;
	let total__attempted = 0;
	afterUpdate(() => {
		let data = $choose__ans.filter(Boolean);
		total__attempted = data.length;
	});
	const displayQues = (i) => {
		dispatch('displayQuesNum', i);
	};
	const handleClickOutside = () => {
		show = false;
	};
</script>

{#if show}
	<div
		use:clickOutside
		on:click_outside={handleClickOutside}
		class="list position-fixed  start-0 h-100 bg-white text-dark border d-flex flex-column p-2"
		style="width:250px;top:58px"
		transition:fly={{ x: -250, opacity: 1 }}
	>
		<p class="mb-1 border p-1">Attempte question:{total__attempted}</p>
		<p class="border p-1">Unuttempted Question:{$question__data.length - total__attempted}</p>
		<hr />
		{#each $question__data as data, i}
			<!-- svelte-ignore a11y-accesskey -->
			<span
				class="border mt-2 p-1"
				style="cursor: pointer;"
				on:click={() => displayQues(i)}
				on:click={() => (show = false)}
				accesskey={`${i + 1}`}
			>
				<span class="text-black fw-bold ">Ques {i + 1}.</span>
				<span>{truncate(`${JSON.parse(data.content_text).question}`)}</span>
			</span>
		{/each}
	</div>
{/if}
