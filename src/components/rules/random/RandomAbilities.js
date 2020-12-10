import AbilitiesList from 'lists/AbilitiesList.js'
import RandomRoll from 'random/RandomRoll.js'

export default (c) => {
    AbilitiesList.reset()
    c = c.updateAbilities()
    while(c.properties.xp.current) {
        const remainingAbilities = AbilitiesList.masterList.filter(r => {
            return (
				r.xp <= c.properties.xp.current) &&
				!c.abilities.some(a => a.name == r.name
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
    return c
}