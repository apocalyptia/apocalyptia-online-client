import { writable } from 'svelte/store'

const menu = {
	open: false,
	links: [
		{
			name: 'Character',
			url: '/character',
		},
		{
			name: 'Manual',
			url: '/manual',
		},
		{
			name: 'Roller',
			url: '/roller',
		},
		// {
		// 	'name': 'Campaign',
		// 	'url': '/campaign'
		// },
		{
			name: 'Map Test',
			url: '/map'
		},
		{
			name: 'Skybox Test',
			url: '/skybox'
		}
	],
	toggle() {
		this.open = !this.open
		return this
	},
}

export default writable(menu)
