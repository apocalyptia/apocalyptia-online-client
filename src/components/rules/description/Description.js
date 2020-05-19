import Age from './Age'
import Hair from './Hair'
import Height from './Height'
import Identity from './Identity'
import Player from './Player'
import Sex from './Sex'
import Skin from './Skin'
import Weight from './Weight'


export default {
	name: `Description`,
	list: [
		Player,
		Identity,
		Age,
		Sex,
		Height,
		Weight,
		Skin,
		Hair,
	],
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