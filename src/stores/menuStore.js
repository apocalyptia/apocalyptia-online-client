import { writable } from 'svelte/store'

export const menuStore = writable({
	open: false,
	links: [
		{
			'name': 'Character',
			'url': '/character'
		},
		{
			'name': 'Manual',
			'url': '/manual'
		},
		{
			'name': 'Generator',
			'url': '/generator'
		},
		// {
		// 	'name': 'Map',
		// 	'url': '/map'
		// },
	],
    toggle() {
		console.log(this)
        this.open = !this.open
        return this
    }
})