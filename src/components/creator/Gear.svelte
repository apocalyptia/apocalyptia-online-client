<script>
    //ROLL RANDOM ITEM
    function rollItem(table, place){
        table = document.getElementById("TableRollSelection").value;
        switch (table) {
            case "iMasterGearList":
                table = iMasterGearList;
                break;
            case "iArmorList":
                table = iArmorList;
                break;
            case "iRangedWeaponsList":
                table = iRangedWeaponsList;
                break;
            case "iMeleeWeaponsList":
                table = iMeleeWeaponsList;
                break;
            case "iAmmoList":
                table = iAmmoList;
                break;
            case "iBombsList":
                table = iBombsList;
                break;
            case "iDrugsList":
                table = iDrugsList;
                break;
            case "iMedicalList":
                table = iMedicalList;
                break;
            case "iLandVehiclesList":
                table = iLandVehiclesList;
                break;
            case "iAircraftList":
                table = iAircraftList;
                break;
            case "iWatercraftList":
                table = iWatercraftList;
                break;
            default:
                break;
        }
        let rolledItem = table[Math.ceil((Math.random() * table.length) - 1)];
        if (rolledItem instanceof Array){
            rolledItem = rolledItem[Math.ceil((Math.random() * rolledItem.length) - 1)];
        }
        if (typeof rolledItem === 'string'){
            rollItem(table, place);
        }
        if (rolledItem instanceof Armor){
            document.getElementById(place).innerHTML = '<p>' + rolledItem.type + '</p><p>AR: ' + rolledItem.ar + '</p><p>Location(s): ' + rolledItem.loc + '</p><p>Notes: ' + rolledItem.notes + '<p><p>Size: ' + rolledItem.sz + '</p>';
        } else if (rolledItem instanceof MeleeWeapon){
            document.getElementById(place).innerHTML = '<p>' + rolledItem.type + '</p><p>DMG: ' + rolledItem.dmg + '</p><p>Notes: ' + rolledItem.notes + '<p><p>Size: ' + rolledItem.sz + '</p>';
        } else if (rolledItem instanceof RangedWeapon){
            document.getElementById(place).innerHTML = '<p>' + rolledItem.type + '</p><p>DMG: ' + rolledItem.dmg + '</p><p>Range: ' + rolledItem.rng + 'yds</p><p>Caliber: ' + rolledItem.cal + '</p><p>Ammo: ' + rolledItem.mag + '</p><p>Notes: ' + rolledItem.notes + '<p><p>Size: ' + rolledItem.sz + '</p>';
        } else if (rolledItem instanceof Bomb){
            document.getElementById(place).innerHTML = '<p>' + rolledItem.type + '</p><p>Mix: ' + rolledItem.mix + '</p><p>DMG: ' + rolledItem.dmg + '</p><p>Blast: ' + rolledItem.blast + '</p><p>Duration: ' + rolledItem.duration + '</p><p>Effects: ' + rolledItem.effects + '</p><p>Size: ' + rolledItem.sz + '</p>';
        } else if (rolledItem instanceof Vehicle){
            document.getElementById(place).innerHTML = '<p>' + rolledItem.type + '</p><p>HP: ' + rolledItem.hp + '</p><p>DR: ' + rolledItem.dr + '</p></p>DMG: ' + rolledItem.dmg + '</p><p>Tactical Speed: ' + rolledItem.spd + ' yds/rnd</p><p>Travel Speed: ' + rolledItem.mph + 'mph</p><p>Handle: ' + rolledItem.han + '</p><p>Area: ' + rolledItem.area + '</p><p>MPG: ' + rolledItem.mpg + '</p><p>Fuel: ' + rolledItem.fuel + '</p><p>Occupants: ' + rolledItem.occ + '</p><p>Cargo: ' + rolledItem.car + '</p>';
        }
        else if (rolledItem instanceof Gear){
            document.getElementById(place).innerHTML = '<p>' + rolledItem.type + '</p><p>Notes: ' + rolledItem.notes + '</p><p>Size: ' + rolledItem.sz + '</p>';
        }
        document.getElementById(place).style = 'margin-left: 10%; margin-right: 10%;';
        let oldLog = document.getElementById('TableResultsLog').innerHTML;
        document.getElementById('TableResultsLog').innerHTML = rolledItem.type + '<br>' + oldLog;
    }

    //ROLL DICE
    function rollDice(){
        const rolls = parseInt(document.getElementById('diceRolls').value);
        const mod = parseInt(document.getElementById('diceMod').value);
        let output = "";
        let result;
        let oldLog = document.getElementById('RollResultsLog').innerHTML;
        for (let i = 0; i < rolls; i++) {
            let roll = Math.ceil((Math.random() * 6));
            switch (roll) {
                case 1:
                    let botch = Math.ceil((Math.random() * 6));
                    if (botch === 1) {
                        result = "Botch!";
                    } else {
                        result = 1;
                    }
                    break;
                case 6:
                    let explode = true;
                    while (explode === true) {
                        let explodeRoll = Math.ceil((Math.random() * 6));
                        roll += explodeRoll;
                        if (explodeRoll !== 6) {
                            explode = false;
                        }
                    }
                    result = roll + mod;
                    break;
                default:
                    result = roll + mod;
                    break;
            }
            output += '<p>Roll #'+(i+1)+': '+result+'</p>';
            oldLog += result + '<br>';
        }
        document.getElementById('diceResult').innerHTML = output;
        document.getElementById('RollResultsLog').innerHTML = oldLog;
    }

    // Split ar into head, arms, torso, and legs for Character Creator
    function Armor(type, ar, loc, notes, sz){
        this.type = type;
        this.ar = ar;
        this.loc = loc;
        this.notes = notes;
        this.sz = sz;
    }
    const iArmyHelmet = new Armor('Army Helmet', '4', 'Head', 'Camo.', 2);
    const iAthleticPads = new Armor('Athletic Pads', '1,2,1', 'Arms, Torso, Legs', '', 3);
    const iCoveralls = new Armor('Coveralls', '1,1,1', 'Arms, Torso, Legs', 'Camo. CR.', 3);
    const iDenimJacket = new Armor('Denim Jacket', '1,1', 'Arms, Torso', '', 2);
    const iFirefighterSuit = new Armor('Firefighter Suit', '2,2,2,2', 'Head, Arms, Torso, Legs', 'CR. FR. Mask. -1 Speed.', 5);
    const iFlakJacket = new Armor('Flak Jacket', '2', 'Torso', 'Camo', 4);
    const iGhillieSuit = new Armor('Ghillie Suit', '1,1,1,1', 'Head, Arms, Torso, Legs', 'Camo. CR.', 4);
    const iHikingBoots = new Armor('Hiking Boots', '1', 'Legs', 'CR. FR. Tread 3.', 2);
    const iInterceptorArmor = new Armor('Interceptor Armor', '3,6', 'Arms, Torso', 'Camo. CR. FR.', 5);
    const iKevlarGloves = new Armor('Kevlar Gloves', '2', 'Arms', 'FR.', 1);
    const iKevlarVest = new Armor('Kevlar Vest', '4', 'Torso', 'CR. FR.', 4);
    const iKneePads = new Armor('Knee Pads', '1', 'Legs', '', 1);
    const iLeatherJacket = new Armor('Leather Jacket', '1,1', 'Arms, Torso', 'CR.', 2);
    const iMotorcycleHelmet = new Armor('Motorcycle Helmet', '3', 'Head', 'FR. Mask.', 2);
    const iNBCSuit = new Armor('NBC Suit', '-', 'Head, Arms, Torso, Legs', '+6 C vs toxins.', 2);
    const iPaintballMask = new Armor('Paintball Mask', '1', 'Head', 'Mask.', 1);
    const iPlateCarrier = new Armor('Plate Carrier', '5', 'Torso', '', 4);
    const iRiotHelmet = new Armor('Riot Helmet', '4', 'Head', 'FR. Mask.', 2);
    const iSportsHelmet = new Armor('Sports Helmet', '2', 'Head', 'Mask.', 2);
    const iSteelToeBoots = new Armor('Steel-Toe Boots', '2', 'Legs', 'Blunt. FR. Kick 3BDMG', 2);
    const iTacticalVest = new Armor('Tactical Vest', '1', 'Torso', '6 Storage.', 1);
    const iUndercoverVest = new Armor('Undercover Vest', '3', 'Torso', 'FR.', 3);
    const iWinterCoat = new Armor('Winter Coat', '1,1', 'Arms, Torso', '+3 CR.', 2);
    const iWorkGloves = new Armor('Work Gloves', '1', 'Arms', 'FR.', 1);
    const iArmorList = [iArmyHelmet,iAthleticPads,iCoveralls,iDenimJacket,iFirefighterSuit,iFlakJacket,iGhillieSuit,iHikingBoots,iInterceptorArmor,iKevlarGloves,iKevlarVest,iLeatherJacket,iMotorcycleHelmet,iNBCSuit,iPaintballMask,iPlateCarrier,iRiotHelmet,iSportsHelmet,iSteelToeBoots,iTacticalVest,iUndercoverVest,iWinterCoat,iWorkGloves];

    const iBlackRobe = new Armor('Black Robe', '1,1,1,1', 'Head, Torso, Arms, Legs', 'CR. +1 Stealth.', 1);
    const iChainmailShirt = new Armor('Chainmail Shirt', '3,3,3', 'Head, Torso, Arms', 'Ignore Chop.', 6);
    const iDragonskinVest = new Armor('Dragonskin Vest', '8', 'Torso', 'CR. FR.', 3);
    const iKnuckleGloves = new Armor('Knuckle Gloves', '2', 'Arms', '2DMG Punch. Blunt. FR.', 1);
    const iLandWarriorHelmet = new Armor('Land Warrior Helmet', '4', 'Head', 'FR. Nightvision Goggles. Radio.', 2);
    const iSpikedJacket = new Armor('Spiked Jacket', '2, 2', 'Torso, Arms', '+1 DMG Grab.', 3);
    const iRareArmorList = [iBlackRobe,iChainmailShirt,iDragonskinVest,iKnuckleGloves,iLandWarriorHelmet,iSpikedJacket];

    function MeleeWeapon(type, dmg, hands, notes, sz){
        this.type = type;
        this.dmg = dmg;
        this.hands = hands;
        this.notes = notes;
        this.sz = sz;
    }
    const iAx = new MeleeWeapon('Ax', 5, 2, 'Chop.', 4);
    const iBaseballBat = new MeleeWeapon('Baseball Bat', 3, 2, 'Blunt.', 3);
    const iBrassKnuckles = new MeleeWeapon('Brass Knuckles', 2, 1, 'Blunt.', 1);
    const iBaton = new MeleeWeapon('Baton', 2, 1, 'Blunt. Rapid.', 2);
    const iCane = new MeleeWeapon('Cane', 1, 1, 'Blunt. +1 Trip. Can be used as a Crutch.', 3);
    const iCleaver = new MeleeWeapon('Cleaver', 2, 1, 'Chop.', 1);
    const iCrowbar = new MeleeWeapon('Crowbar', 3, 1, 'Lever.', 3);
    const iFirepoker = new MeleeWeapon('Firepoker', 3, 1, 'Lever. Pierce.', 3);
    const iGarrote = new MeleeWeapon('Garrote', 1, 2, 'Blunt. +3 to Grab(Lock) Head.', 1);
    const iHammer = new MeleeWeapon('Hammer', 2, 1, 'Lever.', 2);
    const iHatchet = new MeleeWeapon('Hatchet', 2, 1, 'Chop.', 2);
    const iKnife = new MeleeWeapon('Knife', 2, 1, 'Rapid.', 1);
    const iMachete = new MeleeWeapon('Machete', 3, 1, 'Chop.', 2);
    const iMetalClub = new MeleeWeapon('Metal Club', 3, 2, 'Blunt.', 3);
    const iPickax = new MeleeWeapon('Pickax', 6, 2, 'Lever. Pierce.', 5);
    const iPitchfork = new MeleeWeapon('Pitchfork', 3, 2, '+1 Block. Pierce.', 4);
    const iRiotShield = new MeleeWeapon('Riot Shield', 1, 1, '+3 Block. Blunt. Cover 3DR.', 4);
    const iScrewdriver = new MeleeWeapon('Screwdriver', 1, 1, 'Lever. Pierce. Rapid.', 1);
    const iShovel = new MeleeWeapon('Shovel', 3, 2, '+1 Block', 4);
    const iSledgehammer = new MeleeWeapon('Sledgehammer', 5, 2, 'Blunt.', 5);
    const iSpear = new MeleeWeapon('Spear', 4, 2, '+1 Block. Pierce.', 3);
    const iStaff = new MeleeWeapon('Staff', 2, 2, '+1 Block. Blunt.', 3);
    const iTireIron = new MeleeWeapon('Tire Iron', 2, 1, 'Lever.', 2);
    const iTorch = new MeleeWeapon('Torch', 1, 1, 'Blunt. +1 FDMG. 5yd light radius 1hr.', 2);
    const iMeleeWeaponsList = [iAx,iBaseballBat,iBaton,iBrassKnuckles,iCane,iCleaver,iCrowbar,iFirepoker,iGarrote,iHammer,iHatchet,iKnife,iMachete,iMetalClub,iPickax,iPitchfork,iRiotShield,iScrewdriver,iShovel,iSledgehammer,iSpear,iStaff,iTireIron,iTorch];

    function RangedWeapon(type, dmg, rng, cal, mag, hands, notes, sz){
        this.type = type;
        this.dmg = dmg;
        this.rng = rng;
        this.cal = cal;
        this.mag = mag;
        this.hands = hands;
        this.notes = notes;
        this.sz = sz;
    }
    const iAK47 = new RangedWeapon('AK-47', 4, 50, '7.62', '30mag', 2, 'Auto. Rapid.', 4);
    const iAR15 = new RangedWeapon('AR-15', 4, 100, '5.56', '30mag', 2, 'Rapid.', 3);
    const iBenelliM4 = new RangedWeapon('Benelli M4', 6, 15, '12g', 7, 2, 'Rapid. Scatter.', 4);
    const iBrowningABolt = new RangedWeapon('Browning A-Bolt', 4, 100, '5.56', '5mag', 2, '+1 RATK. Scope.', 3);
    const iColtPython = new RangedWeapon('Colt Python', 3, 25, '.357', '6cyl', 1, 'Revolver.', 2);
    const iCompoundBow = new RangedWeapon('Compound Bow', 1, 25, 'Arrow', 1, 2, 'DMG Mod. -1 RATK.', 4);
    const iCrossbow = new RangedWeapon('Crossbow', 6, 50, 'Arrow', 1, 2, '1rnd Reload.', 4);
    const iGlock17 = new RangedWeapon('Glock 17', 2, 25, '9mm', '17mag', 1, 'Rapid.', 1);
    const iHKMP5 = new RangedWeapon('H&ampK MP5', 2, 50, '9mm', '30mag', 2, 'Auto. Rapid.', 2);
    const iHenryGoldenBoy = new RangedWeapon('Henry Golden Boy', 1, 50, '.22', 16, 2, '+1 RATK.', 3);
    const iKimber1911 = new RangedWeapon('Kimber 1911', 2, 25, '.45', 7, 1, 'Rapid.', 1);
    const iMAC10 = new RangedWeapon('MAC-10', 2, 5, '.45', 30, 2, 'Auto. Rapid. -1 RATK', 2);
    const iMarlin1894C = new RangedWeapon('Marlin 1894C', 3, 50, '.357', 9, 2, '+1 RATK.', 3);
    const iMossberg500 = new RangedWeapon('Mossberg 500', 6, 10, '12g', 5, 2, 'Scatter.', 2);
    const iNorincoSKS = new RangedWeapon('Norinco SKS', 4, 50, '7.62', 10, 2, 'Rapid. Bayonet.', 4);
    const iRemington700 = new RangedWeapon('Remington 700', 5, 100, '.308', 6, 2, '+1 RATK. Scope.', 4);
    const iRemington870 = new RangedWeapon('Remington 870', 'var', 15, '12g', 7, 2, 'Scatter.', 4);
    const iRuger1022 = new RangedWeapon('Ruger 10/22', 1, 50, '.22', '10mag', 2, 'Rapid.', 3);
    const iRugerMkIII = new RangedWeapon('Ruger Mk.III', 1, 25, '.22', '10mag', 1, 'Rapid.', 1);
    const iSIGSauerP290 = new RangedWeapon('SIG Sauer P290', 2, 10, '9mm', '6mag', 1, 'Rapid.', 1);
    const iSavageMkII = new RangedWeapon('Savage Mk.II', 1, 50, '.22', '10mag', 2, '+1 RATK.', 3);
    const iSpringfieldM1A = new RangedWeapon('Springfield M1A', 5, 100, '.308', '20mag', 2, 'Rapid.', 4);
    const iSWSnubnose = new RangedWeapon('S&ampW Snubnose', 3, 5, '.357', '5cyl', 1, 'Revolver.', 1);
    const iWinchesterSawnoff = new RangedWeapon('Winchester Sawn-off', 6, 5, '12g', 2, 2, 'Rapid. Scatter.', 2);
    const iRangedWeaponsList = [iAK47,iAR15,iBenelliM4,iBrowningABolt,iColtPython,iCompoundBow,iCrossbow,iGlock17,iHKMP5,iHenryGoldenBoy,iKimber1911,iMAC10,iMarlin1894C,iMossberg500,iNorincoSKS,iRemington700,iRemington870,iRuger1022,iRugerMkIII,iSIGSauerP290,iSavageMkII,iSpringfieldM1A,iSWSnubnose,iWinchesterSawnoff];

    const iBarbwireClub = new MeleeWeapon('Barbwire Club', 3, 1, '', 2);
    const iBlowgun = new RangedWeapon('Blowgun', 0, 'Cx2', 'Dart', 1, 2, 'Pierce. DMG Mod.', 1);
    const iBolas = new RangedWeapon('Bolas', 0, 'Cx2', '-', '-', 1, 'Blunt. DMG Mod. Trip. Throw.', 1);
    const iBowieKnife = new MeleeWeapon('Bowie Knife', 2, 1, 'Chop. Rapid.', 1);
    const iBroadsword = new MeleeWeapon('Broadsword', 4, 2, 'Chop or Pierce.', 4);
    const iCatchPole = new MeleeWeapon('Catch Pole', 0, 2, '+1 Block. Blunt. +1 Grab.', 3);
    const iChainsaw = new MeleeWeapon('Chainsaw', 6, 2, '.5gal Fuel. d6rnd start. 1: Empty. Loud.', 4);
    const iDerringer = new RangedWeapon('Derringer', 1, 3, '.22', 2, 1, '-1 RATK.', 0);
    const iFlamethrower = new RangedWeapon('Flamethrower', 'd6x3', 5, 'Fuel', 7, 'Auto. 3yd Blast. FDMG.', 6);
    const iIceAx = new MeleeWeapon('Ice Ax', 3, 1, 'Lever. Pierce.', 2);
    const iKatana = new MeleeWeapon('Katana', 5, 2, 'Chop or Pierce. Rapid.', 3);
    const iKukri = new MeleeWeapon('Kukri', 3, 1, 'Chop', 2);
    const iLasso = new MeleeWeapon('Lasso', 0, 2, 'Blunt. +1 Grab. Throw (RNG:3)', 2);
    const iLongbow = new RangedWeapon('Longbow', 1, 20, 'Arrow', 1, 2, 'DMG Mod. -1 RATK.', 3);
    const iM2Browning = new RangedWeapon('M2 Browning', 12, 200, '.50BMG', 'belt', 2, 'Auto. Mounted.', 16);
    const iM4A1Carbine = new RangedWeapon('M4A1 Carbine', 4, 50, '5.56', '30mag', 2, 'Auto. Rapid.', 3);
    const iM32Launcher = new RangedWeapon('M32 Launcher', 'varies', 25, '40mm', 6, 2, 'Rapid.', 4);
    const iM60Machinegun = new RangedWeapon('M60 Machinegun', 5, 100, '.308', 300, 2, 'Auto. Rapid. Bipod.', 6);
    const iM72LAW = new RangedWeapon('M72 LAW', 'd6x9', 50, 'Rocket', 1, 2, '12yd Blast. Pierce.', 3);
    const iM82Barrett = new RangedWeapon('M82 Barret', 12, 200, '.50BMG', '10mag', 2, 'Rapid. Bipod. Scope.', 6);
    const iM134Minigun = new RangedWeapon('M134 Minigun', 5, 100, '.308', 1000, 2, 'Auto only. Rapid. Mounted.', 8);
    const iM203Launcher = new RangedWeapon('M203 Launcher', 'varies', 25, '40mm', 1, 2, '2h GUN ACCESSORY.', 2);
    const iM249SAW = new RangedWeapon('M249 SAW', 4, 100, '5.56', 100, 2, 'Auto. Rapid.', 5);
    const iMedusa47 = new RangedWeapon('Medusa 47', '2, 3', '9mm, .357', '6cyl', 1, 'Revolver. Multi-Caliber.', 2);
    const iNet = new MeleeWeapon('Net', 0, 2, '+6 Grab.', 3);
    const iRapier = new MeleeWeapon('Rapier', 3, 1, 'Pierce. Rapid.', 2);
    const iSaiga12 = new RangedWeapon('Saiga-12', 6, 15, '12g', '12mag', 2, 'Rapid. Scatter.', 4);
    const iScythe = new MeleeWeapon('Scythe', 6, 2, 'Chop. Pierce.', 4);
    const iSignShield = new MeleeWeapon('Sign Shield', 2, 1, '+3 Block. Cover 6DR.', 4);
    const iSlingshot = new RangedWeapon('Slingshot', 1, 5, 'Rocks', 1, 2, 'Blunt. DMG Mod.', 1);
    const iSpeargun = new RangedWeapon('Speargun', 4, 5, 'Arrow + Rope', 1, 2, 'Pierce. 2rnd Reload.', 4);
    const iSwitchblade = new MeleeWeapon('Switchblade', 1, 1, 'Pierce. Rapid.', 0);
    const iTrenchKnife = new MeleeWeapon('Trench Knife', 2, 1, 'Blunt Punch. Pierce. Rapid.', 1);
    const iUzi = new RangedWeapon('Uzi', 2, 10, '9mm', '30mag', 2, 'Auto. Rapid. -1 RATK.', 3);
    const iWhip = new MeleeWeapon('Whip', 0, 1, 'Blunt. +1 Disarm. +1 Grab. RNG:3.', 1);
    const iWPGrenade = new RangedWeapon('W. P. Grenade', 'd6x3', 3, 'Grenade', 1, 1, '6yd Blast. Blind. d6rnds.', 1);
    const iRareWeaponsList = [iBarbwireClub,iBlowgun,iBolas,iBowieKnife,iBroadsword,iCatchPole,iChainsaw,iDerringer,iFlamethrower,iIceAx,iKatana,iKukri,iLasso,iLongbow,iM2Browning,iM4A1Carbine,iM32Launcher,iM60Machinegun,iM72LAW,iM82Barrett,iM134Minigun,iM203Launcher,iM249SAW,iMedusa47,iNet,iRapier,iSaiga12,iScythe,iSignShield,iSlingshot,iSpeargun,iSwitchblade,iTrenchKnife,iUzi,iWhip,iWPGrenade];

    function Bomb(type, mix, dmg, blast, duration, effects, sz){
        this.type = type;
        this.mix = mix;
        this.dmg = dmg;
        this.blast = blast;
        this.duration = duration;
        this.effects = effects;
        this.sz = sz;
    }
    const iChlorine = new Bomb('Chlorine*','18#','toxin','1yd/rnd','d6+3mins','Blind. Suffocation x2. Stun.',1);
    const iClaymore = new Bomb('Claymore','18#','d6x9','30yd','instant','30yd 90° Blast. Loud.',2);
    const iDynamite = new Bomb('Dynamite','12#','d6x6','30yd','instant','10rnd fuse.',1);
    const iFirecracker = new Bomb('Firecracker','6#','0','0yd','d6+3rnds','Mimics sound of gunfire.',0);
    const iFlashbang = new Bomb('Flashbang*','9#','0','6yd','d6+2rnds','1rnd fuse. Blind. Loud. Stun.',1);
    const iFrag = new Bomb('Frag*','9#','d6x3','15yd','instant','1rnd fuse. Loud.',1);
    const iLandmine = new Bomb('Landmine','15#','d6x6','3yd','instant','Loud.',2);
    const iMolotov = new Bomb('Molotov','1#','d6','3yd','1min','1FDMG/rnd. Requires 1 Fuel.',2);
    const iSkyRocket = new Bomb('Sky Rocket','12#','d6x3','60yd','instant','-1 RATK. RNG:50. Blind. Loud.',1);
    const iSmoke = new Bomb('Smoke*','3#','1yd/rnd','d6mins','Blind.',1);
    const iTeargas = new Bomb('Teargas*','15#','toxin','1yd/rnd','d6mins','Blind.',1);
    const iThermite = new Bomb('Thermite*','6#','d6x6','1yd','6rnds','d6x6FDMG/rnd.',1);
    const iBombsList = [iChlorine,iClaymore,iDynamite,iFirecracker,iFlashbang,iFrag,iLandmine,iMolotov,iSkyRocket,iSmoke,iTeargas,iThermite];

    function Gear(type, notes, sz){
        this.type = type;
        this.notes = notes;
        this.sz = sz;
    }
    //GUN ACCESSORIES
    const iBayonet = new Gear('Bayonet','Knife. +2 DMG for MATKs with a Gun.',1);
    const iBipod = new Gear('Bipod','-3 Size requirement. 1rnd setup.',1);
    const iDrumMagazine = new Gear('Drum Magazine','Gun specific. 3x Ammo magazine capacity.',1);
    const iForegrip = new Gear('Foregrip','-1 Size requirement for 2h Guns.',0);
    const iHolosight = new Gear('Holosight','+1 RATK.',0);
    const iLaser = new Gear('Laser','+1 RATK. -6 RATK to Blind d6rnds.',0);
    const iScope = new Gear('Scope','+3 Aimed RATKs and Perception(See).',1);
    const iSinglePointSling = new Gear('Single-Point Sling','Draw or stow a 2h Gun as a Fast action.',0);
    const iSuppressor = new Gear('Suppressor','Removes the Loud Attribute from a Gun.',0);
    const iGunAccessoryList = [iBayonet,iBipod,iDrumMagazine,iForegrip,iHolosight,iLaser,iScope,iSinglePointSling,iSuppressor];
    //AMMO
    const i22FMJ = new Gear('.22 FMJ','Basic ammo.',.005);
    const i22JHP = new Gear('.22 JHP','+1 DMG.',.005);
    const i22Match = new Gear('.22 Match','+1 RATK.',.005);
    const i22Tracer = new Gear('.22 Tracer','+1 Auto RATK.',.005);
    const i9mmFMJ = new Gear('9mm FMJ','Basic ammo.',.01);
    const i9mmJHP = new Gear('9mm JHP','+1 DMG.',.01);
    const i9mmMatch = new Gear('9mm Match','+1 RATK.',.01);
    const i45FMJ = new Gear('.45 FMJ','Basic ammo.',.01);
    const i45JHP = new Gear('.45 JHP','+1 DMG.',.01);
    const i45Match = new Gear('.45 Match','+1 RATK.',.01);
    const i357FMJ = new Gear('.357 FMJ','Basic ammo.',.01);
    const i357JHP = new Gear('.357 JHP','+1 DMG.',.01);
    const i556AP = new Gear('5.56 AP','Pierce.',.02);
    const i556FMJ = new Gear('5.56 FMJ','Basic ammo.',.02);
    const i556JHP = new Gear('5.56 JHP','+1 DMG.',.02);
    const i556Match = new Gear('5.56 Match','+1 RATK.',.02);
    const i556Tracer = new Gear('5.56 Tracer','+1 Auto RATK.',.02);
    const i762FMJ = new Gear('7.62 FMJ','Basic ammo.',.02);
    const i762JHP = new Gear('7.62 JHP','+1 DMG.',.02);
    const i308AP = new Gear('.308 AP','Pierce.',.02);
    const i308FMJ = new Gear('.308 FMJ','Basic ammo.',.02);
    const i308JHP = new Gear('.308 JHP','+1 DMG.',.02);
    const i308Match = new Gear('.308 Match','+1 RATK.',.02);
    const i12gBirdshot = new Gear('12g Birdshot','Basic ammo. Scatter.',.05);
    const i12gBuckshot = new Gear('12g Buckshot','+3 DMG. Scatter.',.05);
    const i12gFlare = new Gear('12g Flare','3FDMG/rnd for 3rnds. 50yd light radius.',.05);
    const i12gRubber = new Gear('12g Rubber','Blunt.',.05);
    const i12gSlug = new Gear('12g Slug','+1 DMG. RNG x3.',.05);
    const iArrowBroadhead = new Gear('Broadhead Arrow','+3 DMG. d6DMG on removal.',.1);
    const iArrowTarget = new Gear('Target Arrow','Basic ammo. 1DMG on removal.',.1);
    const i12gAmmoList = [i12gBirdshot,i12gBuckshot,i12gFlare,i12gRubber,i12gSlug];
    const i22AmmoList = [i22FMJ,i22JHP,i22Match,i22Tracer];
    const i9mmAmmoList = [i9mmFMJ,i9mmJHP,i9mmMatch];
    const i45AmmoList = [i45FMJ,i45JHP,i45Match];
    const i357AmmoList = [i357FMJ,i357JHP];
    const i556AmmoList = [i556AP,i556FMJ,i556JHP,i556Match,i556Tracer];
    const i762AmmoList = [i762FMJ,i762JHP];
    const i308AmmoList = [i308AP,i308FMJ,i308JHP,i308Match];
    const iArrowAmmoList = [iArrowBroadhead,iArrowTarget];
    const iAmmoList = [i22FMJ,i22JHP,i22Match,i22Tracer,i9mmFMJ,i9mmJHP,i9mmMatch,i45FMJ,i45JHP,i45Match,i357FMJ,i357JHP,iArrowBroadhead,iArrowTarget,i556AP,i556FMJ,i556JHP,i556Match,i556Tracer,i762FMJ,i762JHP,i308AP,i308FMJ,i308JHP,i308Match,i12gBirdshot,i12gBuckshot,i12gFlare,i12gRubber,i12gSlug];
    //DRUGS
    const iAlcohol = new Gear('Alcohol&sup1','Mix 9#. Liquid. Antibiotic or Fuel. Unstable.',1);
    const iAntibiotic = new Gear('Antibiotic*','Mix 12#. Prevents infection for Recovery 1/day.',0);
    const iChloroform = new Gear('Chloroform&sup1','Mix 15#. Liquid. C#12 or Unconscious. Takes d6rnds.',0);
    const iCyanide = new Gear('Cyanide&sup1*','Mix 18#. Pill. d6 Torso DMG/rnd for 5rnds.',0);
    const iEpinephrine = new Gear('Epinephrine&sup1','Mix 15#. Injection. Rescuscitate within C+3mins.',0);
    const iHallucinogen = new Gear('Hallucinogen*','Mix 15#. +1 Entertain and Tame. -3 all else. -1 Psyche.',0);
    const iIodine = new Gear('Iodine*','Mix 6#. Purify 1gal of Water. Prevents Radiation.',0);
    const iPainkiller = new Gear('Painkiller&sup1*','Mix 9#. Reduce Pain by 1.',0);
    const iPotassiumChloride = new Gear('Potassium Chloride&sup1','Injection. d6 Torso DMG/min for 5mins.',0);
    const iSedative = new Gear('Sedative&sup1*','Mix 12#. D#6/rnd to move. Prevents PSYCHOTIC BREAK.',0);
    const iSodiumPentothal = new Gear('Sodium Pentothal&sup1','Mix 15#. Injection. -6 Entertain(Lie).',0);
    const iStimulant = new Gear('Stimulant&sup1*','Mix 9#. Reduce Exhaustion by 1.',0);
    const iDrugsList = [iAlcohol,iAntibiotic,iChloroform,iCyanide,iEpinephrine,iHallucinogen,iIodine,iPainkiller,iPotassiumChloride,iSedative,iSodiumPentothal,iStimulant];
    //MEDICAL
    const iBandage = new Gear('Bandage*','Required for Medicine(First-Aid). 1 use.',0);
    const iCrutch = new Gear('Crutch*','Halves Leg DMG penalty to Speed.',3);
    const iEMTBag = new Gear('EMT Bag','+3 Medicine(First-Aid). 30 uses.',5);
    const iFirstAidKit = new Gear('First-Aid Kit','+1 Medicine(First-Aid). 5 uses.',1);
    const iPressureCuff = new Gear('Pressure Cuff','+1 Medicine.',1);
    const iStethoscope = new Gear('Stethoscope','+1 Medicine. Perception(Hear) 6# through doors.',1);
    const iSurgeryKit = new Gear('Surgery Kit','+3 Medicine(Surgery).',3);
    const iThermometer = new Gear('Thermometer','+1 Medicine. Accurately reads temperature.',0);
    const iTransfusionKit = new Gear('Transfusion Kit','Medicine 9#. 1HP/15mins. Heal to 1HP max.',1);
    const iMedicalList = [iBandage,iCrutch,iEMTBag,iFirstAidKit,iPressureCuff,iStethoscope,iSurgeryKit,iThermometer,iTransfusionKit];
    //ELECTRONICS
    const iCellphone = new Gear('Cellphone','1yd light, camera, remote control. 3hr use.',1);
    const iEmergencyRadio = new Gear('Emergency Radio','AM/FM/Shortwave. 1yd light. 6hr use.',1);
    const iFlashlight = new Gear('Flashlight','50yd light, . 3hr use. -3 RATK to Blind 1rnd.',1);
    const iGeigerCounter = new Gear('Geiger Counter','Science 6# to detect Radiation in 1yd.',2);
    const iHandRadio = new Gear('Hand Radio','9-channel 2-way radio. 3 mile range. 9hr use.',1);
    const iHeadlamp = new Gear('Headlamp','3yd light. Hands free. 3hr use.',0);
    const iLantern = new Gear('Lantern','3yd light radius. 6hr use.',2);
    const iMegaphone = new Gear('Megaphone','+1 Leadership when speaking to a crowd.',2);
    const iMultimeter = new Gear('Multimeter','+3 Science((Tech)). Detect electricity.',1);
    const iNightvisionGoggles = new Gear('Nightvision Goggles','Ignore Visibility penalties from darkness.',1);
    const iQuadcopterDrone = new Gear('Quadcopter Drone','Science 6#. Camera. 90yd Speed. 15min use.',2);
    const iRadioJammer = new Gear('Radio Jammer','No radio signal within 100yds. 3hr use.',1);
    const iRCCar = new Gear('RC Car','Science 3#. 45yd Speed. 15min use.',3);
    const iSolarLamp = new Gear('Solar Lamp','1yd light radius. 1day charge is 9hr use.',1);
    const iStunGun = new Gear('Stun Gun','MATK. C9# or Stun for 1rnd. 10 uses.',1);
    const iElectronicsList = [iCellphone,iEmergencyRadio,iFlashlight,iGeigerCounter,iHandRadio,iHeadlamp,iLantern,iMegaphone,iMultimeter,iNightvisionGoggles,iQuadcopterDrone,iRadioJammer,iRCCar,iSolarLamp,iStunGun];
    //DOCUMENTS
    const iBodyInBalance = new Gear('"Body in Balance"','+1 Athletics',1);
    const iBookOfNinja = new Gear('"Book of Ninja"','+1 Stealth',1);
    const iGeneralScienceKnowledge = new Gear('"General Science Knowledge"','+1 Science',1);
    const iDefensiveDriving = new Gear('"Defensive Driving"','+1 Drive',1);
    const iDogTricks = new Gear('"Dog Tricks"','+1 Tame',1);
    const iEffectiveHabits = new Gear('"Effective Habits"','+1 to any one Skill',1);
    const iEngineeringConcepts = new Gear('"Engineering Concepts"','+1 Build',1);
    const iGraysAnatomy = new Gear('"Gray\'s Anatomy"','+1 Medicine',1);
    const iHolyBook = new Gear('Holy Book','-1 Psyche',1);
    const iHomeSecurity = new Gear('"Home Security"','+1 Larceny',1);
    const iHowToWinFriends = new Gear('"How to Win Friends"','+1 Socialize',1);
    const iHowYogaWorks = new Gear('"How Yoga Works"','+1 Acrobatics',1);
    const iLeadershipBasics = new Gear('"Leadership Basics"','+1 Leadership',1);
    const iPersonalDefense = new Gear('"Personal Defense"','+1 Ranged',1);
    const iSASSurvivalGuide = new Gear('"SAS Survival Guide"','+1 Survival',1);
    const iStandupComedy = new Gear('"Stand-up Comedy"','+1 Entertain',1);
    const iTaoOfJeetKuneDo = new Gear('"Tao of Jeet Kune Do"','+1 Melee',1);
    const iYellowPages = new Gear('"Yellow Pages"','Regional. +1 Scavenging.',1);
    const iZenMind = new Gear('"Zen Mind"','+1 Perception',1);
    const iClassicNovel = new Gear('Classic Novel','+1 Psyche',1);
    const iEnglishSpanishDictionary = new Gear('English-Spanish Dictionary','English-Spanish translation.',1);
    const iMapAtlas = new Gear('Map (Atlas)','+1 Survival(Navigate)',1);
    const iMapLocal = new Gear('Map (Local)','Regional. +1 Survival(Navigate).',0);
    const iMapTopographic = new Gear('Map (Topographic)','Regional. +3 Survival(Navigate).',0);
    const iDocumentsList = [iBodyInBalance,iBookOfNinja,iGeneralScienceKnowledge,iDefensiveDriving,iDogTricks,iEffectiveHabits,iEngineeringConcepts,iGraysAnatomy,iHolyBook,iHomeSecurity,iHowToWinFriends,iHowYogaWorks,iLeadershipBasics,iPersonalDefense,iSASSurvivalGuide,iStandupComedy,iTaoOfJeetKuneDo,iYellowPages,iZenMind,iClassicNovel,iEnglishSpanishDictionary,iMapAtlas,iMapLocal,iMapTopographic];
    //STORAGE
    const iBackpack = new Gear('Backpack','30 Slots. 2rnds to access.',1);
    const iBandoleer = new Gear('Bandoleer','Holds 50 bullets of any caliber.',0);
    const iBDUJacket = new Gear('BDU Jacket','4x 1 Slots. Camo +1.',0);
    const iCargoPants = new Gear('Cargo Pants','6x 1 Slots. Camo +1.',1);
    const iCanteen = new Gear('Canteen','Holds 1 unit (.5gal) of liquid. Metal.',1);
    const iConcealedHolster = new Gear('Concealed Holster','1 Slot. Perception 12# to spot a Size 1 Gun.',0);
    const iCooler = new Gear('Cooler','30 Slots. Hunted or Foraged Food lasts 6 days.',4);
    const iDuffelBag = new Gear('Duffel Bag','40 Slots. 2rnds to access.',3);
    const iFuelCan = new Gear('Fuel Can','5gal Fuel. d6FDMG/gal, 1min, 1yd/gal Blast.',2);
    const iHoody = new Gear('Hoody','2x 1 Slots. CR.',0);
    const iHydrationPack = new Gear('Hydration Pack','Holds 4 units (2gal) of liquid.',1);
    const iLockbox = new Gear('Lockbox','1 Slot. 10HP. 6DR. FR. Larceny(Disable) 9#.',2);
    const iMessengerBag = new Gear('Messenger Bag','4 Slots. 1rnd to access.',2);
    const iPlasticJug = new Gear('Plastic Jug', 'Holds 2 units (1gal) of liquid.',1);
    const iPurse = new Gear('Purse','3 Slots. 1rnd to access.',1);
    const iSpeedloader = new Gear('Speed-loader','Reload a revolver cylinder as 1 action.',0);
    const iToolBelt = new Gear('Tool Belt','6x 1 Slots. +1 Build. Miscellaneous small tools.',2);
    const iTrenchCoat = new Gear('Trench Coat','2x 2 Slots. CR. +1 Stealth.',1);
    const iWaterBottle = new Gear('Water Bottle','Holds 1 unit (.5gal) of liquid.',1);
    const iStorageList = [iBackpack,iBandoleer,iBDUJacket,iCargoPants,iCanteen,iConcealedHolster,iCooler,iDuffelBag,iFuelCan,iHoody,iHydrationPack,iLockbox,iMessengerBag,iPlasticJug,iPurse,iSpeedloader,iToolBelt,iTrenchCoat,iWaterBottle];
    //EQUIPMENT
    const iAirHorn = new Gear('Air Horn','Emits a loud shriek up to a 1 mile radius.',1);
    const iBalaclava = new Gear('Balaclava','+1 Stealth. Mask. CR.',0);
    const iBandanna = new Gear('Bandanna','+1 C vs airborne toxins. Can use as Bandage.',0);
    const iBaseballCap = new Gear('Baseball Cap','Reduce Visibility(Rain and Sun) penalty by 1.',0);
    const iBicycle = new Gear('Bicycle','Athletics 3#. Speed x3yds (x.7mph). 2h.',8);
    const iBinoculars = new Gear('Binoculars','+3 Perception(See) at 50+yds.',1);
    const iBobbyPin = new Gear('Bobby Pin','Allows Larceny(Disable) roll on key locks.',0);
    const iBoltCutters = new Gear('Bolt Cutters','C9# to cut metal (Handcuffs, Padlocks, etc).',3);
    const iCageTrap = new Gear('Cage Trap','+3 Survival(Forage). Takes 1day.',6);
    const iCandle = new Gear('Candle','1yd light radius for 6hrs.',0);
    const iCandy = new Gear('Candy','Restores 1 Luck point. 1/day.',0);
    const iCarabiner = new Gear('Carabiner','+1 Athletics(Climb and Rappel). Holds 50Sz.',0);
    const iCompass = new Gear('Compass','+3 Survival(Navigate). Always points North.',0);
    const iCowboyHat = new Gear('Cowboy Hat','Reduce Visibility(Rain and Sun) penalty by 3.',0);
    const iChalk = new Gear('Chalk','Used to temporarily write on any surface.',0);
    const iChemical = new Gear('Chemical','Substances used for Science(Chemistry).',1);
    const iChokerLeash = new Gear('Choker Leash','+3 Tame. Grabbed. C +3 vs C to control.',1);
    const iDuctTape = new Gear('Duct Tape','+1 Build/1yd or use 2yds as Handcuffs. 60yds.',1);
    const iDustMask = new Gear('Dust Mask','+3 C vs airborne toxins. Mask.',1);
    const iEarPlugs = new Gear('Ear Plugs','No Deafness from noise. -3 Perception(Hear).',9);
    const iEggTimer = new Gear('Egg Timer','Set up to 60mins. Loud ringing for 1min.',1);
    const iFirestick = new Gear('Fire-stick','+3 Survival(Camp). Magnesium rod and steel.',0);
    const iFishingPole = new Gear('Fishing Pole','+1 Survival(Forage) at river, lake, or ocean.',2);
    const iFlareGun = new Gear('Flare Gun','Pistol. RNG:3. Ammo: 12g Flares or 1 use 12g.',1);
    const iFlippers = new Gear('Flippers','+3 Athletics(Swim). -6 walking Speed.',2);
    const iFood = new Gear('Food','Contains 1 Food to feed a person for a day.',1);
    const iGasMask = new Gear('Gas Mask','+6 C vs airborne toxins. Mask. -1 Perception.',1);
    const iGlassCutter = new Gear('Glass Cutter','Cuts glass quietly.',0);
    const iGoggles = new Gear('Goggles','+3 C to resist toxins in eyes.',1);
    const iGrapplingHook = new Gear('Grappling Hook','+3 Athletics(Climb and Rappel). Holds 100Sz.',2);
    const iGunCleaningKit = new Gear('Gun Cleaning Kit','Gun gets +1 RATK for 1day. Takes 1hr/gun.',1);
    const iHacksaw = new Gear('Hacksaw','1DMG/rnd of sawing to almost any material.',2);
    const iHammock = new Gear('Hammock','Suspended sleeping device for 1 person.',1);
    const iHandcuffs = new Gear('Handcuffs','Grabbed. A15# to escape. Larceny(Disable) 12#.',1);
    const iLeatherBelt = new Gear('Leather Belt','1yd strap. Stops Limb Bleeding. Holds 50Sz.',1);
    const iLifejacket = new Gear('Lifejacket','+6 Athletics(Swim). Prevents drowning.',2);
    const iLighter = new Gear('Lighter','Makes a small fire. 1yd radius light.',0);
    const iLockpicks = new Gear('Lockpicks','+3 Larceny(Disable) key locks. 6 picks.',1);
    const iLuxuryItem = new Gear('Luxury Item','Toilet paper, cigarette, etc. +1 Psyche 1/wk.',0);
    const iMagnifyingGlass = new Gear('Magnifying Glass','+6 Perception(See) to inspect tiny details.',1);
    const iMakeup = new Gear('Makeup','+1 Socialize and Entertain for 6hrs. 30 uses.',0);
    const iMarbles = new Gear('Marbles','30/bag. 2sqyd area. A12# or fall Prone.',1);
    const iMarker = new Gear('Marker','Used to permanently write on any surface.',0);
    const iMatchbook = new Gear('Matchbook','+1 Survival(Camp). 1yd light radius, 3rnds.',0);
    const iMeasuringCup = new Gear('Measuring Cup','+3 Science(Chemistry). Marked glass cup.',1);
    const iMonocular = new Gear('Monocular','+1 Perception(See) at 25+yds.',1);
    const iMultiTool = new Gear('Multi-Tool','+1 Larceny(Disable), Build, Science((Tech)).',1);
    const iMusicalInstrument = new Gear('Musical Instrument','+1 Entertain(Distract and Inspire).',1);
    const iMylarBlanket = new Gear('Mylar Blanket','CR. 1yd x 2yd reflective foil sheet.',0);
    const iNotebook = new Gear('Notebook','100 pages of paper with a wire binding.',1);
    const iPadlock = new Gear('Padlock','10HP. 6DR. Larceny(Disable) 9#.',1);
    const iParacord = new Gear('Paracord','60yd coil. Holds 50Sz.',1);
    const iPart = new Gear('Part','Scrap used for Build and Science((Tech)).',1);
    const iPepperSpray = new Gear('Pepper Spray','+1 Ranged(Gun). RNG:1. 3 Pain. 3 uses. Toxin.',0);
    const iPocketMirror = new Gear('Pocket Mirror','Perception(See) 6# to see from behind Cover.',0);
    const iPoncho = new Gear('Poncho','CR. Waterproof.',0);
    const iRatTrap = new Gear('Rat Trap','+1 Survival(Forage). Takes 1day.',1);
    const iRoadFlare = new Gear('Road Flare','3FDMG. 10yd light radius for 20mins.',1);
    const iRollerblades = new Gear('Rollerblades','Athletics 6#. Speed x3. 1rnd equip. Fail:Prone.',2);
    const iRope = new Gear('Rope','30yd nylon coil. Holds 100Sz.',2);
    const iRunningShoes = new Gear('Running Shoes','+1 mile of Jogging distance.',2);
    const iSkateboard = new Gear('Skateboard','Athletics 6#. Speed x3. Fail:Prone.',3);
    const iSleepingBag = new Gear('Sleeping Bag','Insulated bag for up to 2 people. CR +3hrs.',3);
    const iSnorkel = new Gear('Snorkel','Breathe while just beneath water\'s surface.',1);
    const iSpottingScope = new Gear('Spotting Scope','+6 Perception(See) at 100+yds.',2);
    const iSprayPaint = new Gear('Spray Paint','RATK Called Shot:Head. Blind d6rnds. 10 uses.',1);
    const iSunglasses = new Gear('Sunglasses','No Visibility(Sun) penalty. +1 C vs light.',0);
    const iSwissArmyKnife = new Gear('Swiss Army Knife','+1 Build and Survival.',1);
    const iTapeMeasure = new Gear('Tape Measure','+1 Build. 10yd long wind-up metal tape.',2);
    const iTarp = new Gear('Tarp','3yd x 3yd plastic sheet. CR. Waterproof.',1);
    const iTent = new Gear('Tent','4 person. 5min setup/take-down. CR +3hrs.',6);
    const iThermalUnderwear = new Gear('Thermal Underwear','CR. Can use as 6 Bandages.',1);
    const iToolBag = new Gear('Tool Bag','+3 Build. Pliers, wrenches, level, etc.',3);
    const iWaterFilter = new Gear('Water Filter','Purifies 1 Water ration (.5gal) per minute.',1);
    const iWhetstone = new Gear('Whetstone','Blade gets +1 DMG for 1day. Takes 1hr/blade.',1);
    const iWhistle = new Gear('Whistle','+1 Tame(Train). Loud shriek 500yd radius.',0);
    const iWireSaw = new Gear('Wire Saw','1DMG/rnd of sawing to wood or bone.',1);
    const iWristwatch = new Gear('Wristwatch','Tells time and +1 Survival(Navigate).',0);
    const iZipTie = new Gear('Zip Tie','Grabbed. C9# to escape. Use for +1 Build.',0);
    const iEquipmentList = [iAirHorn,iBalaclava,iBandanna,iBaseballCap,iBicycle,iBinoculars,iBobbyPin,iBoltCutters,iCageTrap,iCandle,iCandy,iCarabiner,iCompass,iCowboyHat,iChalk,iChemical,iChokerLeash,iDuctTape,iDustMask,iEarPlugs,iEggTimer,iFirestick,iFishingPole,iFlareGun,iFlippers,iFood,iGasMask,iGlassCutter,iGoggles,iGrapplingHook,iGunCleaningKit,iHacksaw,iHammock,iHandcuffs,iLeatherBelt,iLifejacket,iLighter,iLockpicks,iLuxuryItem,iMagnifyingGlass,iMakeup,iMarbles,iMarker,iMatchbook,iMeasuringCup,iMonocular,iMultiTool,iMusicalInstrument,iMylarBlanket,iNotebook,iPadlock,iParacord,iPart,iPepperSpray,iPocketMirror,iPoncho,iRatTrap,iRoadFlare,iRollerblades,iRope,iRunningShoes,iSkateboard,iSleepingBag,iSnorkel,iSpottingScope,iSprayPaint,iSunglasses,iSwissArmyKnife,iTapeMeasure,iTarp,iTent,iThermalUnderwear,iToolBag,iWaterFilter,iWhetstone,iWhistle,iWireSaw,iWristwatch,iZipTie];

    //VEHICLES
    function Vehicle(type,hp,dr,dmg,spd,mph,han,mpg,fuel,occ,car,area,sz){
        this.type = type;
        this.hp = hp;
        this.dr = dr;
        this.dmg = dmg;
        this.spd = spd;
        this.mph = mph;
        this.han = han;
        this.mpg = mpg;
        this.fuel = fuel;
        this.occ = occ;
        this.car = car;
        this.area = area;
        this.sz = sz;
    }
    const iAmbulance = new Vehicle('Ambulance',40,1,10,120,80,'-3',10,35,4,200,'7x3');
    const iBoxTruck = new Vehicle('Box Truck',40,1,10,90,60,'-3',10,40,2,1600,'10x3');
    const iBus = new Vehicle('Bus',50,3,12,90,60,'-6',15,100,60,1200,'12x4');
    const iMotorcycle = new Vehicle('Motorcycle',20,0,4,150,100,'+1',40,5,2,30,'3x1');
    const iMuscleCar = new Vehicle('Muscle Car',40,1,6,180,120,'+1',10,20,4,80,'5x2');
    const iPickupTruck = new Vehicle('Pickup Truck',40,1,8,150,100,'-1',20,20,2,400,'6x2');
    const iPoliceCruiser = new Vehicle('Police Cruiser',40,1,6,180,120,'+1',10,20,4,100,'5x2');
    const iSedan = new Vehicle('Sedan',30,1,6,150,100,'+0',30,12,4,100,'5x2');
    const iSemitruck = new Vehicle('Semi-truck',50,3,12,90,60,'-6',5,120,2,16000,'25x4');
    const iStreetBike = new Vehicle('Street Bike',20,0,4,180,120,'+3',50,5,2,10,'3x1');
    const iSUV = new Vehicle('SUV',40,1,8,150,100,'-1',15,25,6,200,'6x2');
    const iVan = new Vehicle('Van',40,1,10,120,80,'-3',10,35,12,1200,'7x3');
    const iLandVehiclesList = [iAmbulance,iBoxTruck,iBus,iMotorcycle,iMuscleCar,iPickupTruck,iPoliceCruiser,iSedan,iSemitruck,iStreetBike,iSUV,iVan];

    const iAirliner = new Vehicle('Airliner',150,3,'',900,600,'-6',.5,5300,150,6000,'34x32',14000);
    const iAirplane = new Vehicle('Airplane',40,0,'',240,160,'-3',15,55,4,200,'9x13',340);
    const iChinook = new Vehicle('Chinook',120,9,'',240,160,'-6',.1,9000,40,1000,'33x22');
    const iFighterJet = new Vehicle('Fighter Jet',80,6,'',1800,1200,'-6',1,2200,1,5,'19x13',4600);
    const iGyrocopter = new Vehicle('Gyrocopter',10,0,'',180,120,'+0',16,20,1,30,'9x9');
    const iHelicopter = new Vehicle('Helicopter',50,0,'',210,140,'+3',5,30,8,500,'13x11');
    const iAircraftList = [iAirliner,iAirplane,iChinook,iFighterJet,iGyrocopter,iHelicopter];

    const iAirboat = new Vehicle('Airboat',20,0,'',90,60,'+1',5,50,6,500,'3x2');
    const iCanoe = new Vehicle('Canoe*',10,0,'','C x3','C x2','-6',0,0,4,50,'3x1');
    const iCatamaran = new Vehicle('Catamaran',40,1,'',90,60,'-3',15,200,4,500,'6x4');
    const iInflatableRaft = new Vehicle('Inflatable Raft*',4,0,'','C x1.5','C ','+0',0,0,6,50,'4x2');
    const iJetSki = new Vehicle('Jet Ski',20,0,'',90,60,'+3',5,15,3,0,'3x1');
    const iKayak = new Vehicle('Kayak*',6,0,'','C x1.5','C ','+1',0,0,1,20,'1x2');
    const iMotorboat = new Vehicle('Motorboat',20,0,'',60,40,'+1',10,10,6,100,'6x2');
    const iRowboat = new Vehicle('Rowboat*',12,0,'','C x1.5','C ','-1',0,0,4,100,'3x1');
    const iSloop = new Vehicle('Sloop',50,3,'',60,40,'-6',0,0,10,1000,'20x4');
    const iSpeedboat = new Vehicle('Speedboat',30,1,'',90,60,'+1',5,100,4,200,'8x3');
    const iTrawler = new Vehicle('Trawler',60,6,'',30,20,'-6',1.5,1000,8,10000,'12x6');
    const iYacht = new Vehicle('Yacht',100,3,'',60,40,'-6',1,1500,25,5000,'30x8');
    const iWatercraftList = [iAirboat,iCanoe,iCatamaran,iInflatableRaft,iJetSki,iKayak,iMotorboat,iRowboat,iSloop,iSpeedboat,iTrawler,iYacht];
