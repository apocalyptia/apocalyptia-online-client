<div class="creation-rules">
    <h2>Character Creation</h2>
    <button id="CharacterCreationBtn" class="Btn">CHARACTER CREATION</button>
    <div id="CharacterCreationSec" class="Sec2">
        <button id="CharacterCreationStep1Btn" class="Btn">STEP 1: DESCRIPTION</button>
        <div id="CharacterCreationStep1Sec" class="Sec3">
            <p>Decide on your name, measurements, appearance, gender and age.</p>
        </div>
        <button id="CharacterCreationStep2Btn" class="Btn">STEP 2: TRAITS AND INSTINCTS</button>
        <div id="CharacterCreationStep2Sec" class="Sec3">
            <p>There are four Traits: Agility, Brains, Constitution, and Demeanor. Traits range from 1 to 6. You have either 12 Trait points to assign or d6 per Trait (ask your GN). Instincts equal their parent Traits.</p>
            <ul>
                <li>Stealth = Agility</li>
                <li>Perception = Brains</li>
                <li>Athletics = Constitution</li>
                <li>Socialize = Demeanor</li>
            </ul>
        </div>
        <button id="CharacterCreationStep3Btn" class="Btn">STEP 3: SKILLS</button>
        <div id="CharacterCreationStep3Sec" class="Sec3">
            <p>You get [Brains x6] Skill points to divide among your Skills. Maximum Skill rating is equal to a Skill's parent Trait.</p>
            <ul>
                <li>Agility Skills: Acrobatics, Ranged, Larceny</li>
                <li>Brains Skills: Medicine, Science, Survival</li>
                <li>Constitution Skills: Build, Drive, Melee</li>
                <li>Demeanor Skills: Entertain, Leadership, Tame</li>
            </ul>
        </div>
        <button id="CharacterCreationStep4Btn" class="Btn">STEP 4: PROPERTIES</button>
        <div id="CharacterCreationStep4Sec" class="Sec3">
            <p>Calculate your Properties. Always round down.</p>
            <ul>
                <li>Psyche = [Demeanor] dots away from Crazy</li>
                <li>Speed = [Agility + Constitution] yds</li>
                <li>Fast = [Agility] actions</li>
                <li>XP (Experience) = [Brains x6] Unspent and Total</li>
                <li>DMG Mod = [(Constitution /3) –1] to Melee and Throw DMG</li>
                <li>Carry = current Gear Size left / max [Constitution x6] right</li>
                <li>Luck = [Demeanor] current left / max right</li>
                <li>Threshold = [Constitution + Demeanor]</li>
                <li>Defenses</li>
                <li>
                    <ul>
                        <li>Block = Melee(Block)</li>
                        <li>Dodge = Acrobatics(Dodge)</li>
                        <li>Reflex = Perception</li>
                    </ul>
                </li>
                <li>Pain = 0</li>
                <li>Health</li>
                <li>
                    <ul>
                        <li>Head, Arms, Legs = [Constitution] current left / max right</li>
                        <li>Torso = [Constitution x2] current left / max right</li>
                    </ul>
                </li>
            </ul>
        </div>
        <button id="CharacterCreationStep5Btn" class="Btn">STEP 5: GEAR</button>
        <div id="CharacterCreationStep5Sec" class="Sec3">
            <p>You start with plain clothes, a Backpack, Food, and Water. Roll d66  on the tables below for Gear: 1 piece of ARMOR, 1 MELEE WEAPON, 1 RANGED WEAPON and d6 common AMMO (FMJ, Birdshot, or Target Arrow) for that weapon. Then roll d666 on the MASTER GEAR LIST.</p>
            <button id="StartingArmorBtn" class="Btn">STARTING ARMOR</button>
            <div id="StartingArmorSec" class="Sec4">
                <button id="StartingRolledArmorBtn" class="Roll" onclick="rollItem(iArmorList,'StartingRolledArmor')">ROLL ARMOR</button>
                <p id="StartingRolledArmor"></p>
            </div>
            <button id="StartingMeleeBtn" class="Btn">STARTING MELEE WEAPON</button>
            <div id="StartingMeleeSec" class="Sec4">
                <button id="StartingRolledMeleeBtn" class="Roll" onclick="rollItem(iMeleeWeaponsList,'StartingRolledMelee')">ROLL MELEE WEAPON</button>
                <p id="StartingRolledMelee"></p>
            </div>
            <button id="StartingRangedBtn" class="Btn">STARTING RANGED WEAPON</button>
            <div id="StartingRangedSec" class="Sec4">
                <button id="StartingRolledRangedBtn" class="Roll" onclick="rollItem(iRangedWeaponsList,'StartingRolledRanged')">ROLL RANGED WEAPON</button>
                <p id="StartingRolledRanged"></p>
            </div>
            <button id="StartingMGLBtn" class="Btn">STARTING GEAR</button>
            <div id="StartingMGLSec" class="Sec4">
                <p>MGL Rolls: Roll once per Luck to get a random MGL item. Vehicles come with d6-1gal Fuel. Guns are empty. Re-roll repeats.</p>
                <p>Spend XP: For 1XP you can get: 1 extra MGL roll, or 1 Resource (Water/Food/Chemical/Part/Fuel), or 1 round of common AMMO.</p>
                <button id="StartingRolledMGLBtn" class="Roll" onclick="rollItem(iMasterGearList,'StartingRolledMGL')">ROLL MGL</button>
                <p id="StartingRolledMGL"></p>
            </div>
        </div>
        <button id="CharacterCreationStep6Btn" class="Btn">STEP 6: ABILITIES</button>
        <div id="CharacterCreationStep6Sec" class="Sec3">
            <p>You may buy Abilities with XP (Brains x6).</p>
        </div>
        <button id="CharacterOptionsBtn" class="Btn">CHARACTER OPTIONS</button>
        <div id="CharacterOptionsSec" class="Sec3">
            <p>These are optional rules that the GN may ignore or include in the Character creation process. The GN may have Players roll randomly or just select an option. Players should record any of these details under Notes on the back of their Character Sheets.</p>
            <button id="ExperiencedCharactersBtn" class="Btn">EXPERIENCED CHARACTERS:</button>
            <div id="ExperiencedCharactersSec" class="Sec4">
                <p>Some games may take place well after The End, when nearly everyone who is left alive is a hardened survivor. To make a highly proficient Character, roll randomly or select an appropriate Experience Level and use those Starting XP and MGL Rolls values in place of the standard starting values.</p>
                <button id="CapableCharactersBtn" class="Btn">1. CAPABLE</button>
                <div id="CapableCharactersSec" class="Sec5">
                    <p>Starting XP: Brains x6</p>
                    <p>MGL Rolls: Luck x1</p>
                </div>
                <button id="AdvancedCharactersBtn" class="Btn">2. ADVANCED</button>
                <div id="AdvancedCharactersSec" class="Sec5">
                    <p>Starting XP: Brains x12</p>
                    <p>MGL Rolls: Luck x3</p>
                </div>
                <button id="SeasonedCharactersBtn" class="Btn">3. SEASONED</button>
                <div id="SeasonedCharactersSec" class="Sec5">
                    <p>Starting XP: Brains x18</p>
                    <p>MGL Rolls: Luck x6</p>
                </div>
                <button id="VeteranCharactersBtn" class="Btn">4. VETERAN</button>
                <div id="VeteranCharactersSec" class="Sec5">
                    <p>Starting XP: Brains x24</p>
                    <p>MGL Rolls: Luck x9</p>
                </div>
                <button id="EliteCharactersBtn" class="Btn">5. ELITE</button>
                <div id="EliteCharactersSec" class="Sec5">
                    <p>Starting XP: Brains x30</p>
                    <p>MGL Rolls: Luck x12</p>
                </div>
                <button id="MasterCharactersBtn" class="Btn">6. MASTER</button>
                <div id="MasterCharactersSec" class="Sec5">
                    <p>Starting XP: Brains x36</p>
                    <p>MGL Rolls: Luck x15</p>
                </div>
            </div>
            <button id="AgeBtn" class="Btn">AGE:</button>
            <div id="AgeSec" class="Sec4">
                <p>Character creation rules assume a starting age from 18 to 50. For older or younger Characters, consult the table below before assigning any Trait points to a very young or very old Character:</p>
                <button id="FirstAgeBtn" class="Btn">8-13</button>
                <div id="FirstAgeSec" class="Sec5">
                    <p>Trait Points: 4</p>
                    <p>Max Trait Score: 1</p>
                </div>
                <button id="SecondAgeBtn" class="Btn">14-17</button>
                <div id="SecondAgeSec" class="Sec5">
                    <p>Trait Points: 8</p>
                    <p>Max Trait Score: 8</p>
                </div>
                <button id="ThirdAgeBtn" class="Btn">18-50</button>
                <div id="ThirdAgeSec" class="Sec5">
                    <p>Trait Points: 12</p>
                    <p>Max Trait Score: 6</p>
                </div>
                <button id="FourthAgeBtn" class="Btn">51-70</button>
                <div id="FourthAgeSec" class="Sec5">
                    <p>Trait Points: 11</p>
                    <p>Max Trait Score: 5</p>
                </div>
                <button id="FifthAgeBtn" class="Btn">71-80</button>
                <div id="FifthAgeSec" class="Sec5">
                    <p>Trait Points: 9</p>
                    <p>Max Trait Score: 4</p>
                </div>
                <button id="SixthAgeBtn" class="Btn">80+</button>
                <div id="SixthAgeSec" class="Sec5">
                    <p>Trait Points: 6</p>
                    <p>Max Trait Score: 2</p>
                </div>
            </div>
            <button id="FlawBtn" class="Btn">FLAW:</button>
            <div id="FlawSec" class="Sec4">
                <p>Serious problems for Characters. Roll a d6. If the result is a 1, roll a random Flaw. +1XP each session where you overcome a Flaw. Flaws marked * are permanent. Others can be removed for 36XP.</p>
                <button id="AddictionBtn" class="Btn">ADDICTION</button>
                <div id="AddictionSec" class="Sec5">
                    <p>Cumulative 1 Pain per day without your substance.</p>
                </div>
                <button id="AllergyBtn" class="Btn">ALLERGY</button>
                <div id="AllergySec" class="Sec5">
                    <p>d6 Pain while exposed to a certain irritant.</p>
                </div>
                <button id="AmnesiaBtn" class="Btn">AMNESIA</button>
                <div id="AmnesiaSec" class="Sec5">
                    <p>No memory prior to a few days ago. Half starting XP.</p>
                </div>
                <button id="AmputeeBtn" class="Btn">AMPUTEE</button>
                <div id="AmputeeSec" class="Sec5">
                    <p>Cannot use 2h items, or Speed /2 and require a Crutch.</p>
                </div>
                <button id="AnemiaBtn" class="Btn">ANEMIA*</button>
                <div id="AnemiaSec" class="Sec5">
                    <p>-3 Constitution or Medicine rolls to stop Bleeding.</p>
                </div>
                <button id="AnxietyBtn" class="Btn">ANXIETY</button>
                <div id="AnxietySec" class="Sec5">
                    <p>Demeanor 9# or be Stunned d6rnds in stressful ENCOUNTERS.</p>
                </div>
                <button id="AsthmaBtn" class="Btn">ASTHMA*</button>
                <div id="AsthmaSec" class="Sec5">
                    <p>When you Botch Athletics, Suffocation for d6mins.</p>
                </div>
                <button id="BadBackBtn" class="Btn">BAD BACK*</button>
                <div id="BadBackSec" class="Sec5">
                    <p>Your Carry is halved. -3 Constitution rolls to lift.</p>
                </div>
                <button id="BlindBtn" class="Btn">BLIND*</button>
                <div id="BlindSec" class="Sec5">
                    <p>Fail Perception(See). -6 all sight-dependent rolls.</p>
                </div>
                <button id="CancerBtn" class="Btn">CANCER</button>
                <div id="CancerSec" class="Sec5">
                    <p>Roll d6 every month. -1 Constitution on a Botch.</p>
                </div>
                <button id="CowardBtn" class="Btn">COWARD</button>
                <div id="CowardSec" class="Sec5">
                    <p>Demeanor 9# to intentionally risk danger to yourself.</p>
                </div>
                <button id="CrippledBtn" class="Btn">CRIPPLED*</button>
                <div id="CrippledSec" class="Sec5">
                    <p>Your Legs do not work. You need a wheelchair to move.</p>
                </div>
                <button id="CruelBtn" class="Btn">CRUEL</button>
                <div id="CruelSec" class="Sec5">
                    <p>You will never show mercy to enemies. You like killing.</p>
                </div>
                <button id="DeafBtn" class="Btn">DEAF*</button>
                <div id="DeafSec" class="Sec5">
                    <p>Fail Perception(Hear) rolls.</p>
                </div>
                <button id="DebtBtn" class="Btn">DEBT</button>
                <div id="DebtSec" class="Sec5">
                    <p>You owe a lot to someone, and repayment is overdue.</p>
                </div>
                <button id="DeformedBtn" class="Btn">DEFORMED*</button>
                <div id="DeformedSec" class="Sec5">
                    <p>-3 Socialize rolls when your Deformity is visible.</p>
                </div>
                <button id="DiabetesBtn" class="Btn">DIABETES</button>
                <div id="DiabetesSec" class="Sec5">
                    <p>Die from Starvation (diabetic shock) in half the time.</p>
                </div>
                <button id="DyslexiaBtn" class="Btn">DYSLEXIA*</button>
                <div id="DyslexiaSec" class="Sec5">
                    <p>You get no bonuses from reading DOCUMENTS.</p>
                </div>
                <button id="ForgetfulBtn" class="Btn">FORGETFUL</button>
                <div id="ForgetfulSec" class="Sec5">
                    <p>-3 Brains rolls to remember something in detail.</p>
                </div>
                <button id="GamblerBtn" class="Btn">GAMBLER</button>
                <div id="GamblerSec" class="Sec5">
                    <p>Demeanor 9# to resist a wager, regardless of odds.</p>
                </div>
                <button id="KleptomaniaBtn" class="Btn">KLEPTOMANIA</button>
                <div id="KleptomaniaSec" class="Sec5">
                    <p>Demeanor 9# to resist stealing at any opportunity.</p>
                </div>
                <button id="LazyBtn" class="Btn">LAZY</button>
                <div id="LazySec" class="Sec5">
                    <p>Demeanor 9# to wake up before you’ve had 8hrs of sleep.</p>
                </div>
                <button id="MeekBtn" class="Btn">MEEK</button>
                <div id="MeekSec" class="Sec5">
                    <p>-3 Leadership rolls. -3 vs Leadership(Taunt).</p>
                </div>
                <button id="MuteBtn" class="Btn">MUTE*</button>
                <div id="MuteSec" class="Sec5">
                    <p>You are unable to communicate verbally.</p>
                </div>
                <button id="MyopiaBtn" class="Btn">MYOPIA*</button>
                <div id="MyopiaSec" class="Sec5">
                    <p>-3 Visibility penalty beyond 3yds without glasses.</p>
                </div>
                <button id="NaiveBtn" class="Btn">NAIVE</button>
                <div id="NaiveSec" class="Sec5">
                    <p>-3 Perception vs Entertain(Lie).</p>
                </div>
                <button id="NightmaresBtn" class="Btn">NIGHTMARES</button>
                <div id="NightmaresSec" class="Sec5">
                    <p>Roll d6 each night. On 1, no sleep and wake screaming.</p>
                </div>
                <button id="NoisyBtn" class="Btn">NOISY</button>
                <div id="NoisySec" class="Sec5">
                    <p>-3 Stealth rolls.</p>
                </div>
                <button id="ObeseBtn" class="Btn">OBESE</button>
                <div id="ObeseSec" class="Sec5">
                    <p>-3 Athletics rolls. You are significantly overweight.</p>
                </div>
                <button id="PacifistBtn" class="Btn">PACIFIST</button>
                <div id="PacifistSec" class="Sec5">
                    <p>You refuse to kill people for any reason.</p>
                </div>
                <button id="ParanoiaBtn" class="Btn">PARANOIA</button>
                <div id="ParanoiaSec" class="Sec5">
                    <p>You cannot have Comrades.</p>
                </div>
                <button id="PhobiaBtn" class="Btn">PHOBIA</button>
                <div id="PhobiaSec" class="Sec5">
                    <p>Demeanor 9# to not be paralyzed with fear of something.</p>
                </div>
                <button id="RacistBtn" class="Btn">RACIST</button>
                <div id="RacistSec" class="Sec5">
                    <p>-3 Socialize rolls with anyone of different Skin color.</p>
                </div>
                <button id="SexistBtn" class="Btn">SEXIST</button>
                <div id="SexistSec" class="Sec5">
                    <p>-3 Socialize rolls with anyone of different Gender.</p>
                </div>
                <button id="SpeechImpedimentBtn" class="Btn">SPEECH IMPEDIMENT</button>
                <div id="SpeechImpedimentSec" class="Sec5">
                    <p>-1 Socialize and Leadership rolls using speech.</p>
                </div>
                <button id="SuperstitiousBtn" class="Btn">SUPERSTITIOUS</button>
                <div id="SuperstitiousSec" class="Sec5">
                    <p>-3 Science. You believe in supernatural forces.</p>
                </div>
            </div>
            <button id="HistoryBtn" class="Btn">HISTORY:</button>
            <div id="HistorySec" class="Sec4">
                <p>These are idea seeds for some formative factors in a Character's background that influence their personality and may shape their future goals. Work with the GN to integrate your Character’s History into the overall story of the game.</p>
                <ol>
                    <li>Assassinated a leader</li>
                    <li>Betrayed by friend(s)</li>
                    <li>Bounty for your capture</li>
                    <li>Carrying stolen goods</li>
                    <li>Committed an atrocity</li>
                    <li>Death mark on your head</li>
                    <li>Former Bandit</li>
                    <li>Former Cannibal</li>
                    <li>Former Cultist</li>
                    <li>Former Guerrilla</li>
                    <li>Former Hooker</li>
                    <li>Former Junky</li>
                    <li>Former Mercenary</li>
                    <li>Former Pirate</li>
                    <li>Former Preacher</li>
                    <li>Former Raider</li>
                    <li>Former Slave</li>
                    <li>Former Wrangler</li>
                    <li>Friend was kidnapped</li>
                    <li>Guarding a big secret</li>
                    <li>Had a wise mentor</li>
                    <li>Hatred for one Faction</li>
                    <li>Hunting a monster</li>
                    <li>Left your family</li>
                    <li>Looking for lost lover</li>
                    <li>Mentoring a protégé</li>
                    <li>Murdered an innocent</li>
                    <li>Near-death experience</li>
                    <li>Outcast from Settlement</li>
                    <li>Parent, child d6yrs old</li>
                    <li>Recovered from plague</li>
                    <li>Saved by a hero</li>
                    <li>Still seeking revenge</li>
                    <li>Survived under a tyrant</li>
                    <li>Told of hidden paradise</li>
                    <li>Worshiped as a savior</li>
                </ol>
            </div>
            <button id="ProfessionBtn" class="Btn">PROFESSION:</button>
            <div id="ProfessionSec" class="Sec4">
                <p>Roll or select during Step 1 to make a Character who benefits now from their old job before The End. Characters get a Specialty (+1) and a free starting item related to their old job.</p>
                <button id="ActorBtn" class="Btn">ACTOR</button>
                <div id="ActorSec" class="Sec5">
                    <p>Free Specialty: Entertain(Distract) +1</p>
                    <p>Free Gear: Makeup</p>
                </div>
                <button id="ArchitectBtn" class="Btn">ARCHITECT</button>
                <div id="ArchitectSec" class="Sec5">
                    <p>Free Specialty: Science(Physics) +1</p>
                    <p>Free Gear: Tape Measure</p>
                </div>
                <button id="BaseballPlayerBtn" class="Btn">BASEBALL PLAYER</button>
                <div id="BaseballPlayerSec" class="Sec5">
                    <p>Free Specialty: Melee(Weaponry) +1</p>
                    <p>Free Gear: Baseball Bat</p>
                </div>
                <button id="BasketballPlayerBtn" class="Btn">BASKETBALL PLAYER</button>
                <div id="BasketballPlayerSec" class="Sec5">
                    <p>Free Specialty: Acrobatics(Jump) +1</p>
                    <p>Free Gear: Running Shoes</p>
                </div>
                <button id="BurglarBtn" class="Btn">BURGLAR</button>
                <div id="BurglarSec" class="Sec5">
                    <p>Free Specialty: Larceny(Disable) +1</p>
                    <p>Free Gear: Balaclava</p>
                </div>
                <button id="CampCounselorBtn" class="Btn">CAMP COUNSELOR</button>
                <div id="CampCounselorSec" class="Sec5">
                    <p>Free Specialty: Ranged(Archery) +1</p>
                    <p>Free Gear: Compound Bow</p>
                </div>
                <button id="CarpenterBtn" class="Btn">CARPENTER</button>
                <div id="CarpenterSec" class="Sec5">
                    <p>Free Specialty: Build(Repair) +1</p>
                    <p>Free Gear: Tool Box</p>
                </div>
                <button id="ConvictBtn" class="Btn">CONVICT</button>
                <div id="ConvictSec" class="Sec5">
                    <p>Free Specialty: Larceny(Conceal) +1</p>
                    <p>Free Gear: Handcuffs</p>
                </div>
                <button id="CopBtn" class="Btn">COP</button>
                <div id="CopSec" class="Sec5">
                    <p>Free Specialty: Leadership(Taunt) +1</p>
                    <p>Free Gear: Glock 17 (+d6 9mmFMJ)</p>
                </div>
                <button id="CourierBtn" class="Btn">COURIER</button>
                <div id="CourierSec" class="Sec5">
                    <p>Free Specialty: Survival(Navigate) +1</p>
                    <p>Free Gear: Bicycle</p>
                </div>
                <button id="DogTrainerBtn" class="Btn">DOG TRAINER</button>
                <div id="DogTrainerSec" class="Sec5">
                    <p>Free Specialty: Tame(Train) +1</p>
                    <p>Free Gear: Choker Leash</p>
                </div>
                <button id="ElectricianBtn" class="Btn">ELECTRICIAN</button>
                <div id="ElectricianSec" class="Sec5">
                    <p>Free Specialty: Science((Tech)) +1</p>
                    <p>Free Gear: Multimeter</p>
                </div>
                <button id="FootballPlayerBtn" class="Btn">FOOTBALL PLAYER</button>
                <div id="FootballPlayerSec" class="Sec5">
                    <p>Free Specialty: Ranged(Throw) +1</p>
                    <p>Free Gear: Athletic Pads</p>
                </div>
                <button id="GymnastBtn" class="Btn">GYMNAST</button>
                <div id="GymnastSec" class="Sec5">
                    <p>Free Specialty: Acrobatics(Tumble) +1</p>
                    <p>Free Gear: Duffel Bag</p>
                </div>
                <button id="HomelessBtn" class="Btn">HOMELESS</button>
                <div id="HomelessSec" class="Sec5">
                    <p>Free Specialty: Survival(Forage) +1</p>
                    <p>Free Gear: Winter Coat</p>
                </div>
                <button id="LawyerBtn" class="Btn">LAWYER</button>
                <div id="LawyerSec" class="Sec5">
                    <p>Free Specialty: Entertain(Lie) +1</p>
                    <p>Free Gear: Alcohol</p>
                </div>
                <button id="ManagerBtn" class="Btn">MANAGER</button>
                <div id="ManagerSec" class="Sec5">
                    <p>Free Specialty: Leadership(Encourage) +1</p>
                    <p>Free Gear: Wristwatch</p>
                </div>
                <button id="MechanicBtn" class="Btn">MECHANIC</button>
                <div id="MechanicSec" class="Sec5">
                    <p>Free Specialty: Build(Customize) +1</p>
                    <p>Free Gear: Screwdriver</p>
                </div>
                <button id="MilitaryBtn" class="Btn">MILITARY</button>
                <div id="MilitarySec" class="Sec5">
                    <p>Free Specialty: Ranged(Guns) +1</p>
                    <p>Free Gear: AR-15 (+d6x2 5.56FMJ)</p>
                </div>
                <button id="MusicianBtn" class="Btn">MUSICIAN</button>
                <div id="MusicianSec" class="Sec5">
                    <p>Free Specialty: Entertain(Inspire) +1</p>
                    <p>Free Gear: Musical Instrument</p>
                </div>
                <button id="ParamedicBtn" class="Btn">PARAMEDIC</button>
                <div id="ParamedicSec" class="Sec5">
                    <p>Free Specialty: Medicine(First-Aid) +1</p>
                    <p>Free Gear: EMT Bag</p>
                </div>
                <button id="ParkRangerBtn" class="Btn">PARK RANGER</button>
                <div id="ParkRangerSec" class="Sec5">
                    <p>Free Specialty: Survival(Camp) +1</p>
                    <p>Free Gear: Binoculars</p>
                </div>
                <button id="PharmacistBtn" class="Btn">PHARMACIST</button>
                <div id="PharmacistSec" class="Sec5">
                    <p>Free Specialty: Science(Chemistry) +1</p>
                    <p>Free Gear: NBC Suit</p>
                </div>
                <button id="PilotBtn" class="Btn">PILOT</button>
                <div id="PilotSec" class="Sec5">
                    <p>Free Specialty: Drive(Fly) + Pilot License +1</p>
                    <p>Free Gear: Flare Gun (+d6 12g Flares)</p>
                </div>
                <button id="PrizeFighterBtn" class="Btn">PRIZE FIGHTER</button>
                <div id="PrizeFighterSec" class="Sec5">
                    <p>Free Specialty: Melee(Unarmed) +1</p>
                    <p>Free Gear: Brass Knuckles</p>
                </div>
                <button id="RidingInstructorBtn" class="Btn">RIDING INSTRUCTOR</button>
                <div id="RidingInstructorSec" class="Sec5">
                    <p>Free Specialty: Tame(Ride) +1</p>
                    <p>Free Gear: Cowboy Hat</p>
                </div>
                <button id="SecurityGuardBtn" class="Btn">SECURITY GUARD</button>
                <div id="SecurityGuardSec" class="Sec5">
                    <p>Free Specialty: Melee(Block) +1</p>
                    <p>Free Gear: Baton</p>
                </div>
                <button id="SurgeonBtn" class="Btn">SURGEON</button>
                <div id="SurgeonSec" class="Sec5">
                    <p>Free Specialty: Medicine(Surgery) +1</p>
                    <p>Free Gear: Surgery Kit</p>
                </div>
                <button id="TaxiDriverBtn" class="Btn">TAXI DRIVER</button>
                <div id="TaxiDriverSec" class="Sec5">
                    <p>Free Specialty: Drive(Stunt) +1</p>
                    <p>Free Gear: S&ampW Snubnose (+d6 .357FMJ)</p>
                </div>
                <button id="TechnicianBtn" class="Btn">TECHNICIAN</button>
                <div id="TechnicianSec" class="Sec5">
                    <p>Free Specialty: Build(Salvage) +1</p>
                    <p>Free Gear: Multi-tool</p>
                </div>
                <button id="TeacherBtn" class="Btn">TEACHER</button>
                <div id="TeacherSec" class="Sec5">
                    <p>Free Specialty: Leadership(Order) +1</p>
                    <p>Free Gear: Flashlight</p>
                </div>
                <button id="TherapistBtn" class="Btn">THERAPIST</button>
                <div id="TherapistSec" class="Sec5">
                    <p>Free Specialty: Medicine(Psychology) +1</p>
                    <p>Free Gear: Sedatives (d6x10)</p>
                </div>
                <button id="ThiefBtn" class="Btn">THIEF</button>
                <div id="ThiefSec" class="Sec5">
                    <p>Free Specialty: Larceny(Steal) +1</p>
                    <p>Free Gear: Crowbar</p>
                </div>
                <button id="TruckerBtn" class="Btn">TRUCKER</button>
                <div id="TruckerSec" class="Sec5">
                    <p>Free Specialty: Drive(Combat) +1</p>
                    <p>Free Gear: Tire Iron</p>
                </div>
                <button id="YogaInstructorBtn" class="Btn">YOGA INSTRUCTOR</button>
                <div id="YogaInstructorSec" class="Sec5">
                    <p>Free Specialty: Acrobatics(Dodge) +1</p>
                    <p>Free Gear: Pepper Spray</p>
                </div>
                <button id="ZooKeeperBtn" class="Btn">ZOO KEEPER</button>
                <div id="ZooKeeperSec" class="Sec5">
                    <p>Free Specialty: Tame(Calm) +1</p>
                    <p>Free Gear: Hand Radio</p>
                </div>
            </div>
            <button id="RelationshipBtn" class="Btn">RELATIONSHIP:</button>
            <div id="RelationshipSec" class="Sec4">
                <p>Each Player may roll once with each other Character on the Team. For any pair of Players, they each roll a Relationship and decide to use one of their results to describe how their Characters are related. Players should work out the details of their Relationships together before the story begins.</p>
                <ol>
                    <li>Biological siblings</li>
                    <li>Business partners</li>
                    <li>Childhood friends</li>
                    <li>Cousins</li>
                    <li>Family friends</li>
                    <li>Former Faction members</li>
                    <li>Had a falling out</li>
                    <li>Have the same ex</li>
                    <li>Mentor/apprentice</li>
                    <li>Once enemies now allies</li>
                    <li>Only remaining survivors</li>
                    <li>Partners in crime</li>
                    <li>Respectful rivals</li>
                    <li>Share a dark secret</li>
                    <li>Step siblings</li>
                    <li>They saved your life</li>
                    <li>War buddies</li>
                    <li>You saved their life</li>
                </ol>
            </div>
        </div>
    </div>
</div>