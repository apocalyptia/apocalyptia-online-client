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
