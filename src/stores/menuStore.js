import { writable } from 'svelte/store'

export default writable({
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
			'name': 'Roller',
			'url': '/roller'
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