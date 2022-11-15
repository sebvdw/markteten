import { writable } from "svelte/store";

export const token = writable(localStorage.token
    ? localStorage.getItem('token') : null);