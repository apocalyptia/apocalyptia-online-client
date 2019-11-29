    //STORAGE
    function Storage(type, notes, sz){
        this.type = type;
        this.notes = notes;
        this.sz = sz;
    }
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
