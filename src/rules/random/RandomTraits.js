import RandomRoll from '/src/rules/random/RandomRoll.js'
import Traits from '/src/rules/Traits.js'

export default (c) => {
    c.resetTraits()
    while(Traits.remaining(c)) {
        const t = RandomRoll(Object.keys(c.traits))
        if (c.traits[t].score < Traits.maxPoints) c.traits[t].score++
    }
    return c
}