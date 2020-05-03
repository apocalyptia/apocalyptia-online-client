import DescriptionList from './description/lists/DescriptionList'


export default {
	name: `desc:`,
	list: DescriptionList,
	random: function(c){
		for (let i = 1; i < this.list.length; i++) {
			this.list[i].random(c)
		}
		return c
	},
	reset: function(c){
		Object.keys(c.desc).forEach((d) => {
			c.desc[d].value = ``
		})
		return c
	}
}