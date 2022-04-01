<script>
	import { createEventDispatcher } from 'svelte';
	import Confirmation from './Confirmation.svelte';
	import { review__navi, choose__ans } from '../store.js';
	import Sidebar from './Sidebar.svelte';
	import Timer from '../components/Timer.svelte';
	const dispatch = createEventDispatcher();
	export let current__ques; //for changing current question (for next and pre)
	let sidebar__show = false;
	let confirm__show = false;
	export let question__id;
	question__id = Number(question__id);
	$: current__ques = !$review__navi ? current__ques : question__id;
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

<div>
	<div class="d-flex justify-content-between p-2 align-items-center">
		{#if !$review__navi}
			<Timer />
		{/if}
		<!-- svelte-ignore a11y-accesskey -->
		<button on:click={() => (sidebar__show = !sidebar__show)} class="btn btn-light" accesskey="l">
			List
		</button>
		<Sidebar bind:show={sidebar__show} on:displayQuesNum={displayQuesNum} />
		<!-- svelte-ignore a11y-accesskey -->
		<button
			on:click={prevPage}
			class="btn btn-light"
			accesskey="n"
			disabled={current__ques < 1 ? true : false}>Previous</button
		>
		{#if !$review__navi}
			{#if (current__ques + 1).toString().length > 1}
				<span>{current__ques + 1} of 11</span>
			{:else}
				<span>0{current__ques + 1} of 11</span>
			{/if}
		{:else if (question__id + 1).toString().length > 1}
			<span>{question__id + 1} of 11</span>
		{:else}
			<span>0{question__id + 1} of 11</span>
		{/if}
		<!-- svelte-ignore a11y-accesskey -->
		<button
			on:click={nextPage}
			class="btn btn-light"
			accesskey="n"
			disabled={current__ques + 1 > 10 ? true : false}>Next</button
		>
		<!-- svelte-ignore a11y-accesskey -->
		{#if !$review__navi}
			<button class="btn btn-light" accesskey="t" on:click={() => (confirm__show = !confirm__show)}
				>End Test</button
			>
		{:else}
			<a href="/">
				<!-- svelte-ignore a11y-accesskey -->
				<button accesskey="b" class="btn btn-light">Dashboard</button>
			</a>
			<a href="/resultPage">
				<!-- svelte-ignore a11y-accesskey -->
				<button accesskey="b" class="btn btn-light">Result</button>
			</a>
		{/if}
	</div>
</div>
<Confirmation bind:show={confirm__show} />
