class Electronic {
    constuctor (name, hours, notes, sz) {
        this.name = name
        this.hours = hours
        this.notes = notes
        this.sz = sz
    }
}

export const ElectronicsList = [
    new Electronic(`Cellphone`,             3,      `1yd light, camera, remote control.`,       1),
    new Electronic(`Emergency Radio`,       6,      `AM/FM/Shortwave. 1yd light.`,              1),
    new Electronic(`Flashlight`,            3,      `10yd light. -3 RATK to Blind 1rnd.`,       1),
    new Electronic(`Geiger Counter`,        24,     `Science 6# to detect Radiation in 1yd.`,   2),
    new Electronic(`Hand Radio`,            9,      `9-channel 2-way radio. 3 mile range.`,     1),
    new Electronic(`Headlamp`,              3,      `3yd light. Hands free.`,                   0),
    new Electronic(`Lantern`,               6,      `3yd light radius.`,                        2),
    new Electronic(`Megaphone`,             12,     `+1 Leadership when speaking to a crowd.`,  2),
    new Electronic(`Multimeter`,            48,     `+3 Science(Technology). Detect voltage.`,  1),
    new Electronic(`Nightvision Goggles`,   36,     `Ignore Visibility penalties in darkness.`, 1),
    new Electronic(`Quadcopter Drone`,      .25,    `Science 6# to use. Camera. 90yd Speed.`,   2),
    new Electronic(`RC Car`,                .5,     `Science 3# to use. 45yd Speed.`,           3),
    new Electronic(`Solar Lamp`,            9,      `1yd light radius. 1day charge.`,           1),
    new Electronic(`Stun Gun`,              .25,    `MATK. C9# or Stun for 1rnd.`,              1)
]

// OLD
//  new Electronic(`Radio Jammer`,          3,      `Blocks radio signal within 100yds.`,       1)