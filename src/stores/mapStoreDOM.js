import { AreaMapDOM } from 'classes/AreaMap.js'
import { writable } from 'svelte/store'

export const mapStore = writable(new AreaMapDOM())