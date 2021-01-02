import Creation from 'rules/Creation.js'
import RandomRoll from 'random/RandomRoll.js'
import Traits from 'rules/Traits.js'

export default (c) => {
    c = Creation.resetTraits(c)
    while(Traits.remaining(c)) {
        const t = RandomRoll(Object.keys(c.traits))
        if (c.traits[t].score < Traits.maxPoints) c.traits[t].score++
    }
    return c
}