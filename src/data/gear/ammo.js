 
  //AMMO

  function Ammo(type, notes, sz){
    this.type = type;
    this.notes = notes;
    this.sz = sz;
}
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
