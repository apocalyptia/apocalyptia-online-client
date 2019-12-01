class Medical {
    constructor(type, notes, sz) {
        this.type = type
        this.notes = notes
        this.sz = sz
    }
}

export const MedicalList = [
    new Medical(`Bandage`,          `+1 Medicine(First-Aid). 1 use.`,                           0),
    new Medical(`Crutch`,           `Halves Leg DMG Pain penalty to Speed.`,                    3),
    new Medical(`EMT Bag`,          `+3 Medicine(First-Aid). 30 uses.`,                         5),
    new Medical(`First-Aid Kit`,    `+1 Medicine(First-Aid). 5 uses.`,                          1),
    new Medical(`Pressure Cuff`,    `+1 Medicine.`,                                             1),
    new Medical(`Stethoscope`,      `+1 Medicine. Perception(Hear) 6# through doors.`,          1),
    new Medical(`Surgery Kit`,      `+3 Medicine(Surgery).`,                                    3),
    new Medical(`Thermometer`,      `+1 Medicine. Accurately reads temperature.`,               0),
    new Medical(`Transfusion Kit`,  `Medicine 9#. 1 Health/15mins. Heal up to 1 Health max.`,   1),
]