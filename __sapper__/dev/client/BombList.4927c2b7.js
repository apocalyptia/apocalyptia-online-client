import { B as Bayonet, a as Bipod, D as DrumMagazine, F as Foregrip, H as Holosight, L as Laser, S as Scope, b as SinglePointSling, c as Suppressor, d as FlashbangGrenade, e as FragGrenade, M as MolotovCocktail, f as SmokeGrenade, T as TeargasGrenade, g as Thermite } from './Thermite.a457c57f.js';
import { A as ArrowList, L as List22, c as List9mm, d as List357, e as List556, f as List308, g as List12g, h as AthleticHelmet, i as AthleticPads, C as CombatHelmet, j as Coveralls, F as FirefighterSuit, k as Camo, G as GhillieSuit, H as HikingBoots, K as KevlarVest, l as LeatherJacket, m as MotorcycleHelmet, n as HazmatSuit, P as PlateCarrier, W as WinterCoat, o as WorkGloves } from './StorageList.71288974.js';

const AccessoryList = [
	Bayonet,
	Bipod,
	DrumMagazine,
	Foregrip,
	Holosight,
	Laser,
	Scope,
	SinglePointSling,
	Suppressor,
];

const AmmoList = [
	...ArrowList,
	...List22,
	...List9mm,
	...List357,
	...List556,
	...List308,
	...List12g,
];


// OLD AMMO
// new Ammo(`.22`,	 `Tracer`,			`+1 Auto RAttack.`,.005),
// new Ammo(`12g`,	 `Birdshot`,		  `Basic ammo. Scatter.`,.05),
// new Ammo(`12g`,	 `Flare`,			 `3 Fire Damage/round for 3 rounds. 50yd light radius.`,.05),
// new Ammo(`12g`,	 `Rubber`,			`Blunt.`,.05),
// new Ammo(`5.56`,	`Tracer`,			`+1 Auto RATK.`,.02),

const ArmorList = [
	AthleticHelmet,
	AthleticPads,
	CombatHelmet,
	Coveralls,
	FirefighterSuit,
	Camo,
	GhillieSuit,
	HikingBoots,
	KevlarVest,
	LeatherJacket,
	MotorcycleHelmet,
	HazmatSuit,
	PlateCarrier,
	WinterCoat,
	WorkGloves,
];



// OLD ARMOR
// new Armor(`Denim Jacket`, `1,1`, `Arms, Torso`, ``, 2)
// new Armor(`Interceptor Armor`, `3,6`, `Arms, Torso`, `Camo. Cold Resistance. Fire Resistance.`, 5)
// new Armor(`Kevlar Gloves`, `2`, `Arms`, `Fire Resistance.`, 1)
// new Armor(`Knee Pads`, `1`, `Legs`, ``, 1)
// new Armor(`Paintball Mask`, `1`, `Head`, `Mask.`, 1)
// new Armor(`Riot Helmet`, `4`, `Head`, `Fire Resistance. Mask.`, 2)
// new Armor(`Steel-Toe Boots`, `2`, `Legs`, `Blunt. Fire Resistance. Kick 3BDMG`, 2)
// new Armor(`Tactical Vest`, `1`, `Torso`, `6 Storage.`, 1)
// new Armor(`Undercover Vest`, `3`, `Torso`, `Fire Resistance.`, 3)

// RARE ARMOR
// new Armor(`Black Robe`, `1,1,1,1`, `Head, Torso, Arms, Legs`, `Cold Resistance. +1 Stealth.`, 1)
// new Armor(`Chainmail Shirt`, `3,3,3`, `Head, Torso, Arms`, `Ignore Chop.`, 6)
// new Armor(`Dragonskin Vest`, `8`, `Torso`, `Cold Resistance. Fire Resistance.`, 3)
// new Armor(`Knuckle Gloves`, `2`, `Arms`, `2DMG Punch. Blunt. Fire Resistance.`, 1)
// new Armor(`Land Warrior Helmet`, `4`, `Head`, `Fire Resistance. Nightvision Goggles. Radio.`, 2)
// new Armor(`Spiked Jacket`, `2, 2`, `Torso, Arms`, `+1 DMG Grab.`, 3)

