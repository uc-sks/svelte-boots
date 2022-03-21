import { writable } from "svelte/store";

export const questionData=writable([])// for storing the json data 
export const chooseAns=writable([])//choose answer with bind
export const answerCheckedByUser=writable([])// answer and question selected by user
export const attemptQuestion=writable(0)// total attempted ques
export const reviewNavigator=writable(false)// navigator for review page