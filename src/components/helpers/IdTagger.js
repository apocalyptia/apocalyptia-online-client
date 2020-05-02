import Ability from '../classes/Ability'


const IdTagger = (list) => {
	let id = 0
	const newList = []
	for (let i = 0; i < list.length; ++i) {
		if (list[i].opts[0]) {
			for (let o = 0; o < list[i].opts.length; ++o) {
				const newAbility = new Ability({
					name: list[i].name,
					desc: list[i].desc,
					max: list[i].max,
					xp: list[i].xp,
					taken: list[i].taken,
					opts: [
						list[i].opts[o],
					],
					selection: o
				})
				newList.push(newAbility)
			}
		} else {
			const newAbility = new Ability({
				name: list[i].name,
				desc: list[i].desc,
				max: list[i].max,
				xp: list[i].xp,
				taken: list[i].taken
			})
			newList.push(newAbility)
		}
	}
	for (let a = 0; a < newList.length; ++a) {
		newList[a].id = id
		id++
	}
	return newList
}

export default IdTagger