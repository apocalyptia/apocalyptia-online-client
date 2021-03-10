import AbilitiesList from 'rules/lists/abilities/AbilitiesList.js'
import RandomRoll from 'rules/random/RandomRoll.js'

export default (c) => {
    AbilitiesList.reset()
    c.updateAbilities(c)
    while (c.properties.experience.current > 0) {
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
            c.updateAbilities(c)
        }
        else break
    }
    return c
}