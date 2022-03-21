import { writable } from "svelte/store";

export const questionData=writable([])// for storing the json data 
export const chooseAns=writable([])
export const answerCheckedByUser=writable([])
export const attemptQuestion=writable(0)
export const reviewNavigator=writable(false)