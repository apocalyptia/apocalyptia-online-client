class Document {
    constuctor(type, notes, sz) {
        this.type = type
        this.notes = notes
        this.sz = sz
    }
}

export const DocumentList = [
    new Document(`Body in Balance`,             `+1 Athletics`,                     1),
    new Document(`Book of Ninja`,               `+1 Stealth`,                       1),
    new Document(`Defensive Driving`,           `+1 Drive`,                         1),
    new Document(`Dog Tricks`,                  `+1 Tame`,                          1),
    new Document(`Effective Habits`,            `+1 to any one Skill`,              1),
    new Document(`Engineering Concepts`,        `+1 Build`,                         1),
    new Document(`General Science Knowledge`,   `+1 Science`,                       1),
    new Document(`Gray\`s Anatomy`,             `+1 Medicine`,                      1),
    new Document(`Home Security`,               `+1 Larceny`,                       1),
    new Document(`How to Win Friends`,          `+1 Socialize`,                     1),
    new Document(`How Yoga Works`,              `+1 Acrobatics`,                    1),
    new Document(`Leadership Basics`,           `+1 Leadership`,                    1),
    new Document(`Personal Defense`,            `+1 Ranged`,                        1),
    new Document(`SAS Survival Guide`,          `+1 Survival`,                      1),
    new Document(`Stand-up Comedy`,             `+1 Entertain`,                     1),
    new Document(`Tao of Jeet Kune Do`,         `+1 Melee`,                         1),
    new Document(`Yellow Pages`,                `+1 Scavenging. Regional.`,         1),
    new Document(`Zen Mind`,                    `+1 Perception`,                    1),
    new Document(`Bilingual Dictionary`,        `Multilingual Ability`,             1),
    new Document(`Classic Novel`,               `+1 Psyche`,                        1),
    new Document(`Holy Book`,                   `-1 Psyche`,                        1),
    new Document(`Map (Atlas)`,                 `+1 Survival(Navigate)`,            1),
    new Document(`Map (Local)`,                 `+1 Survival(Navigate). Regional.`, 0),
    new Document(`Map (Topographic)`,           `+3 Survival(Navigate). Regional.`, 0),
]