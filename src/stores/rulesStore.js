
// import getRules from '/src/utils/api/getRules.js'
import { writable } from 'svelte/store'
import Rules from '/src/rules/Rules.js'

class RulesStore {

	constructor() {
		this.list = Rules
	}

	// defineUndefined(
	// 	chapter='',
	// 	section='',
	// 	item='',
	// 	key=''
	// ) {
	// 	if (
	// 		chapter &&
	// 		this.list[chapter] === undefined
	// 	) {
	// 		this.list[chapter] = {}
	// 	}
	// 	else if (
	// 		chapter && section &&
	// 		this.list[chapter][section] === undefined
	// 	) {
	// 		this.list[chapter] = {}
	// 		this.list[chapter][section] = {}
	// 	}
	// 	else if (
	// 		chapter && section && item &&
	// 		this.list[chapter][section][item] === undefined
	// 	) {
	// 		this.list[chapter] = {}
	// 		this.list[chapter][section] = {}
	// 		this.list[chapter][section][item] = {}
	// 	}
	// 	else if (
	// 		chapter && section && item && key &&
	// 		this.list[chapter][section][item][key] === undefined
	// 	) {
	// 		this.list[chapter] = {}
	// 		this.list[chapter][section] = {}
	// 		this.list[chapter][section][item] = {}
	// 		this.list[chapter][section][item][key] = {}
	// 	}
	// }

	// async load(
	// 	chapter='',
	// 	section='',
	// 	item='',
	// 	key=''
	// ) {
	// 	try {
	// 		let rulesPromise = null
	// 		if (
	// 			chapter && section && item && key &&
	// 			this.list[chapter][section][item][key] === undefined
	// 		) {
	// 			this.defineUndefined(chapter, section, item, key)
	// 			rulesPromise = await getRules(chapter, section, item, key).then(res => {
	// 				this.list[chapter][section][item][key] = res
	// 			})
	// 		}
	// 		else if (
	// 			chapter && section && item &&
	// 			this.list[chapter][section][item] === undefined
	// 		) {
	// 			this.defineUndefined(chapter, section, item)
	// 			rulesPromise = await getRules(chapter, section, item).then(res => {
	// 				this.list[chapter][section][item] = res
	// 			})
	// 		}
	// 		else if (
	// 			chapter && section &&
	// 			this.list[chapter][section] === undefined
	// 		) {
	// 			this.defineUndefined(chapter, section)
	// 			rulesPromise = await getRules(chapter, section).then(res => {
	// 				this.list[chapter][section] = res
	// 			})
	// 		}
	// 		else if (chapter && this.list[chapter] === undefined) {
	// 			this.defineUndefined(chapter)
	// 			rulesPromise = await getRules(chapter).then(res => {
	// 				this.list[chapter] = res
	// 			})
	// 		}
	// 		else if (this.list === undefined) {
	// 			rulesPromise = await getRules().then(res => {
	// 				this.list = res
	// 			})
	// 		}
	// 		return rulesPromise
	// 	} catch(err) {
	// 		console.log(err)
	// 		throw err
	// 	}
	// }

}

const rulesStore = new RulesStore()

export default writable(rulesStore)