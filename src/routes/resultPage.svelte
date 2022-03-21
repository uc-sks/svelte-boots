<script>
	import { questionData, chooseAns, answerCheckedByUser,attemptQuestion,reviewNavigator } from '../store';
	import Header from '../components/Header.svelte';
	import { truncate } from '../function/truncate';
	$: option = ['A', 'B', 'C', 'D'];
    let correct=0
    let incorrect=0
    let percentage=0
	let answerChoosebyUserArr = []; // collecting the answwer selected by user
	let actualCorrectArray = []; //collecting the correct answer of question (in json)
	let unselectedQues=[]
	$: for (let i = 0; i < $questionData.length; i++) {
		let correctIndex = 0;
		if ($chooseAns[i]) {
			for (let j = 0; j < 4; j++) {
				if (JSON.parse($questionData[i].content_text).answers[j].answer == $chooseAns[i]) {
					correctIndex = j;
				}
			}
		} else {
			correctIndex = null;
			unselectedQues[i]=i+1
			console.log('heoodjjde',unselectedQues)
		}
		answerChoosebyUserArr[i] = correctIndex;
	}
	$: for (let i = 0; i < $questionData.length; i++) {
		let actualCorrect = 0;
		for (let j = 0; j < 4; j++) {
			if (JSON.parse($questionData[i].content_text).answers[j].is_correct == '1') {
				actualCorrect = j;
			}
		}
		actualCorrectArray[i] = actualCorrect;
	}
    $answerCheckedByUser.sort(function (a, b) {
			return a.quesNo - b.quesNo;
		});
		for (let i = 0; i < $answerCheckedByUser.length; i++) {
			if ($answerCheckedByUser[i].userAns == 1) {
				correct = correct + 1;
				percentage = Math.round((correct / 11) * 100);
			} else {
				incorrect = incorrect + 1;
			}
		}
    console.log('choose ans',$chooseAns)
	const reviewPage = () => {
		reviewNavigator.set(true);
	};
</script>

<div class="result__page">
	<Header />
	<div class="container d-flex justify-content-center mt-4 flex-column align-items-center">
		<div class="d-flex" style="width: 800px;">
			<div
				class="d-flex flex-column align-items-center  btn  bg-opacity-25 border rounded w-50"
				style="background-color: #e3e3e3!important;border-color: #bababa!important"
			>
				<p style="color: indigo">{percentage} %</p>
				<h6>Result</h6>
			</div>
			<div
				class="d-flex flex-column align-items-center btn border rounded w-50 ms-3"
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
				<p class="text-warning">{11 - $answerCheckedByUser.length}</p>
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
				{#each $questionData as ques, i}
					<tr>
						<th scope="row">{i + 1}</th>
						<td>
                            <a  on:click={reviewPage} href={`review/${i}`} class="w-100 text-decoration-none text-dark">
                                {truncate(`${JSON.parse(ques.content_text).question}`)}
                            </a>
                        </td>
						<td class="d-flex">
							{#each option as op, j}
								<p
									class="{`${
										actualCorrectArray[i] == j ? 'bg-success' : ''
									}`}   border d-flex justify-content-center align-items-center ms-2  text-dark rounded"
									class:selected={actualCorrectArray[i] != answerChoosebyUserArr[i] &&
									answerChoosebyUserArr[i] == j
										? true
										: false}
									style="width: 24px; height:24px"
								>
									{op}
								</p>
							{/each}
						</td>

						<td>
							{#each $answerCheckedByUser as selectQue}
								{#if i + 1 == selectQue.quesNo}
									{#if selectQue.userAns == 0}
										InCorrect
									{:else}
										correct
									{/if}
								{/if}
							{/each}
							{#each unselectedQues as un}
								{#if i + 1 == un}
									Unattempted
								{/if}
							{/each}
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
