class RangedWeapon {
    constructor(name, dmg, hands, rng, cal, mag, reg, notes, sz) {
        this.name = name
        this.dmg = dmg
        this.hands = hands
        this.rng = rng
        this.cal = cal
        this.mag = mag
        this.reg = reg
        this.notes = notes
        this.sz = sz
    }
}

export const RangedList = [
    new RangedWeapon(`Bolt-Action Rifle`,               3, 2, 200,  5,  `.308`,     `C`, [],                    4),
    new RangedWeapon(`Compound Bow`,                    1, 2, 10,   1,  `Arrow`,    `C`, [],                    4),
    new RangedWeapon(`Crossbow`,                        2, 2, 20,   1,  `Arrow`,    `C`, [],                    4),
    new RangedWeapon(`Double-Barrel Shotgun`,           4, 2, 20,   2,  `12g`,      `C`, [`Rapid`, `Scatter`],  4),
    new RangedWeapon(`Lever-Action Rifle`,              2, 2, 50,   10, `.357`,     `C`, [],                    3),
    new RangedWeapon(`Pump Shotgun`,                    4, 2, 20,   6,  `12g`,      `C`, [`Scatter`],           4),
    new RangedWeapon(`Revolver`,                        2, 1, 10,   6,  `.357`,     `C`, [],                    2),
    new RangedWeapon(`Semi-Auto Carbine`,               1, 2, 30,   30, `9mm`,      `C`, [`Rapid`],             3),
    new RangedWeapon(`Semi-Auto Pistol`,                1, 1, 10,   15, `9mm`,      `C`, [`Rapid`],             1),
    new RangedWeapon(`Semi-Auto Rifle`,                 2, 2, 100,  30, `5.56`,     `C`, [`Rapid`],             3),
    new RangedWeapon(`Semi-Auto Shotgun`,               4, 2, 20,   6,  `12g`,      `C`, [`Rapid`, `Scatter`],  4),
    new RangedWeapon(`Target Pistol`,                   1, 2, 30,   10, `.22`,      `C`, [`Rapid`],             1),
    new RangedWeapon(`Target Rifle`,                    1, 2, 50,   10, `.22`,      `C`, [`Rapid`],             3),
]

// TODO: Finish `Military` Ranged Weapons, .reg = `G` for `Government`?

// RARE
// new RangedWeapon(`Blowgun`, 0, `Cx2`, `Dart`, 1, 2, `Pierce. DMG Mod.`, 1),
// new RangedWeapon(`Bolas`, 0, `Cx2`, `-`, `-`, 1, `Blunt. DMG Mod. Trip. Throw.`, 1),    
// new RangedWeapon(`Derringer`, 1, 3, `.22`, 2, 1, `-1 RATK.`, 0),
// new RangedWeapon(`Flamethrower`, `d6x3`, 5, `Fuel`, 7, `Auto. 3yd Blast. FDMG.`, 6),
// new RangedWeapon(`Longbow`, 1, 20, `Arrow`, 1, 2, `DMG Mod. -1 RATK.`, 3),
// new RangedWeapon(`M2 Browning`, 12, 200, `.50BMG`, `belt`, 2, `Auto. Mounted.`, 16),
// new RangedWeapon(`M4A1 Carbine`, 4, 50, `5.56`, `30mag`, 2, `Auto. Rapid.`, 3),
// new RangedWeapon(`M32 Launcher`, `varies`, 25, `40mm`, 6, 2, `Rapid.`, 4),
// new RangedWeapon(`M60 Machinegun`, 5, 100, `.308`, 300, 2, `Auto. Rapid. Bipod.`, 6),
// new RangedWeapon(`M72 LAW`, `d6x9`, 50, `Rocket`, 1, 2, `12yd Blast. Pierce.`, 3),
// new RangedWeapon(`M82 Barret`, 12, 200, `.50BMG`, `10mag`, 2, `Rapid. Bipod. Scope.`, 6),
// new RangedWeapon(`M134 Minigun`, 5, 100, `.308`, 1000, 2, `Auto only. Rapid. Mounted.`, 8),
// new RangedWeapon(`M203 Launcher`, `varies`, 25, `40mm`, 1, 2, `2h GUN ACCESSORY.`, 2),
// new RangedWeapon(`M249 SAW`, 4, 100, `5.56`, 100, 2, `Auto. Rapid.`, 5),
// new RangedWeapon(`Medusa 47`, `2, 3`, `9mm, .357`, `6cyl`, 1, `Revolver. Multi-Caliber.`, 2),
// new RangedWeapon(`Saiga-12`, 6, 15, `12g`, `12mag`, 2, `Rapid. Scatter.`, 4),
// new RangedWeapon(`Slingshot`, 1, 5, `Rocks`, 1, 2, `Blunt. DMG Mod.`, 1),
// new RangedWeapon(`Speargun`, 4, 5, `Arrow + Rope`, 1, 2, `Pierce. 2rnd Reload.`, 4),
// new RangedWeapon(`Uzi`, 2, 10, `9mm`, `30mag`, 2, `Auto. Rapid. -1 RATK.`, 3),
// new RangedWeapon(`W. P. Grenade`, `d6x3`, 3, `Grenade`, 1, 1, `6yd Blast. Blind. d6rnds.`, 1),

