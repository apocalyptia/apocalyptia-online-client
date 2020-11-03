import AbilitiesList from 'lists/AbilitiesList.js'
import RandomRoll from 'random/RandomRoll.js'

export default (c) => {
    c = c.resetAbilities()
    c = c.calculateRemainingXP()
    while(c.properties.experience.current) {
        const remainingAbilities = AbilitiesList.list.filter(m => {
            return (m.xp <= c.properties.experience.current) && !c.abilities.includes(m)
        })
        console.log(`Random = ${c.abilities}`)
        if (remainingAbilities.length) {
            const a = RandomRoll(remainingAbilities)
            a.taken++
            c.abilities.push(a)
            c = c.calculateRemainingXP()
        }
        else break
    }
    console.log(`Final Random = ${c.abilities}`)
    return c
}