const BombList = [
	FlashbangGrenade,
	FragGrenade,
	MolotovCocktail,
	SmokeGrenade,
	TeargasGrenade,
	Thermite,
];



// OLD BOMBS
// new Bomb(`Chlorine`,	18, `toxin`,	`1yd/round`,  `d6+3mins`, `Blind. Asphyxiation x2. Stun.`, 1)
// new Bomb(`Claymore`,	18, `d6x9`,	 `30yd`,	 `instant`,  `30yd 90° Blast. Loud.`,		2)
// new Bomb(`Dynamite`,	12, `d6x6`,	 `30yd`,	 `instant`,  `10 round fuse.`,				  1)
// new Bomb(`Firecracker`, 6,  `0`,		`0yd`,	  `d6+3 rounds`, `Mimics sound of gunfire.`,	 0)
// new Bomb(`Landmine`,	15, `d6x6`,	 `3yd`,	  `instant`,  ``,							 2)
// new Bomb(`Sky Rocket`,  12, `d6x3`,	 `60yd`,	 `instant`,  `-1 RATK. Range:50. Blind.`,	  1)

export { AccessoryList as A, BombList as B, AmmoList as a, ArmorList as b };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm9tYkxpc3QuNDkyN2MyYjcuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvd2VhcG9ucy9hY2Nlc3Nvcmllcy9BY2Nlc3NvcnlMaXN0LmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcnVsZXMvZ2Vhci93ZWFwb25zL2FtbW8vQW1tb0xpc3QuanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9ydWxlcy9nZWFyL2FybW9yL0FybW9yTGlzdC5qcyIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3J1bGVzL2dlYXIvd2VhcG9ucy9ib21icy9Cb21iTGlzdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmF5b25ldCBmcm9tICdnZWFyL3dlYXBvbnMvYWNjZXNzb3JpZXMvQmF5b25ldC5qcydcbmltcG9ydCBCaXBvZCBmcm9tICdnZWFyL3dlYXBvbnMvYWNjZXNzb3JpZXMvQmlwb2QuanMnXG5pbXBvcnQgRHJ1bU1hZ2F6aW5lIGZyb20gJ2dlYXIvd2VhcG9ucy9hY2Nlc3Nvcmllcy9EcnVtTWFnYXppbmUuanMnXG5pbXBvcnQgRm9yZWdyaXAgZnJvbSAnZ2Vhci93ZWFwb25zL2FjY2Vzc29yaWVzL0ZvcmVncmlwLmpzJ1xuaW1wb3J0IEhvbG9zaWdodCBmcm9tICdnZWFyL3dlYXBvbnMvYWNjZXNzb3JpZXMvSG9sb3NpZ2h0LmpzJ1xuaW1wb3J0IExhc2VyIGZyb20gJ2dlYXIvd2VhcG9ucy9hY2Nlc3Nvcmllcy9MYXNlci5qcydcbmltcG9ydCBTY29wZSBmcm9tICdnZWFyL3dlYXBvbnMvYWNjZXNzb3JpZXMvU2NvcGUuanMnXG5pbXBvcnQgU2luZ2xlUG9pbnRTbGluZyBmcm9tICdnZWFyL3dlYXBvbnMvYWNjZXNzb3JpZXMvU2luZ2xlUG9pbnRTbGluZy5qcydcbmltcG9ydCBTdXBwcmVzc29yIGZyb20gJ2dlYXIvd2VhcG9ucy9hY2Nlc3Nvcmllcy9TdXBwcmVzc29yLmpzJ1xuXG5cbmNvbnN0IEFjY2Vzc29yeUxpc3QgPSBbXG5cdEJheW9uZXQsXG5cdEJpcG9kLFxuXHREcnVtTWFnYXppbmUsXG5cdEZvcmVncmlwLFxuXHRIb2xvc2lnaHQsXG5cdExhc2VyLFxuXHRTY29wZSxcblx0U2luZ2xlUG9pbnRTbGluZyxcblx0U3VwcHJlc3Nvcixcbl1cblxuZXhwb3J0IGRlZmF1bHQgQWNjZXNzb3J5TGlzdCIsImltcG9ydCBBbW1vQXJyb3cgZnJvbSAnLi9hcnJvdy9BbW1vQXJyb3cnXG5pbXBvcnQgQW1tbzIyIGZyb20gJy4vMjIvQW1tbzIyJ1xuaW1wb3J0IEFtbW85bW0gZnJvbSAnLi85bW0vQW1tbzltbSdcbmltcG9ydCBBbW1vMzU3IGZyb20gJy4vMzU3L0FtbW8zNTcnXG5pbXBvcnQgQW1tbzU1NiBmcm9tICcuLzU1Ni9BbW1vNTU2J1xuaW1wb3J0IEFtbW8zMDggZnJvbSAnLi8zMDgvQW1tbzMwOCdcbmltcG9ydCBBbW1vMTJnIGZyb20gJy4vMTJnL0FtbW8xMmcnXG5cblxuY29uc3QgQW1tb0xpc3QgPSBbXG5cdC4uLkFtbW9BcnJvdyxcblx0Li4uQW1tbzIyLFxuXHQuLi5BbW1vOW1tLFxuXHQuLi5BbW1vMzU3LFxuXHQuLi5BbW1vNTU2LFxuXHQuLi5BbW1vMzA4LFxuXHQuLi5BbW1vMTJnLFxuXVxuXG5leHBvcnQgZGVmYXVsdCBBbW1vTGlzdFxuXG5cbi8vIE9MRCBBTU1PXG4vLyBuZXcgQW1tbyhgLjIyYCxcdCBgVHJhY2VyYCxcdFx0XHRgKzEgQXV0byBSQXR0YWNrLmAsLjAwNSksXG4vLyBuZXcgQW1tbyhgMTJnYCxcdCBgQmlyZHNob3RgLFx0XHQgIGBCYXNpYyBhbW1vLiBTY2F0dGVyLmAsLjA1KSxcbi8vIG5ldyBBbW1vKGAxMmdgLFx0IGBGbGFyZWAsXHRcdFx0IGAzIEZpcmUgRGFtYWdlL3JvdW5kIGZvciAzIHJvdW5kcy4gNTB5ZCBsaWdodCByYWRpdXMuYCwuMDUpLFxuLy8gbmV3IEFtbW8oYDEyZ2AsXHQgYFJ1YmJlcmAsXHRcdFx0YEJsdW50LmAsLjA1KSxcbi8vIG5ldyBBbW1vKGA1LjU2YCxcdGBUcmFjZXJgLFx0XHRcdGArMSBBdXRvIFJBVEsuYCwuMDIpLCIsImltcG9ydCBBdGhsZXRpY0hlbG1ldCBmcm9tICcuL0F0aGxldGljSGVsbWV0J1xuaW1wb3J0IEF0aGxldGljUGFkcyBmcm9tICcuL0F0aGxldGljUGFkcydcbmltcG9ydCBDb21iYXRIZWxtZXQgZnJvbSAnLi9Db21iYXRIZWxtZXQnXG5pbXBvcnQgQ292ZXJhbGxzIGZyb20gJy4vQ292ZXJhbGxzJ1xuaW1wb3J0IEZpcmVmaWdodGVyU3VpdCBmcm9tICcuL0ZpcmVmaWdodGVyU3VpdCdcbmltcG9ydCBGbGFrSmFja2V0IGZyb20gJy4vRmxha0phY2tldCdcbmltcG9ydCBHaGlsbGllU3VpdCBmcm9tICcuL0doaWxsaWVTdWl0J1xuaW1wb3J0IEhhem1hdFN1aXQgZnJvbSAnLi9IYXptYXRTdWl0J1xuaW1wb3J0IEhpa2luZ0Jvb3RzIGZyb20gJy4vSGlraW5nQm9vdHMnXG5pbXBvcnQgS2V2bGFyVmVzdCBmcm9tICcuL0tldmxhclZlc3QnXG5pbXBvcnQgTGVhdGhlckphY2tldCBmcm9tICcuL0xlYXRoZXJKYWNrZXQnXG5pbXBvcnQgTW90b3JjeWNsZUhlbG1ldCBmcm9tICcuL01vdG9yY3ljbGVIZWxtZXQnXG5pbXBvcnQgUGxhdGVDYXJyaWVyIGZyb20gJy4vUGxhdGVDYXJyaWVyJ1xuaW1wb3J0IFdpbnRlckNvYXQgZnJvbSAnLi9XaW50ZXJDb2F0J1xuaW1wb3J0IFdvcmtHbG92ZXMgZnJvbSAnLi9Xb3JrR2xvdmVzJ1xuXG5cbmNvbnN0IEFybW9yTGlzdCA9IFtcblx0QXRobGV0aWNIZWxtZXQsXG5cdEF0aGxldGljUGFkcyxcblx0Q29tYmF0SGVsbWV0LFxuXHRDb3ZlcmFsbHMsXG5cdEZpcmVmaWdodGVyU3VpdCxcblx0Rmxha0phY2tldCxcblx0R2hpbGxpZVN1aXQsXG5cdEhpa2luZ0Jvb3RzLFxuXHRLZXZsYXJWZXN0LFxuXHRMZWF0aGVySmFja2V0LFxuXHRNb3RvcmN5Y2xlSGVsbWV0LFxuXHRIYXptYXRTdWl0LFxuXHRQbGF0ZUNhcnJpZXIsXG5cdFdpbnRlckNvYXQsXG5cdFdvcmtHbG92ZXMsXG5dXG5cbmV4cG9ydCBkZWZhdWx0IEFybW9yTGlzdFxuXG5cblxuLy8gT0xEIEFSTU9SXG4vLyBuZXcgQXJtb3IoYERlbmltIEphY2tldGAsIGAxLDFgLCBgQXJtcywgVG9yc29gLCBgYCwgMilcbi8vIG5ldyBBcm1vcihgSW50ZXJjZXB0b3IgQXJtb3JgLCBgMyw2YCwgYEFybXMsIFRvcnNvYCwgYENhbW8uIENvbGQgUmVzaXN0YW5jZS4gRmlyZSBSZXNpc3RhbmNlLmAsIDUpXG4vLyBuZXcgQXJtb3IoYEtldmxhciBHbG92ZXNgLCBgMmAsIGBBcm1zYCwgYEZpcmUgUmVzaXN0YW5jZS5gLCAxKVxuLy8gbmV3IEFybW9yKGBLbmVlIFBhZHNgLCBgMWAsIGBMZWdzYCwgYGAsIDEpXG4vLyBuZXcgQXJtb3IoYFBhaW50YmFsbCBNYXNrYCwgYDFgLCBgSGVhZGAsIGBNYXNrLmAsIDEpXG4vLyBuZXcgQXJtb3IoYFJpb3QgSGVsbWV0YCwgYDRgLCBgSGVhZGAsIGBGaXJlIFJlc2lzdGFuY2UuIE1hc2suYCwgMilcbi8vIG5ldyBBcm1vcihgU3RlZWwtVG9lIEJvb3RzYCwgYDJgLCBgTGVnc2AsIGBCbHVudC4gRmlyZSBSZXNpc3RhbmNlLiBLaWNrIDNCRE1HYCwgMilcbi8vIG5ldyBBcm1vcihgVGFjdGljYWwgVmVzdGAsIGAxYCwgYFRvcnNvYCwgYDYgU3RvcmFnZS5gLCAxKVxuLy8gbmV3IEFybW9yKGBVbmRlcmNvdmVyIFZlc3RgLCBgM2AsIGBUb3Jzb2AsIGBGaXJlIFJlc2lzdGFuY2UuYCwgMylcblxuLy8gUkFSRSBBUk1PUlxuLy8gbmV3IEFybW9yKGBCbGFjayBSb2JlYCwgYDEsMSwxLDFgLCBgSGVhZCwgVG9yc28sIEFybXMsIExlZ3NgLCBgQ29sZCBSZXNpc3RhbmNlLiArMSBTdGVhbHRoLmAsIDEpXG4vLyBuZXcgQXJtb3IoYENoYWlubWFpbCBTaGlydGAsIGAzLDMsM2AsIGBIZWFkLCBUb3JzbywgQXJtc2AsIGBJZ25vcmUgQ2hvcC5gLCA2KVxuLy8gbmV3IEFybW9yKGBEcmFnb25za2luIFZlc3RgLCBgOGAsIGBUb3Jzb2AsIGBDb2xkIFJlc2lzdGFuY2UuIEZpcmUgUmVzaXN0YW5jZS5gLCAzKVxuLy8gbmV3IEFybW9yKGBLbnVja2xlIEdsb3Zlc2AsIGAyYCwgYEFybXNgLCBgMkRNRyBQdW5jaC4gQmx1bnQuIEZpcmUgUmVzaXN0YW5jZS5gLCAxKVxuLy8gbmV3IEFybW9yKGBMYW5kIFdhcnJpb3IgSGVsbWV0YCwgYDRgLCBgSGVhZGAsIGBGaXJlIFJlc2lzdGFuY2UuIE5pZ2h0dmlzaW9uIEdvZ2dsZXMuIFJhZGlvLmAsIDIpXG4vLyBuZXcgQXJtb3IoYFNwaWtlZCBKYWNrZXRgLCBgMiwgMmAsIGBUb3JzbywgQXJtc2AsIGArMSBETUcgR3JhYi5gLCAzKSIsImltcG9ydCBGbGFzaGJhbmdHcmVuYWRlIGZyb20gJ2dlYXIvd2VhcG9ucy9ib21icy9GbGFzaGJhbmdHcmVuYWRlLmpzJ1xuaW1wb3J0IEZyYWdHcmVuYWRlIGZyb20gJ2dlYXIvd2VhcG9ucy9ib21icy9GcmFnR3JlbmFkZS5qcydcbmltcG9ydCBNb2xvdG92Q29ja3RhaWwgZnJvbSAnZ2Vhci93ZWFwb25zL2JvbWJzL01vbG90b3ZDb2NrdGFpbC5qcydcbmltcG9ydCBTbW9rZUdyZW5hZGUgZnJvbSAnZ2Vhci93ZWFwb25zL2JvbWJzL1Ntb2tlR3JlbmFkZS5qcydcbmltcG9ydCBUZWFyZ2FzR3JlbmFkZSBmcm9tICdnZWFyL3dlYXBvbnMvYm9tYnMvVGVhcmdhc0dyZW5hZGUuanMnXG5pbXBvcnQgVGhlcm1pdGUgZnJvbSAnZ2Vhci93ZWFwb25zL2JvbWJzL1RoZXJtaXRlLmpzJ1xuXG5cbmNvbnN0IEJvbWJMaXN0ID0gW1xuXHRGbGFzaGJhbmdHcmVuYWRlLFxuXHRGcmFnR3JlbmFkZSxcblx0TW9sb3RvdkNvY2t0YWlsLFxuXHRTbW9rZUdyZW5hZGUsXG5cdFRlYXJnYXNHcmVuYWRlLFxuXHRUaGVybWl0ZSxcbl1cblxuZXhwb3J0IGRlZmF1bHQgQm9tYkxpc3RcblxuXG5cbi8vIE9MRCBCT01CU1xuLy8gbmV3IEJvbWIoYENobG9yaW5lYCxcdDE4LCBgdG94aW5gLFx0YDF5ZC9yb3VuZGAsICBgZDYrM21pbnNgLCBgQmxpbmQuIEFzcGh5eGlhdGlvbiB4Mi4gU3R1bi5gLCAxKVxuLy8gbmV3IEJvbWIoYENsYXltb3JlYCxcdDE4LCBgZDZ4OWAsXHQgYDMweWRgLFx0IGBpbnN0YW50YCwgIGAzMHlkIDkwwrAgQmxhc3QuIExvdWQuYCxcdFx0Milcbi8vIG5ldyBCb21iKGBEeW5hbWl0ZWAsXHQxMiwgYGQ2eDZgLFx0IGAzMHlkYCxcdCBgaW5zdGFudGAsICBgMTAgcm91bmQgZnVzZS5gLFx0XHRcdFx0ICAxKVxuLy8gbmV3IEJvbWIoYEZpcmVjcmFja2VyYCwgNiwgIGAwYCxcdFx0YDB5ZGAsXHQgIGBkNiszIHJvdW5kc2AsIGBNaW1pY3Mgc291bmQgb2YgZ3VuZmlyZS5gLFx0IDApXG4vLyBuZXcgQm9tYihgTGFuZG1pbmVgLFx0MTUsIGBkNng2YCxcdCBgM3lkYCxcdCAgYGluc3RhbnRgLCAgYGAsXHRcdFx0XHRcdFx0XHQgMilcbi8vIG5ldyBCb21iKGBTa3kgUm9ja2V0YCwgIDEyLCBgZDZ4M2AsXHQgYDYweWRgLFx0IGBpbnN0YW50YCwgIGAtMSBSQVRLLiBSYW5nZTo1MC4gQmxpbmQuYCxcdCAgMSlcblxuIl0sIm5hbWVzIjpbIkFtbW9BcnJvdyIsIkFtbW8yMiIsIkFtbW85bW0iLCJBbW1vMzU3IiwiQW1tbzU1NiIsIkFtbW8zMDgiLCJBbW1vMTJnIiwiRmxha0phY2tldCJdLCJtYXBwaW5ncyI6Ijs7O0FBV0ssTUFBQyxhQUFhLEdBQUc7QUFDdEIsQ0FBQyxPQUFPO0FBQ1IsQ0FBQyxLQUFLO0FBQ04sQ0FBQyxZQUFZO0FBQ2IsQ0FBQyxRQUFRO0FBQ1QsQ0FBQyxTQUFTO0FBQ1YsQ0FBQyxLQUFLO0FBQ04sQ0FBQyxLQUFLO0FBQ04sQ0FBQyxnQkFBZ0I7QUFDakIsQ0FBQyxVQUFVO0FBQ1g7O0FDWkssTUFBQyxRQUFRLEdBQUc7QUFDakIsQ0FBQyxHQUFHQSxTQUFTO0FBQ2IsQ0FBQyxHQUFHQyxNQUFNO0FBQ1YsQ0FBQyxHQUFHQyxPQUFPO0FBQ1gsQ0FBQyxHQUFHQyxPQUFPO0FBQ1gsQ0FBQyxHQUFHQyxPQUFPO0FBQ1gsQ0FBQyxHQUFHQyxPQUFPO0FBQ1gsQ0FBQyxHQUFHQyxPQUFPO0FBQ1gsRUFBQztBQUdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkssTUFBQyxTQUFTLEdBQUc7QUFDbEIsQ0FBQyxjQUFjO0FBQ2YsQ0FBQyxZQUFZO0FBQ2IsQ0FBQyxZQUFZO0FBQ2IsQ0FBQyxTQUFTO0FBQ1YsQ0FBQyxlQUFlO0FBQ2hCLENBQUNDLElBQVU7QUFDWCxDQUFDLFdBQVc7QUFDWixDQUFDLFdBQVc7QUFDWixDQUFDLFVBQVU7QUFDWCxDQUFDLGFBQWE7QUFDZCxDQUFDLGdCQUFnQjtBQUNqQixDQUFDLFVBQVU7QUFDWCxDQUFDLFlBQVk7QUFDYixDQUFDLFVBQVU7QUFDWCxDQUFDLFVBQVU7QUFDWCxFQUFDO0FBR0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hESyxNQUFDLFFBQVEsR0FBRztBQUNqQixDQUFDLGdCQUFnQjtBQUNqQixDQUFDLFdBQVc7QUFDWixDQUFDLGVBQWU7QUFDaEIsQ0FBQyxZQUFZO0FBQ2IsQ0FBQyxjQUFjO0FBQ2YsQ0FBQyxRQUFRO0FBQ1QsRUFBQztBQUdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OyJ9
