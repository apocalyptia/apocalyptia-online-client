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
		// {
		// 	'name': 'Campaign',
		// 	'url': '/campaign'
		// },
		{
			'name': 'Map',
			'url': '/map'
		}
	],
    toggle() {
        this.open = !this.open
        return this
    }
})