    //DOCUMENTS
    function Document(type, notes, sz){
        this.type = type;
        this.notes = notes;
        this.sz = sz;
    }
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