/*
    const iArmyTruck = new Vehicle('',,,,,,'','',,,,);
    const iAPC = new Vehicle('',,,,,,'','',,,,);
    const iATV = new Vehicle('',,,,,,'','',,,,);
    const iBankTruck = new Vehicle('',,,,,,'','',,,,);
    const iBulldozer = new Vehicle('',,,,,,'','',,,,);
    const iDirtBike = new Vehicle('',,,,,,'','',,,,);
    const iDuneBuggy = new Vehicle('',,,,,,'','',,,,);
    const iFireEngine = new Vehicle('',,,,,,'','',,,,);
    const iHumvee = new Vehicle('',,,,,,'','',,,,);
    const iRV = new Vehicle('',,,,,,'','',,,,);
    const iTank = new Vehicle('',,,,,,'','',,,,);
    const iWagon = new Vehicle('',,,,,,'','',,,,);
    const iRareLandVehicleList = [iArmyTruck,iAPC,iATV,iBankTruck,iBulldozer,iDirtBike,iDuneBuggy,iFireEngine,iHumvee,iRV,iTank,iWagon];
*/

    //VEHICLE CUSTOMIZATIONS
    const cAirBag = new Gear('Air Bag**','Build 12#. -3 Wreck BDMG to the Head for 1 occupant.',6);
    const cAirFilter = new Gear('Air Filter','Build 9#. +6C vs airborne toxins for occupants.',3);
    const cBackupFuelTank = new Gear('Backup Fuel Tank','Build # varies. +1 Fuel per 2 Size, 1 Part and 1#.','varies');
    const cBallisticGlass = new Gear('Ballistic Glass','Build 9#. 3 DR for windows.',6);
    const cBodySpines = new Gear('Body Spines','Build 3#. Dodge 9# to jump on or take 6DMG (Pierce).',9);
    const cBrushGuard = new Gear('Brush Guard','Build 9#. +1 DR vs front collisions.',12);
    const cCargoRack = new Gear('Cargo Rack**','Build 9#. +25% Carry capacity (round down).',6);
    const cCBRadio = new Gear('CB Radio','Build 12#. 40-channel 2-way radio. 6 mile range.',3);
    const cEjectorSeat = new Gear('Ejector Seat**','Build 12#. Throw occupant out of vehicle. See Wreck.',12);
    const cEnhancedBrakes = new Gear('Enhanced Brakes','Build 6#. Brake at -20mph/rnd.',3);
    const cExoCage = new Gear('Exo-Cage','Build 15#. Get one extra Prestine Condition level.',18);
    const cFireSuppression = new Gear('Fire Suppression','Build 9#. Puts out any fires on/in vehicle.',6);
    const cFixedGun = new Gear('Fixed Gun**','Build 3#*. Driver uses Drive(Combat) for RATK rolls.',3);
    const cFloodLights = new Gear('Flood Lights','Build 9#. No Visibility penalty in darkness. 10yds.',3);
    const cFrameJack = new Gear('Frame Jack**','Build 9#. Tire change time is halved on one side.',6);
    const cFuelCapLock = new Gear('Fuel Cap Lock','Build 3#. 10HP. Larceny(Disable) 9# takes d6mins.',0);
    const cHiddenCompartment = new Gear('Hidden Compartment','Build 9#. Perception 12# to find. Holds 2Sz.',0);
    const cHighFlowExhaust = new Gear('High-Flow Exhaust','Build 6#. Accelerate at +20mph/rnd.',3);
    const cHubcapBlades = new Gear('Hubcap Blades','Build 6#. +1 DR for side collisions.',9);
    const cIntakeSnorkel = new Gear('Intake Snorkel','Build 6#. Drive through water up to the windows.',3);
    const cKeypadIgnition = new Gear('Keypad Ignition','Build 12#. Coded starter. Science(Tech) 12# to break.',0);
    const cLuxurySuspension = new Gear('Luxury Suspension','Build 18#. Reduces Unstable penalty to -1.',12);
    const cNitrousBooster = new Gear('Nitrous Booster**','Build 15#. +20mph Speed and -3 Han for 1rnd. 3 uses.',3);
    const cParachute = new Gear('Parachute','Build 12#. Stops vehicle in 1rnd. 10rnds to repack.',6);
    const cPayloadDropper = new Gear('Payload Dropper**','Build 6#. Bomb or Jacks (Drive 12# or d6 flats).',3);
    const cRackAndPinion = new Gear('Rack and Pinion','Build 12#. +1 Han. Requires driver Constitution 3+.',6);
    const cRamPlow = new Gear('Ram Plow','Build 12#. +3 DR for front collisions. -25% MPG.',15);
    const cRunFlatTires = new Gear('Run-Flat Tires','Build 6#. +3 HP for Tires. Sz = 1 per Tire.','varies');
    const cSafetyHarness = new Gear('Safety Harness**','Build 6#. -1 Wreck BDMG for 1 occupant. Takes 3rnds.',1);
    const cSlickDispenser = new Gear('Slick Dispenser**','Build 3#. 1 Fuel, Drive vs Drive to Wreck pursuer.',6);
    const cSteelPlates = new Gear('Steel Plates','Build 15#. +3 DR for entire Vehicle. Sz = [Carry /2].','varies');
    const cStrutBraces = new Gear('Strut Braces','Build 6#. +1 Drive(Stunt).',6);
    const cSupercharger = new Gear('Supercharger','Build 18#. +20mph (+30yd) maximum Speed.',9);
    const cTireChains = new Gear('Tire Chains','Build 3#. Ignore Terrain penalties. -25% Speed.',9);
    const cTurretGun = new Gear('Turret Gun**','Build 6#*. Passenger uses Ranged for RATK rolls.',9);
    const cWinch = new Gear('Winch**','Build 9#. 30yd cable. 1yd/min. Hauls 2000Sz.',15);
    const iVehicleCustomizationsList = [cAirBag,cAirFilter,cBackupFuelTank,cBallisticGlass,cBodySpines,cBrushGuard,cCargoRack,cCBRadio,cEjectorSeat,cEnhancedBrakes,cExoCage,cFireSuppression,cFixedGun,cFloodLights,cFrameJack,cFuelCapLock,cHiddenCompartment,cHighFlowExhaust,cHubcapBlades,cIntakeSnorkel,cKeypadIgnition,cLuxurySuspension,cNitrousBooster,cParachute,cPayloadDropper,cRackAndPinion,cRamPlow,cRunFlatTires,cSafetyHarness,cSlickDispenser,cSteelPlates,cStrutBraces,cSupercharger,cTireChains,cTurretGun,cWinch];

    const iMasterGearList = [iArmyHelmet,iAthleticPads,iCoveralls,iDenimJacket,iFirefighterSuit,iFlakJacket,iGhillieSuit,iHikingBoots,iInterceptorArmor,iKevlarGloves,iKevlarVest,iKneePads,iLeatherJacket,iMotorcycleHelmet,iNBCSuit,iPaintballMask,iPlateCarrier,iRiotHelmet,iSportsHelmet,iSteelToeBoots,iTacticalVest,iUndercoverVest,iWinterCoat,iWorkGloves,
        iAx,iBaseballBat,iBrassKnuckles,iBaton,iCane,iCleaver,iCrowbar,iFirepoker,iGarrote,iHammer,iHatchet,iKnife,iMachete,iMetalClub,iPickax,iPitchfork,iRiotShield,iScrewdriver,iShovel,iSledgehammer,iSpear,iStaff,iTireIron,iTorch,
        iAK47,iAR15,iBenelliM4,iBrowningABolt,iColtPython,iCompoundBow,iCrossbow,iGlock17,iHKMP5,iHenryGoldenBoy,iKimber1911,iMAC10,iMarlin1894C,iMossberg500,iNorincoSKS,iRemington700,iRemington870,iRuger1022,iRugerMkIII,iSIGSauerP290,iSavageMkII,iSpringfieldM1A,iSWSnubnose,iWinchesterSawnoff,
        iCellphone,iEmergencyRadio,iFlashlight,iGeigerCounter,iHandRadio,iHeadlamp,iLantern,iMegaphone,iMultimeter,iNightvisionGoggles,iQuadcopterDrone,iRadioJammer,iRCCar,iSolarLamp,iStunGun,
        iBackpack,iBandoleer,iBDUJacket,iCargoPants,iCanteen,iConcealedHolster,iCooler,iDuffelBag,iFuelCan,iHoody,iHydrationPack,iLockbox,iMessengerBag,iPlasticJug,iPurse,iSpeedloader,iToolBelt,iTrenchCoat,iWaterBottle,
        iAirHorn,iBalaclava,iBandanna,iBaseballCap,iBicycle,iBinoculars,iBobbyPin,iBoltCutters,iCageTrap,iCandle,iCandy,iCarabiner,iCompass,iCowboyHat,iChalk,iChemical,iChokerLeash,iDuctTape,iDustMask,iEarPlugs,iEggTimer,iFirestick,iFishingPole,iFlareGun,iFlippers,iFood,iGasMask,iGlassCutter,iGoggles,iGrapplingHook,iGunCleaningKit,iHacksaw,iHammock,iHandcuffs,
        iLeatherBelt,iLifejacket,iLighter,iLockpicks,iLuxuryItem,iMagnifyingGlass,iMakeup,iMarbles,iMarker,iMatchbook,iMeasuringCup,iMonocular,iMultiTool,iMusicalInstrument,iMylarBlanket,iNotebook,iPadlock,iParacord,iPart,iPepperSpray,iPocketMirror,iPoncho,iRatTrap,iRoadFlare,iRollerblades,iRope,iRunningShoes,
        iSkateboard,iSleepingBag,iSnorkel,iSpottingScope,iSprayPaint,iSunglasses,iSwissArmyKnife,iTapeMeasure,iTarp,iTent,iThermalUnderwear,iToolBag,iWaterFilter,iWhetstone,iWhistle,iWireSaw,iWristwatch,iZipTie,
        i22AmmoList,i45AmmoList,i357AmmoList,i556AmmoList,i762AmmoList,i308AmmoList,i12gAmmoList,iArrowAmmoList,iBombsList,
        iDocumentsList,iDrugsList,iGunAccessoryList,iMedicalList,iAircraftList,iLandVehiclesList,iWatercraftList,iRareArmorList,iRareWeaponsList,'REROLL + BONUS ROLL'];

    //POPULATE GEAR SECTION
    (function(){
        let armorTable = '';
        for (let i in iArmorList){
            const thisArmor = iArmorList[i];
            armorTable += '<button id="GearArmor'+thisArmor.type+'Btn" class="Btn">'+thisArmor.type.toUpperCase()+'</button><button id="GearArmor'+thisArmor.type+'Sec" class="Sec4"><p>AR: '+thisArmor.ar+'</p><p>Location(s): '+thisArmor.loc+'</p><p>Notes: '+thisArmor.notes+'</p><p>Size: '+iArmorList[i].sz+'</p></button>';
        }
        armorTable += '</div>';
        document.getElementById('GearArmorTableSec').innerHTML += armorTable;

        let meleeTable = '';
        for (let i in iMeleeWeaponsList){
            const thisMelee = iMeleeWeaponsList[i];
            meleeTable += '<button id="GearMelee'+thisMelee.type+'Btn" class="Btn">'+thisMelee.type.toUpperCase()+'</button><button id="GearMelee'+thisMelee.type+'Sec" class="Sec4"><p>DMG: '+thisMelee.dmg+'</p><p>Hands: '+thisMelee.hands+'</p><p>Notes: '+thisMelee.notes+'</p><p>Size: '+thisMelee.sz+'</p></button>';
        }
        meleeTable += '</div>';
        document.getElementById('GearMeleeTableSec').innerHTML += meleeTable;

        let rangedTable = '';
        for (let i in iRangedWeaponsList){
            const thisRanged = iRangedWeaponsList[i];
            rangedTable += '<button id="GearRanged'+thisRanged.type+'Btn" class="Btn">'+thisRanged.type.toUpperCase()+'</button><button id="GearRanged'+thisRanged.type+'Sec" class="Sec4"><p>DMG: '+thisRanged.dmg+'</p><p>Range: '+thisRanged.rng+'</p><p>Caliber: '+thisRanged.cal+'</p><p>Ammo: '+thisRanged.mag+'</p><p>Hands: '+thisRanged.hands+'</p><p>Notes: '+thisRanged.notes+'</p><p>Size: '+thisRanged.sz+'</p></button>';
        }
        rangedTable += '</div>';
        document.getElementById('GearRangedTableSec').innerHTML += rangedTable;

        let bombTable = '';
        for (let i in iBombsList){
            const thisBomb = iBombsList[i];
            bombTable += '<button id="GearBombs'+thisBomb.type+'Btn" class="Btn">'+thisBomb.type.toUpperCase()+'</button><button id="GearBombs'+thisBomb.type+'Sec" class="Sec4"><p>DMG: '+thisBomb.dmg+'</p><p>Blast: '+thisBomb.blast+'</p><p>Duration: '+thisBomb.duration+'</p><p>Effects: '+thisBomb.effects+'</p><p>Mix: '+thisBomb.mix+'</p><p>Size: '+thisBomb.sz+'</p></button>';
        }
        bombTable += '</div>';
        document.getElementById('GearBombsTableSec').innerHTML += bombTable;

        function fillTable(list, name){
            let existing = document.getElementById('Gear'+name+'TableSec').innerHTML;
            let entry = '';
            for (let i in list){
                entry += '<button id="Gear'+name+list[i].type+'Btn" class="Btn">'+list[i].type.toUpperCase()+'</button><button id="Gear'+name+list[i].type+'Sec" class="Sec4"><p>Notes: '+list[i].notes+'</p><p>Size: '+list[i].sz+'</p></button>';
            }
            entry += '</div>';
            document.getElementById('Gear'+name+'TableSec').innerHTML = entry + existing;
        }

        function fillVehicleTable(list, name){
            let existing = document.getElementById('Gear'+name+'Sec').innerHTML;
            let entry = '';
            for (let i in list){
                entry += '<button id="Gear'+name+list[i].type+'Btn" class="Btn">'+list[i].type.toUpperCase()+'</button><button id="Gear'+name+list[i].type+'Sec" class="Sec4"><p>HP: '+list[i].hp+'</p><p>DR: '+list[i].dr+'</p><p>DMG: '+list[i].dmg+'</p><p>Tactical Speed: '+list[i].spd+' yds/rnd</p><p>Travel Speed: '+list[i].mph+'mph</p><p>Handle: '+list[i].han+'</p><p>Area: '+list[i].area+' yds</p><p>MPG: '+list[i].mpg+'</p><p>Fuel: '+list[i].fuel+' gal</p><p>Occupants: '+list[i].occ+'</p><p>Cargo: '+list[i].car+' Size</p></button>';
            }
            if (list === iWatercraftList) {
                entry += '<p>* Use the average Constitution of all Occupants (not just rowers) when determining Speed.</p>';
            }
            entry += '</div><p>HP: Health Points. Disabled at 50% HP and destroyed at 0HP.</p><p>DR: Damage Reduction. Reduces DMG to vehicles.</p><p>Tactical Speed (yds/rnd). Travel Speed (mph).</p><p>Handle: Modifier to all Drive rolls.</p><p>Area: Length and width dimensions in yards. Area x60 = LAND VEHICLE Size.</p><p>Cargo: -1 Handle per 10% over. 40 Size = 1 Occupant.</p>';
            document.getElementById('Gear'+name+'Sec').innerHTML = existing + entry;
        }

        fillTable(iGunAccessoryList, 'GunAccessories');
        fillTable(iAmmoList,'Ammo');
        fillTable(iDrugsList, 'Drugs');
        fillTable(iMedicalList, 'Medical');
        fillTable(iElectronicsList, 'Electronics');
        fillTable(iDocumentsList, 'Documents');
        fillTable(iStorageList, 'Storage');
        fillTable(iEquipmentList, 'Equipment');
        fillTable(iVehicleCustomizationsList, 'VehicleCustomizations');
        fillVehicleTable(iLandVehiclesList, 'LandVehicles');
        fillVehicleTable(iAircraftList, 'Aircraft');
        fillVehicleTable(iWatercraftList, 'Watercraft');
    })();

</script>