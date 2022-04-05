import { writable } from "svelte/store";

export const question__data=writable([])// for storing the json data 
export const choose__ans=writable([])//choose answer with bind
export const review__navi=writable(false)// navigator for review page
export const answerchoosebyuser = writable([])// collection the index of option check by user (a,b,c,d)
export const actualcorrect=writable([])// collecting the index of actual correct option from json data