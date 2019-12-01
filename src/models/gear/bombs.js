class Bomb {
    constuctor(type, mix, dmg, blast, duration, effects, sz) {
        this.type = type
        this.mix = mix
        this.dmg = dmg
        this.blast = blast
        this.duration = duration
        this.effects = effects
        this.sz = sz
    }
}

export const BombList = [
    new Bomb(`Flashbang`,   9,  `0`,        `6yd`,      `d6rnds`,   `1rnd fuse. Blind. Stun.`,  1),
    new Bomb(`Frag`,        9,  `d6x3`,     `15yd`,     `instant`,  `1rnd fuse. Pierce.`,       1),
    new Bomb(`Molotov`,     1,  `d6`,       `3yd`,      `1min`,     `1FDMG/rnd.`,               2),
    new Bomb(`Smoke`,       3,  `0`,        `1yd/rnd`,  `d6mins`,   `Blind.`,                   1),
    new Bomb(`Teargas`,     15, `1`,        `1yd/rnd`,  `d6mins`,   `Blind. Suffocation`,       1),
    new Bomb(`Thermite`,    6,  `d6x6`,     `1yd`,      `6rnds`,    `1rnd fuse. FDMG.`,         1),
]

// OLD
// new Bomb(`Chlorine`,    18, `toxin`,    `1yd/rnd`,  `d6+3mins`, `Blind. Suffocation x2. Stun.`, 1)
// new Bomb(`Claymore`,    18, `d6x9`,     `30yd`,     `instant`,  `30yd 90° Blast. Loud.`,        2)
// new Bomb(`Dynamite`,    12, `d6x6`,     `30yd`,     `instant`,  `10rnd fuse.`,                  1)
// new Bomb(`Firecracker`, 6,  `0`,        `0yd`,      `d6+3rnds`, `Mimics sound of gunfire.`,     0)
// new Bomb(`Landmine`,    15, `d6x6`,     `3yd`,      `instant`,  ``,                             2)
// new Bomb(`Sky Rocket`,  12, `d6x3`,     `60yd`,     `instant`,  `-1 RATK. RNG:50. Blind.`,      1)