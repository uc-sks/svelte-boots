<script>
// @ts-nocheck

	/**
	 *	fileName  		:  		testPage.svelte
	 *	Description 	: 		showing test page with question answer and navigator data
	 *	Author   		: 		shivam singh
	 *	version 		: 		1.0
	 *	created 		: 		08-feb-2022;
	 *	updated by 		: 		shivam singh   shivam.singh@ucertify.com
	 *	updated date 	: 		24-mar2022
	 */
	import Header from '../components/Header.svelte';
	import { questionData, chooseAns, answerCheckedByUser, attemptQuestion } from '../store';
	import { onMount } from 'svelte';
	import Navigator from '../components/Navigator.svelte';
	let questionJsonData = [];
	let checkedOpt = [];
	let currentQues = 0;
	let userAnswer = [];
	let useCheckAns;
	onMount(async () => {
		const response = await fetch(`/data/question.json`);
		questionJsonData = await response.json();
		questionData.set(questionJsonData);
	});
	$: chooseAns.update((items) => {
		return [...checkedOpt];
	});
	const getClassList = (j, i) => {
		const que = JSON.parse(questionJsonData[currentQues].content_text).question;
		const ans = JSON.parse(questionJsonData[currentQues].content_text).answers[j].is_correct;
		const id = JSON.parse(questionJsonData[currentQues].content_text).answers[j].id;
		if (userAnswer.length > 0) {
			useCheckAns = {
				quesNo: i + 1,
				userId: id,
				userQue: que,
				userAns: ans,
				userOptionCheck: j
			};
			for (let i = 0; i <= userAnswer.length; i++) {
				if (userAnswer[i].userQue == useCheckAns.userQue) {
					userAnswer[i] = useCheckAns;
					break;
				} else {
					userAnswer.push(useCheckAns);
				}
			}
		}
		if (userAnswer.length == 0) {
			userAnswer.push({
				quesNo: i + 1,
				userId: id,
				userQue: que,
				userAns: ans,
				userOptionCheck: j
			});
		}
		let userSelected = Object.values(
			userAnswer.reduce((acc, cur) => Object.assign(acc, { [cur.userQue]: cur }), {})
		);
		answerCheckedByUser.set(userSelected);
		for (i = 0; i <= userSelected.length; i++) {
			attemptQuestion.update((x) => (x = userSelected.length));
		}
	};
</script>

<div>
	<Header />
	<div class="container mt-4">
		{#each questionJsonData as queData, i}
			{#if currentQues === i}
				<div>
					<span class="h5">
						{i + 1} . {JSON.parse(queData.content_text).question}
					</span>
					<div class="d-flex flex-column mt-4 border">
						{#each JSON.parse(queData.content_text).answers as answers, j}
							<div class="d-flex align-items-center p-2">
								<p class="my-auto h6">{String.fromCharCode(65+j)}</p>
								<label class="w-100 pointer">
									<input
										type="radio"
										class="m-2"
										value={answers.answer}
										name="radio"
										id="radio{j}"
										bind:group={checkedOpt[i]}
										on:click={() => getClassList(j, i)}
									/>
									{@html answers.answer}
								</label>
							</div>
						{/each}
					</div>
				</div>
			{/if}
		{/each}
	</div>
</div>
<div
	class="position-fixed w-50  bg-dark text-white"
	style="bottom:15px;right:15px"
>
	<Navigator
		{currentQues}
		on:prevPage={() => (currentQues = currentQues - 1)}
		on:nextPage={() => (currentQues = currentQues + 1)}
		on:updateQues={(event) => {
			currentQues = event.detail;
		}}
	/>
</div>

<style>
	/* as we dont have pointer class in bootstrap 5 */
	.pointer {
		cursor: pointer !important;
	}
</style>
