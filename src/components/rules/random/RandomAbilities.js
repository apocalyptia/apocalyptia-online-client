import RandomRoll from 'random/RandomRoll.js'

export default (c, r) => {
    c = c.resetAbilities()
    while(c.props.experience.remaining) {
        const remainingAbilities = r.filter(m => {
            return m.xp <= c.props.experience.remaining && !c.abilities.includes(m)
        })
        if (m.length) {
            const a = RandomRoll(remainingAbilities)
            a.taken++
            c.abilities.push(a)
            c.props.experience.remaining -= a.xp
        }
        else break
    }
    return c
}