import { writable } from 'svelte/store'
// import getManual from '../utils/api/getManual.js'

class ManualStore {
	constructor() {
		this.loading = true
		this.list = []
		this.getList = async _ => {
			await fetch(`http://localhost:12345/lists/manual`)
				.then(res => res.json())
				.then(res => {
					this.loading = false
					manual.list = [ ...res.list ]
					console.log(manualStore.list)
				})
				.catch(err => console.log(err))
		}
	}
}

export default writable(new ManualStore())