<script context="module">
	export const load = ({ params }) => {
		const id = params.id;
		return {
			props: {
				id: id
			}
		};
	};
</script>
<script>
// @ts-nocheck

	/**
*	fileName  		:  		[id].svelte
*	Description 	: 		showing review page with selected question
*	Author   		: 		shivam singh
*	version 		: 		1.0
*	created 		: 		08-feb-2022;
*	updated by 		: 		shivam singh   shivam.singh@ucertify.com
*	updated date 	: 		24-mar2022
*/
	// @ts-nocheck
	import Header from '../../components/Header.svelte';
	import Navigator from '../../components/Navigator.svelte';
	import { question__data, review__navi, answercheckedby__user } from '../../store';
	import { onDestroy } from 'svelte';
	export let id;
	let page__no = Number(id);
	let explanationAnswer; //
	$: if (page__no + 1) {
		explanationAnswer = JSON.parse($question__data[page__no].content_text).explanation;
		let indexOfSeq = explanationAnswer.indexOf('<seq');

		while (indexOfSeq > -1) {
			let str1 = explanationAnswer.substr(indexOfSeq, 14);
			let currectAnswer = explanationAnswer.charAt(indexOfSeq + 9);
			currectAnswer = currectAnswer.toUpperCase();
			explanationAnswer = explanationAnswer.replace(str1, currectAnswer);
			indexOfSeq = explanationAnswer.indexOf('<seq');
		}
	}
	const upDateQuestionPage = (event) => {
		page__no = event.detail;
	};
	const incrementPage = () => {
		page__no = page__no + 1;
	};
	const decrementPage = () => {
		page__no = page__no - 1;
	};
	onDestroy(() => {
		review__navi.set(false);
	});
</script>

<div>
	<Header />
	<div class="container mt-4">
		{#each $question__data as quedata, i}
			{#if page__no === i}
				<div>
					<span class="h5">
						{i + 1} . {JSON.parse(quedata.content_text).question}
					</span>
					<div class="d-flex flex-column mt-4 border p-2">
						{#each JSON.parse(quedata.content_text).answers as answers, j}
							<div class="d-flex">
								{#if answers.is_correct == 1}
									<p class="h6 my-auto">{String.fromCharCode(65+j)}</p>
									<label class="w-100 m-2">
										<input type="radio" checked />
										{@html answers.answer}
									</label>
								{:else}
									<p class="h6 my-auto">{String.fromCharCode(65+j)}</p>
									<label class="w-100 m-2">
										<input type="radio" disabled />
										{@html answers.answer}
									</label>
								{/if}
							</div>
						{/each}
					</div>
				</div>
				{#each JSON.parse(quedata.content_text).answers as answersCorrect}
					{#if answersCorrect.is_correct == 1}
						<div class="bg-light mt-3">
							<p>{@html explanationAnswer}</p>
						</div>
					{/if}
				{/each}
				{#each $answercheckedby__user as user}
					{#if i + 1 == user.ques__no}
						{#if user.user__ans == '1'}
							<div class="d-flex justify-content-center">
								<h5 class="alert alert-primary">Correct</h5>
							</div>
						{:else}
							<div class="d-flex justify-content-center">
								<h5 class="alert alert-danger">Incorrect</h5>
							</div>
						{/if}
					{/if}
				{/each}
			{/if}
		{/each}
	</div>
</div>
<div class="position-fixed w-50 bg-dark text-white" style="bottom:15px; right:15px">
	<Navigator
		question__id={page__no}
		on:prevPage={decrementPage}
		on:nextPage={incrementPage}
		on:updateQues={upDateQuestionPage}
	/>
</div>
