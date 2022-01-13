import { writable } from 'svelte/store'
import MenuStore from '../classes/stores/MenuStore.js'

const menu = new MenuStore()

export default writable(menu)