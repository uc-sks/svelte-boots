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

	import Header from '../../components/Header.svelte';
	import Navigator from '../../components/Navigator.svelte';
	import { questionData, reviewNavigator,answerCheckedByUser } from '../../store';
	$: option = ['A', 'B', 'C', 'D'];
	import { onDestroy } from 'svelte';
	export let id;
	let pageNo = Number(id); // change id(string) to id(number) page no. means storing 1to11
	let explanationAnswer; //
	// replacing the seq string to only one character(A or ,B or, C or, D )
	$: if (pageNo + 1) {
		explanationAnswer = JSON.parse($questionData[pageNo].content_text).explanation;
		let indexOfSeq = explanationAnswer.indexOf('<seq');
		
		while (indexOfSeq > -1) {
			let str1 = explanationAnswer.substr(indexOfSeq, 14);
			let currectAnswer = explanationAnswer.charAt(indexOfSeq + 9);
			currectAnswer = currectAnswer.toUpperCase();
			explanationAnswer = explanationAnswer.replace(str1, currectAnswer);
			indexOfSeq = explanationAnswer.indexOf('<seq');
		}
	}

	// updating the question from sidebar list question
	const upDateQuestionPage = (event) => {
		pageNo = event.detail;
	};
	// for next button
	const incrementPage = () => {
		pageNo = pageNo + 1;
	};
	// for previous button
	const decrementPage = () => {
		pageNo = pageNo - 1;
	};
	onDestroy(() => {
		reviewNavigator.set(false);
	});
</script>

<div class="test__page">
	<Header />
	<div class="container mt-4">
		{#each $questionData as queData, i}
			{#if pageNo === i}
				<div class="">
					<span class=" h5">
						{i + 1} . {JSON.parse(queData.content_text).question}
					</span>
					<div class="d-flex flex-column mt-4">
						{#each JSON.parse(queData.content_text).answers as answers, j}
							<div class="d-flex border ">
								{#if answers.is_correct == 1}
									<p>{option[j]}</p>
									<label class="w-100 pointer">
										<input type="radio" class="m-2" checked  />
										{@html answers.answer}
									</label>
								{:else}
									<p>{option[j]}</p>
									<label class="w-100 pointer">
										<input type="radio" class="m-2" disabled />
										{@html answers.answer}
									</label>
								{/if}
							</div>
						{/each}
					</div>
				</div>
				{#each JSON.parse(queData.content_text).answers as answersCorrect}
					{#if answersCorrect.is_correct == 1}
						<div class="explanation bg-light mt-3">
							<p>{@html explanationAnswer}</p>
						</div>
					{/if}
				{/each}
				{#each $answerCheckedByUser as user}
						{#if i + 1 == user.quesNo}
							{#if user.userAns == '1'}
								<div class="comparationResult d-flex justify-content-center">
									<h5 class="alert alert-primary">Correct</h5>
								</div>
							{:else}
								<div class="comparationResult  d-flex justify-content-center">
									<h5 class="alert alert-danger">Incorrect</h5>
								</div>
							{/if}
						{/if}
					{/each}
			{/if}
		{/each}
	</div>
</div>
<div class="textPage__navigator position-fixed w-50 bottom-0 end-0 bg-dark text-white">
	<Navigator
		questionId={pageNo}
		on:prevPage={decrementPage}
		on:nextPage={incrementPage}
		on:updateQues={upDateQuestionPage}
	/>
</div>

<style>
	/* as we dont have pointer class in bootstrap 5 */
	.pointer {
		cursor: pointer !important;
	}
</style>
