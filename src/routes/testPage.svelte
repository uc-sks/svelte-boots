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
	import { question__data, choose__ans, answercheckedby__user, attempt__ques } from '../store';
	import { onMount } from 'svelte';
	import Navigator from '../components/Navigator.svelte';
	let questionjson__data = [];
	let checked__opt = [];
	let current__ques = 0;
	let user__ans = [];
	let usecheck__ans;
	onMount(async () => {
		$choose__ans = checked__opt 
		const response = await fetch(`/data/question.json`);
		questionjson__data = await response.json();
		question__data.set(questionjson__data);
	});
	const getClassList = (j, i) => {
		const que = JSON.parse(questionjson__data[current__ques].content_text).question;
		const ans = JSON.parse(questionjson__data[current__ques].content_text).answers[j].is_correct;
		const id = JSON.parse(questionjson__data[current__ques].content_text).answers[j].id;
		if (user__ans.length > 0) {
			usecheck__ans = {
				ques__no: i + 1,
				user__id: id,
				user__que: que,
				user__ans: ans,
				useroptioncheck: j
			};
			for (let i = 0; i <= user__ans.length; i++) {
				if (user__ans[i].user__que == usecheck__ans.user__que) {
					user__ans[i] = usecheck__ans;
					break;
				} else {
					user__ans.push(usecheck__ans);
				}
			}
		}
		if (user__ans.length == 0) {
			user__ans.push({
				ques__no: i + 1,
				user__id: id,
				user__que: que,
				user__ans: ans,
				useroptioncheck: j
			});
		}
		let userselected = Object.values(
			user__ans.reduce((acc, cur) => Object.assign(acc, { [cur.user__que]: cur }), {})
		);
		answercheckedby__user.set(userselected);
		for (i = 0; i <= userselected.length; i++) {
			attempt__ques.update((x) => (x = userselected.length));
		}
	};
</script>

<div>
	<Header />
	<div class="container mt-4">
		{#each questionjson__data as quedata, i}
			{#if current__ques === i}
				<div>
					<span class="h5">
						{i + 1} . {JSON.parse(quedata.content_text).question}
					</span>
					<div class="d-flex flex-column mt-4 border">
						{#each JSON.parse(quedata.content_text).answers as answers, j}
							<div class="d-flex align-items-center p-2">
								<p class="my-auto h6">{String.fromCharCode(65+j)}</p>
								<label class="w-100 pointer">
									<input
										type="radio"
										class="m-2"
										value={answers.answer}
										name="radio"
										id="radio{j}"
										bind:group={checked__opt[i]}
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
		{current__ques}
		on:prevPage={() => (current__ques = current__ques - 1)}
		on:nextPage={() => (current__ques = current__ques + 1)}
		on:updateQues={(event) => {
			current__ques = event.detail;
		}}
	/>
</div>

<style>
	/* as we dont have pointer class in bootstrap 5 */
	.pointer {
		cursor: pointer !important;
	}
</style>
