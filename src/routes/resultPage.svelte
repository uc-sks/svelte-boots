<script>
	/**
	 *	fileName  		:  		resultPage.svelte
	 *	Description 	: 		showing result page
	 *	Author   		: 		shivam singh
	 *	version 		: 		1.0
	 *	created 		: 		08-feb-2022;
	 *	updated by 		: 		shivam singh   <shivam.singh@ucertify.com>
	 *	updated date 	: 		24-mar2022
	 */
	import {
		question__data,
		choose__ans,
		review__navi,
		answerchoosebyuser,
		actualcorrect
	} from '../store';
	import Header from '../components/Header.svelte';
	let correct = 0;
	let incorrect = 0;
	let percentage = 0;
	let answerchoosebyuser__arr = [];
	let actualcorrect__arry = [];
	$: unselected__ques=0
	$: for (let i = 0; i < $question__data.length; i++) {
		let correct__indx = 0;
		if ($choose__ans[i]) {
			for (let j = 0; j < 4; j++) {
				if (JSON.parse($question__data[i].content_text).answers[j].answer == $choose__ans[i]) {
					correct__indx = j;
				}
			}
		} else {
			correct__indx = null;
		}
		answerchoosebyuser__arr[i] = correct__indx;
		$answerchoosebyuser[i]=correct__indx
	}
	$: for (let i = 0; i < $question__data.length; i++) {
		let actualCorrect = 0;
		for (let j = 0; j < 4; j++) {
			if (JSON.parse($question__data[i].content_text).answers[j].is_correct == '1') {
				actualCorrect = j;
			}
		}
		actualcorrect__arry[i] = actualCorrect;
		$actualcorrect[i]=actualCorrect
	}
	$: for (let i = 0; i < answerchoosebyuser__arr.length; i++) {
		if (answerchoosebyuser__arr[i] != null) {
			if (answerchoosebyuser__arr[i] == actualcorrect__arry[i]) {
				correct = correct + 1;
				percentage = Math.round((correct / 11) * 100);
			} else {
				incorrect = incorrect + 1;
			}
		} else{
			unselected__ques+=1;
		}
	}
	const reviewPage = () => {
		review__navi.set(true);
	};
</script>

<div>
	<Header />
	<div class="container d-flex justify-content-center mt-4 flex-column align-items-center">
		<div class="d-flex" style="width: 800px;">
			<div
				class="d-flex flex-column align-items-center btn  bg-opacity-25 border rounded w-50"
				style="background-color: #e3e3e3!important;border-color: #bababa!important"
			>
				<p style="color: indigo">{percentage} %</p>
				<h6>Result</h6>
			</div>
			<div
				class="d-flex flex-column align-items-center btn border rounded w-50  ms-3"
				style="border-color:#5f96bf!important;"
			>
				<p class="text-primary">11</p>
				<h6>Total item</h6>
			</div>
			<div
				class="d-flex flex-column align-items-center btn border rounded w-50 ms-3"
				style="border-color: #5f96bf!important;"
			>
				<p class="text-success">{correct}</p>
				<h6>Correct</h6>
			</div>
			<div
				class="d-flex flex-column align-items-center btn border rounded w-50 ms-3"
				style="border-color: #5f96bf!important;"
			>
				<p class="text-danger">{incorrect}</p>
				<h6>Incorrect</h6>
			</div>
			<div
				class="d-flex flex-column align-items-center btn border rounded w-50 ms-3"
				style="border-color: #5f96bf!important;"
			>
				<p class="text-warning">{unselected__ques}</p>
				<h6>Unattempted</h6>
			</div>
		</div>
		<table class="table table-striped table-hover">
			<thead>
				<tr>
					<th scope="col">No.</th>
					<th scope="col">Question</th>
					<th scope="col">Option</th>
					<th scope="col">Result</th>
				</tr>
			</thead>
			<tbody>
				{#each $question__data as ques, i}
					<tr>
						<th scope="row">{i + 1}</th>
						<td>
							<a
								on:click={reviewPage}
								href={`review/${i}`}
								class="w-100 text-decoration-none text-dark"
							>
								{ques.snippet}
							</a>
						</td>
						<td class="d-flex">
							{#each JSON.parse(ques.content_text).answers as _, j}
								<p
									class="{`${
										actualcorrect__arry[i] == j ? 'bg-success' : ''
									}`}   border d-flex justify-content-center align-items-center ms-2  text-dark rounded"
									class:selected={actualcorrect__arry[i] != answerchoosebyuser__arr[i] &&
									answerchoosebyuser__arr[i] == j
										? true
										: false}
									style="width: 24px; height:24px"
								>
									{String.fromCharCode(65 + j)}
								</p>
							{/each}
						</td>
						<td>
							{#if answerchoosebyuser__arr[i] == actualcorrect__arry[i]}
								<span>Correct</span>
							{:else if answerchoosebyuser__arr[i] == null}
								<span>Unattempted</span>
							{:else}
								<span>Incorrect</span>
							{/if}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<style>
	.selected {
		background-color: red;
	}
</style>
