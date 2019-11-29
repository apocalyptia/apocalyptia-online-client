    //ELECTRONICS
    function Electronic(type, notes, sz){
        this.type = type;
        this.notes = notes;
        this.sz = sz;
    }
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
