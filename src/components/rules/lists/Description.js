import Age from 'description/Age.js'
import Hair from 'description/Hair.js'
import Height from 'description/Height.js'
import Identity from 'description/Identity.js'
import Player from 'description/Player.js'
import Sex from 'description/Sex.js'
import Skin from 'description/Skin.js'
import Weight from 'description/Weight.js'

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
		Age.random(c)
		Sex.random(c)
		Height.random(c)
		Weight.random(c)
		Skin.random(c)
		Hair.random(c)
		Identity.random(c)
		return c
	},
	reset: function(c){
		Object.keys(c.desc).forEach((d) => {
			c.desc[d].value = ``
		})
		return c
	}
}