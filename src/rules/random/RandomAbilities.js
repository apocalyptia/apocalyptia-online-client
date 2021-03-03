import AbilitiesList from 'rules/lists/abilities/AbilitiesList.js'
import RandomRoll from 'rules/random/RandomRoll.js'

export default (c) => {
	console.log('Random Abilities')
	console.log(AbilitiesList.masterList.filter(a => a.taken))
    AbilitiesList.reset()
    c = c.updateAbilities()
    while (c.properties.experience.current) {
		console.log(c.properties.experience.current)
		console.log(c.abilities)
        const remainingAbilities = AbilitiesList.masterList.filter(r => {
            return (
				r.experience <= c.properties.experience.current &&
				!c.abilities.some(a => a.name == r.name)
			)
        })
        if (remainingAbilities.length) {
            const a = RandomRoll(remainingAbilities)
            a.taken++
            c.abilities.push(a)
            c = c.updateAbilities()
        }
        else break
    }
	console.log(c.properties.experience.current)
	console.log(c.abilities)
    return c
}