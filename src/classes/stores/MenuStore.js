export default class MenuStore {

	constructor() {

		this.open = false,

		this.links = [
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

		this.toggle = function() {
			this.open = !this.open
			return this
		}

	}
	
}