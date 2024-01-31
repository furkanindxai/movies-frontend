import { writable } from 'svelte/store';
import { browser } from '$app/environment';
const authStateFromLocalStorage = browser && window.localStorage.getItem('authState')
const initialAuthState = authStateFromLocalStorage ? JSON.parse(authStateFromLocalStorage) : {email:'',token:'', userId:'', roles:'', isAuth: 0}

const authStore = writable(initialAuthState);
export default authStore