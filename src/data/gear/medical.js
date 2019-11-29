    //MEDICAL
    function Medical(type, notes, sz){
        this.type = type;
        this.notes = notes;
        this.sz = sz;
    }
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