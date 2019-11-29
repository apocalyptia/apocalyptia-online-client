
       //DRUGS
    function Drug(type, notes, sz){
        this.type = type;
        this.notes = notes;
        this.sz = sz;
    }
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