// OLD
// new RangedWeapon(`AK-47`, 4, 50, `7.62`, `30mag`, 2, `Auto. Rapid.`, 4),
// new RangedWeapon(`AR-15`, 4, 100, `5.56`, `30mag`, 2, `Rapid.`, 3),
// new RangedWeapon(`Benelli M4`, 6, 15, `12g`, 7, 2, `Rapid. Scatter.`, 4),
// new RangedWeapon(`Browning A-Bolt`, 4, 100, `5.56`, `5mag`, 2, `+1 RATK. Scope.`, 3),
// new RangedWeapon(`Colt Python`, 3, 25, `.357`, `6cyl`, 1, `Revolver.`, 2),
// new RangedWeapon(`Compound Bow`, 1, 25, `Arrow`, 1, 2, `DMG Mod. -1 RATK.`, 4),
// new RangedWeapon(`Crossbow`, 6, 50, `Arrow`, 1, 2, `1rnd Reload.`, 4),
// new RangedWeapon(`Glock 17`, 2, 25, `9mm`, `17mag`, 1, `Rapid.`, 1),
// new RangedWeapon(`H&ampK MP5`, 2, 50, `9mm`, `30mag`, 2, `Auto. Rapid.`, 2),
// new RangedWeapon(`Henry Golden Boy`, 1, 50, `.22`, 16, 2, `+1 RATK.`, 3),
// new RangedWeapon(`Kimber 1911`, 2, 25, `.45`, 7, 1, `Rapid.`, 1),
// new RangedWeapon(`MAC-10`, 2, 5, `.45`, 30, 2, `Auto. Rapid. -1 RATK`, 2),
// new RangedWeapon(`Marlin 1894C`, 3, 50, `.357`, 9, 2, `+1 RATK.`, 3),
// new RangedWeapon(`Mossberg 500`, 6, 10, `12g`, 5, 2, `Scatter.`, 2),
// new RangedWeapon(`Norinco SKS`, 4, 50, `7.62`, 10, 2, `Rapid. Bayonet.`, 4),
// new RangedWeapon(`Remington 700`, 5, 100, `.308`, 6, 2, `+1 RATK. Scope.`, 4),
// new RangedWeapon(`Remington 870`, `var`, 15, `12g`, 7, 2, `Scatter.`, 4),
// new RangedWeapon(`Ruger 10/22`, 1, 50, `.22`, `10mag`, 2, `Rapid.`, 3),
// new RangedWeapon(`Ruger Mk.III`, 1, 25, `.22`, `10mag`, 1, `Rapid.`, 1),
// new RangedWeapon(`SIG Sauer P290`, 2, 10, `9mm`, `6mag`, 1, `Rapid.`, 1),
// new RangedWeapon(`Savage Mk.II`, 1, 50, `.22`, `10mag`, 2, `+1 RATK.`, 3),
// new RangedWeapon(`Springfield M1A`, 5, 100, `.308`, `20mag`, 2, `Rapid.`, 4),
// new RangedWeapon(`S&ampW Snubnose`, 3, 5, `.357`, `5cyl`, 1, `Revolver.`, 1),
// new RangedWeapon(`Winchester Sawn-off`, 6, 5, `12g`, 2, 2, `Rapid. Scatter.`, 2)