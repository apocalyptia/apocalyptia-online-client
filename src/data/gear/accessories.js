function Accessory(type, notes, sz){
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
