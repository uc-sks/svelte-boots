<script>
	import Header from '../components/Header.svelte';
	import { questionData, chooseAns, answerCheckedByUser, attemptQuestion } from '../store';
	import { onMount } from 'svelte';
	import Navigator from '../components/Navigator.svelte';
	let questionJsonData = []; // storing json data after fetching data
	let checkedOpt = []; // for chossing the option (binding the ques with answer)
	let currentQues = 0; // for showing one question per page
	$: option = ['A', 'B', 'C', 'D']; // option array
	let userAnswer = [];
	let useCheckAns;
	// fetching json data
	onMount(async () => {
		const response = await fetch(`/data/question.json`);
		questionJsonData = await response.json();
		questionData.set(questionJsonData);
	});
	$: chooseAns.update((items) => {
		return [...checkedOpt];
	});
	const getClassList = (j, i) => {
		const que = JSON.parse(questionJsonData[currentQues].content_text).question; // for collecting the queston
		const ans = JSON.parse(questionJsonData[currentQues].content_text).answers[j].is_correct; // for collection the correct or incorrect answer(1 or 0)
		const id = JSON.parse(questionJsonData[currentQues].content_text).answers[j].id; // for collecting the answer id(choose by user when click on radio button)
		// if user selected more than one question
		if (userAnswer.length > 0) {
			useCheckAns = {
				quesNo: i + 1,
				userId: id,
				userQue: que,
				userAns: ans,
				userOptionCheck: j
			};
			// for comparing the dubliccasy of question
			for (let i = 0; i <= userAnswer.length; i++) {
				if (userAnswer[i].userQue == useCheckAns.userQue) {
					userAnswer[i] = useCheckAns;
					useCheckAns;
					break;
				} else {
					userAnswer.push(useCheckAns);
				}
			}
		}
		// if user select only one question
		if (userAnswer.length == 0) {
			userAnswer.push({
				quesNo: i + 1,
				userId: id,
				userQue: que,
				userAns: ans,
				userOptionCheck: j
			});
		}
		// if the dublicasy will be, the remove the dublicasy here
		let userSelected = Object.values(
			userAnswer.reduce((acc, cur) => Object.assign(acc, { [cur.userQue]: cur }), {})
		);
		// all attempted question goes here
		answerCheckedByUser.set(userSelected);
		for (i = 0; i <= userSelected.length; i++) {
			attemptQuestion.update((x) => (x = userSelected.length));
		}
	};
</script>

<div class="test__page">
	<Header />
	<div class="container mt-4">
		{#each questionJsonData as queData, i}
			{#if currentQues === i}
				<div class="">
					<span class="h5">
						{i + 1} . {JSON.parse(queData.content_text).question}
					</span>
					<div class="d-flex flex-column mt-4">
						{#each JSON.parse(queData.content_text).answers as answers, j}
							<div class="d-flex border ">
								<p>{option[j]}</p>
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
<div class="textPage__navigator position-fixed w-50 bottom-0 end-0 bg-dark text-white">
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
