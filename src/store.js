import { writable } from "svelte/store";

export const question__data=writable([])// for storing the json data 
export const choose__ans=writable([])//choose answer with bind
export const answercheckedby__user=writable([])// answer and question selected by user
export const attempt__ques=writable(0)// total attempted ques
export const review__navi=writable(false)// navigator for review page