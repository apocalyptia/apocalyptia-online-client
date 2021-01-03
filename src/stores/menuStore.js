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
		{
			'name': 'Campaign',
			'url': '/campaign'
		}
	],
    toggle() {
        this.open = !this.open
        return this
    }
})