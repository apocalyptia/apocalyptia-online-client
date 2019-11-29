class Ammo {
    constuctor(cal, type, notes, sz) {
        this.cal = cal
        this.type = type
        this.notes = notes
        this.sz = sz
    }
}

export const AmmoList = [
    new Ammo('Arrow',   'Broadhead',        '+1 DMG. Pierce.',  .1),
    new Ammo('Arrow',   'Standard',         'Basic ammo.',      .1),
    new Ammo('.22',     'Standard',         'Basic ammo.',      .005),
    new Ammo('.22',     'Hollow Point',     '+1 DMG.',          .005),
    new Ammo('.22',     'Match',            '+1 RATK.',         .005),
    new Ammo('9mm',     'Standard',         'Basic ammo.',      .01),
    new Ammo('9mm',     'Hollow Point',     '+1 DMG.',          .01),
    new Ammo('9mm',     'Match',            '+1 RATK.',         .01),
    new Ammo('.357',    'Standard',         'Basic ammo.',      .01),
    new Ammo('.357',    'Hollow Point',     '+1 DMG.',          .01),
    new Ammo('5.56',    'Armor Piercing',   'Pierce.',          .02),
    new Ammo('5.56',    'Standard',         'Basic ammo.',      .02),
    new Ammo('5.56',    'Hollow Point',     '+1 DMG.',          .02),
    new Ammo('5.56',    'Match',            '+1 RATK.',         .02),
    new Ammo('.308',    'Armor Piercing',   'Pierce.',          .02),
    new Ammo('.308',    'Standard',         'Basic ammo.',      .02),
    new Ammo('.308',    'Hollow Point',     '+1 DMG.',          .02),
    new Ammo('.308',    'Match',            '+1 RATK.',         .02),
    new Ammo('12g',     'Buckshot',         'Scatter.',         .05),
    new Ammo('12g',     'Slug',             'RNG x2.',          .05)
]


// OLD
// new Ammo('.22',     'Tracer',            '+1 Auto RATK.',.005),
// new Ammo('12g',     'Birdshot',          'Basic ammo. Scatter.',.05),
// new Ammo('12g',     'Flare',             '3FDMG/rnd for 3rnds. 50yd light radius.',.05),
// new Ammo('12g',     'Rubber',            'Blunt.',.05),
// new Ammo('5.56',    'Tracer',            '+1 Auto RATK.',.02),