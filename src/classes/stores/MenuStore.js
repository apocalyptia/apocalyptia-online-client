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
			{
				name: 'Map Tests',
				url: '/maps'
			},
		],

		this.toggle = function() {
			this.open = !this.open
			return this
		}

	}
	
}