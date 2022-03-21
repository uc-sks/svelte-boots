<script>
	import { createEventDispatcher } from 'svelte';
	import Confirmation from './confirmation.svelte';
	import { reviewNavigator, chooseAns } from '../store.js';
	import Sidebar from './Sidebar.svelte';
	import Timer from '../components/Timer.svelte';
	const dispatch = createEventDispatcher();
	export let currentQues; //for changing current question (for next and pre)
	let sidebar_show = false;
	let confirm_show = false;
	export let questionId;
	questionId = Number(questionId);
	// previous page function
	const prevPage = () => {
		dispatch('prevPage');
	};
	// next page function
	const nextPage = () => {
		dispatch('nextPage');
	};
	//  update question click on sidebar
	const displayQuesNum = (event) => {
		dispatch('updateQues', event.detail);
	};
</script>

<div class="navigator">
	<div class="navigator__option d-flex justify-content-between p-2 align-items-center">
		{#if !$reviewNavigator}
			<Timer />
		{/if}
		<!-- svelte-ignore a11y-accesskey -->
		<button on:click={() => (sidebar_show = !sidebar_show)} class="btn btn-light" accesskey="l">
			List
		</button>
		<Sidebar bind:show={sidebar_show} on:displayQuesNum={displayQuesNum} />
		<!-- svelte-ignore a11y-accesskey -->
		{#if !$reviewNavigator}
		<button
		on:click={prevPage}
		class="btn btn-light"
		accesskey="v"
		disabled={currentQues < 1 ? true : false}>Previous</button
	>
		{:else}
		<button
		on:click={prevPage}
		class="btn btn-light"
		accesskey="v"
		disabled={questionId < 1 ? true : false}>Previous</button
	>
		{/if}
		{#if !$reviewNavigator}
			<span>{currentQues + 1} of 11</span>
		{:else}
			<span>{questionId + 1} of 11</span>
		{/if}
		<!-- svelte-ignore a11y-accesskey -->
		{#if !$reviewNavigator}
			<button
				on:click={nextPage}
				class="btn btn-light"
				accesskey="n"
				disabled={currentQues + 1 > 10 ? true : false}>Next</button
			>
		{:else}
			<button
				on:click={nextPage}
				class="btn btn-light"
				accesskey="n"
				disabled={questionId + 1 > 10 ? true : false}>Next</button
			>
		{/if}

		<!-- svelte-ignore a11y-accesskey -->
		{#if !$reviewNavigator}
			<button class="btn btn-light" accesskey="t" on:click={() => (confirm_show = !confirm_show)}
				>End Test</button
			>
		{:else}
			<a href="/">
				<!-- svelte-ignore a11y-accesskey -->
				<button accesskey="b" class="btn btn-light">Dashboard</button>
			</a>
		{/if}
	</div>
</div>
<Confirmation bind:show={confirm_show} />
