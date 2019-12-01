class Drug {
    constuctor (type, mix, overdose, notes, sz) {
        this.type = type
        this.mix = mix
        this.overdose = overdose
        this.notes = notes
        this.sz = sz
    }
}

export const DrugList = [
    new Drug(`Alcohol`,             9,  True,   `Antibiotic or Fuel. C9# or Unstable.`,                 1),
    new Drug(`Antibiotic`,          12, False,  `Prevents infection in Recovery for 1 day.`,            0),
    new Drug(`Hallucinogen`,        15, False,  `+1 Perform and Tame. -3 all other rolls. -1 Psyche.`,  0),
    new Drug(`Painkiller`,          9,  True,   `Ignore 1 Pain penalty.`,                               0),
    new Drug(`Sedative`,            12, True,   `D#6/rnd to take any action.`,                          0),
    new Drug(`Stimulant`,           9,  True,   `Ignore Exhaustion penalties for 6hrs.`,                0)
]

// OLD
// new Drug(`Chloroform`,          15, True,   `Liquid. C#12 or Unconscious. Takes d6rnds.`,       0)
// new Drug(`Cyanide`,             18, True,   `Pill. d6 Torso DMG/rnd for 5rnds.`,                0)
// new Drug(`Epinephrine`,         15, True,   `Injection. Rescuscitate within C+3mins.`,          0)
// new Drug(`Iodine`,              6,  False,  `Purify 1gal of Water. Prevents Radiation.`,        0)
// new Drug(`Potassium Chloride`,  18, True,   `Injection. d6 Torso DMG/min for 5mins.`,           0)
// new Drug(`Sodium Pentothal`,    15, True,   `Injection. -6 Entertain(Lie).`,                    0)