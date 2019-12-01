<div class='skills-rules'>
    <h2>Skills</h2>
    <button id='SkillsBtn' class='Btn'>SKILLS</button>
    <div id='SkillsSec' class='Sec2'>
        <p>Skill rolls are [d6 + Skill]. A Skill roll may be against a Difficulty(#), Trait, Instinct, or another Skill. Parent Traits set the limit for their Skill scores. Skills have Specialties listed below that can exceed the Trait by taking the Specialize Ability.</p>
        <p># = Difficulty.   1 = Botch.</p>
        <button id='SkillCooperationBtn' class='Btn'>COOPERATION:</button>
        <div id='SkillCooperationSec' class='Sec3'>
            <p>To use a Skill with assistants, everyone rolls. Use the best roll unless someone Botches, then use that.</p>
        </div>
        <button id='RetrainingSkillsBtn' class='Btn'>RETRAINING SKILLS:</button>
        <div id='RetrainingSkillsSec' class='Sec3'>
            <p>1/month for 6XP you may move 1 point between Skills. You cannot lower a Skill to 0.</p>
        </div>
        <button id='AgilitySkillsBtn' class='Btn'>AGILITY SKILLS</button>
        <div id='AgilitySkillsSec' class='Sec3'>
            <button id='AcrobaticsSkillBtn' class='Btn'>ACROBATICS</button>
            <div id='AcrobaticsSkillSec' class='Sec4'>
                <p>Gymnastic prowess.</p>
                <button id='DodgeSpecialtyBtn' class='Btn'>(DODGE)</button>
                <div id='DodgeSpecialtySec' class='Sec5'>
                    <p>Fast. Roll vs an ATK. 1:Prone.</p>
                </div>
                <button id='JumpSpecialtyBtn' class='Btn'>(JUMP)</button>
                <div id='JumpSpecialtySec' class='Sec5'>
                    <p>6#. Takes your action. 1:Fall, 1 BDMG/yd.</p>
                    <p>Standing Long Jump: Speed /2 yds</p>
                    <p>Running Long Jump: Speed yds</p>
                    <p>Vertical Jump: Speed x3'</p>
                </div><button id='TumbleSpecialtyBtn' class='Btn'>(TUMBLE)</button>
                <div id='TumbleSpecialtySec' class='Sec5'>
                    <p># = yds to halve fall DMG [1 BDMG/yd] and choose Location. 1:Prone + Stunned d6rnds.</p>
                </div>
            </div>
            <button id='LarcenySkillBtn' class='Btn'>LARCENY</button>
            <div id='LarcenySkillSec' class='Sec4'>
                <p>Delicate operations requiring finesse. 1/rnd.</p>
                <button id='ConcealSpecialtyBtn' class='Btn'>(CONCEAL)</button>
                <div id='ConcealSpecialtySec' class='Sec5'>
                    <p>Hide items. Penalty = item Size. 1:Detected.</p>
                </div>
                <button id='DisableSpecialtyBtn' class='Btn'>(DISABLE)</button>
                <div id='DisableSpecialtySec' class='Sec5'>
                    <p># by item. Takes d6mins 1:Breaks or explodes.</p>
                </div>
                <button id='StealSpecialtyBtn' class='Btn'>(STEAL)</button>
                <div id='StealSpecialtySec' class='Sec5'>
                    <p>Roll vs Perception to pick pocket. 1:Detected.</p>
                </div>
            </div>
            <button id='RangedSkillBtn' class='Btn'>RANGED</button>
            <div id='RangedSkillSec' class='Sec4'>
                <p>Projectile fighting techniques. See Ch:2.</p>
                <button id='ArcherySpecialtyBtn' class='Btn'>(ARCHERY)</button>
                <div id='ArcherySpecialtySec' class='Sec5'>
                    <p>Roll vs DEF. 1:Arrow lost or broken.</p>
                </div>
                <button id='GunsSpecialtyBtn' class='Btn'>(GUNS)</button>
                <div id='GunsSpecialtySec' class='Sec5'>
                    <p>Roll vs DEF. 1:Jammed dud. 1rnd to clear.</p>
                </div>
                <button id='ThrowSpecialtyBtn' class='Btn'>(THROW)</button>
                <div id='ThrowSpecialtySec' class='Sec5'>
                    <p>Roll vs DEF. RNG = C x2. 1:Broken weapon.</p>
                </div>
            </div>
        </div>
        <button id='BrainsSkillsBtn' class='Btn'>BRAINS SKILLS</button>
        <div id='BrainsSkillsSec' class='Sec3'>
            <button id='MedicineSkillBtn' class='Btn'>MEDICINE</button>
            <div id='MedicineSkillSec' class='Sec4'>
                <p># = total DMG. Requires MEDICAL Gear.</p>
                <button id='FirstAidSpecialtyBtn' class='Btn'>(FIRST-AID)</button>
                <div id='FirstAidSpecialtySec' class='Sec5'>
                    <p>Stop Bleeding. Requires a Bandage, First-Aid Kit, or EMT Bag. Takes 1min. 1:Bleed 1DMG.</p>
                </div><button id='PsychologySpecialtyBtn' class='Btn'>(PSYCHOLOGY)</button>
                <div id='PsychologySpecialtySec' class='Sec5'>
                    <p>12# – Psyche. Subject gets +1 Psyche 1/week. Takes d6hrs. 1:-1 Psyche. See PSYCHE in Ch:4.</p>
                </div><button id='SurgerySpecialtyBtn' class='Btn'>(SURGERY)</button>
                <div id='SurgerySpecialtySec' class='Sec5'>
                    <p>Heals 1HP to one Location and allows a disabled Location to fully Recover it’s maximum HP naturally. Roll once per wound. Takes 15min/DMG. 1: d6DMG and Bleeding.</p>
                </div>
            </div>
            <button id='ScienceSkillBtn' class='Btn'>SCIENCE</button>
            <div id='ScienceSkillSec' class='Sec4'>
                <p>Knowledge and use of scientific data.</p>
                <button id='ChemistrySpecialtyBtn' class='Btn'>CHEMISTRY</button>
                <div id='ChemistrySpecialtySec' class='Sec5'>
                    <p>BOMBS/DRUGS cost d6+# Chemicals and # x10mins. 1:Instant detonation (for BOMBS) or d6 Torso DMG to user (for DRUGS). See Ch:3.</p>
                </div>
                <button id='PhysicsSpecialtyBtn' class='Btn'>PHYSICS</button>
                <div id='PhysicsSpecialtySec' class='Sec5'>
                    <p>1/task. Takes d6mins. Base 9#. Add Brains to a physical task roll. 1:Brains is a penalty.</p>
                </div>
                <button id='TechSpecialtyBtn' class='Btn'>TECH</button>
                <div id='TechSpecialtySec' class='Sec5'>
                    <p>Base 12# to hack computer systems. Base 3# to control electronic devices. Roll item # to craft DIY ELECTRONICS. 1:Broken. See Ch:6.</p>
                </div>
            </div>
            <button id='SurvivalSkillBtn' class='Btn'>SURVIVAL</button>
            <div id='SurvivalSkillSec' class='Sec4'>
                <p>>Primitive practices for living outdoors.</p>
                <button id='CampingSpecialtyBtn' class='Btn'>CAMPING</button>
                <div id='CampingSpecialtySec' class='Sec5'>
                    <p>6#. Takes 1hr. Making fire and shelter costs 1 Wood/hr, prevents Hypothermia, and allows you to cook. Also used for tying knots (d6rnds).</p>
                </div>
                <button id='ForageSpecialtyBtn' class='Btn'>FORAGE</button>
                <div id='ForageSpecialtySec' class='Sec5'>
                    <p>Find 1 Food, Water, Bandage, or d6 Wood. Takes 1hr. 1:d6 Torso DMG from Food/Water.</p>
                </div>
                <button id='NavigateSpecialtyBtn' class='Btn'>NAVIGATE</button>
                <div id='NavigateSpecialtySec' class='Sec5'>
                    <p>Travel to destination. See Ecosystems in Ch:4. Roll vs Perception to cover tracks. 1:Lost.</p>
                </div>
            </div>
        </div>
        <button id='ConstitutionSkillsBtn' class='Btn'>CONSTITUTION SKILLS</button>
        <div id='ConstitutionSkillsSec' class='Sec3'>
            <button id='BuildSkillBtn' class='Btn'>BUILD</button>
            <div id='BuildSkillSec' class='Sec4'>
                <p>Make items from Parts. Base requirements are 6#, 1hr/1#, and d6+# Parts. 1:Tool broke.</p>
                <button id='CustomizeSpecialtyBtn' class='Btn'>(CUSTOMIZE)</button>
                <div id='CustomizeSpecialtySec' class='Sec5'>
                    <p>Base 9#. Each roll is 1 day of work. Reduce remaining # by the result. Costs d6+1 Parts. Max 3/item. Limit 1 each. 1:Item broke.</p>
                    <button id='WeaponCustomizationsBtn' class='Btn'>WEAPON CUSTOMIZATIONS</button>
                    <div id='WeaponCustomizationsSec' class='Sec6'>
                        <ul>
                            <li>+1 RATK</li>
                            <li>+1 Melee DMG</li>
                            <li>-1 Size</li>
                            <li>Change caliber</li>
                            <li>Add a WEAPON ATTRIBUTE</li>
                        </ul>
                    </div>
                    <button id='ArmorCustomizationsBtn' class='Btn'>ARMOR CUSTOMIZATIONS</button>
                    <div id='ArmorCustomizationsSec' class='Sec6'>
                        <ul>
                            <li>+1 AR</li>
                            <li>+1 Grab DMG</li>
                            <li>-1 Size</li>
                            <li>Add an ARMOR ATTRIBUTE</li>
                        </ul>
                    </div>
                </div>
                <button id='RepairSpecialtyBtn' class='Btn'>(REPAIR)</button>
                <div id='RepairSpecialtySec' class='Sec5'>
                    <p>Fix broken items. Base 6#, takes d6hrs, costs d6 Parts. +1 using same Parts. 1:Parts broke.</p>
                </div>
                <button id='SalvageSpecialtyBtn' class='Btn'>(SALVAGE)</button>
                <div id='SalvageSpecialtySec' class='Sec5'>
                    <p>3#, takes d6hrs. Get Parts = [Result /2].</p>
                </div>
            </div>
            <button id='DriveSkillBtn' class='Btn'>DRIVE</button>
            <div id='DriveSkillSec' class='Sec4'>
                <p>3#. 1/hr or 1/rnd. 1:Wreck, see Ch:3.</p>
                <button id='FlySpecialtyBtn' class='Btn'>(FLY)</button>
                <div id='FlySpecialtySec' class='Sec5'>
                    <p>Used for piloting AIRCRAFT. -6 and unable to take off/land unless you take Pilot License.</p>
                </div>
                <button id='CombatSpecialtyBtn' class='Btn'>(COMBAT)</button>
                <div id='CombatSpecialtySec' class='Sec5'>
                    <p>Ram and Fixed Gun ATKs or Swerve DEF. See Vehicle Combat in Ch:3 for details.</p>
                </div>
                <button id='StuntSpecialtyBtn' class='Btn'>(STUNT)</button>
                <div id='StuntSpecialtySec' class='Sec5'>
                    <p>Accelerating, braking, and hard turns. 6#. See Driving in Ch:3 for details.</p>
                </div>
            </div>
            <button id='MeleeSkillBtn' class='Btn'>MELEE</button>
            <div id='MeleeSkillSec' class='Sec4'>
                <p>Hand-to-hand combat. See Ch:2.</p>
                <button id='BlockSpecialtyBtn' class='Btn'>(BLOCK)</button>
                <div id='BlockSpecialtySec' class='Sec5'>
                    <p>Fast. Roll vs ATK. Can only Block Guns when using a Shield as Cover. 1:Broken weapon.</p>
                </div><button id='UnarmedSpecialtyBtn' class='Btn'>(UNARMED)</button>
                <div id='UnarmedSpecialtySec' class='Sec5'>
                    <p>Roll vs DEF. Punch or Headbutt: 1 BDMG. Kick: 2 BDMG. Add DMG Mod. 1:Prone.</p>
                </div><button id='WeaponrySpecialtyBtn' class='Btn'>(WEAPONRY)</button>
                <div id='WeaponrySpecialtySec' class='Sec5'>
                    <p>Roll vs DEF. 1:Drop weapon.</p>
                </div>
            </div>
        </div>
        <button id='DemeanorSkillsBtn' class='Btn'>DEMEANOR SKILLS</button>
        <div id='DemeanorSkillsSec' class='Sec3'>
            <button id='EntertainSkillBtn' class='Btn'>ENTERTAIN</button>
            <div id='EntertainSkillSec' class='Sec4'>
                <p>Any performance that captivates an audience.</p>
                <button id='DistractSpecialtyBtn' class='Btn'>(DISTRACT)</button>
                <div id='DistractSpecialtySec' class='Sec5'>
                    <p>Roll vs B. Target cannot use active DEF and Fails all Perception rolls for 1rnd. 1:Prone.</p>
                </div>
                <button id='InspireSpecialtyBtn' class='Btn'>(INSPIRE)</button>
                <div id='InspireSpecialtySec' class='Sec5'>
                    <p>1/week. d6mins. # = Comrades present. Each Comrade gets +1 Psyche. 1:-1 Psyche.</p>
                </div>
                <button id='LieSpecialtyBtn' class='Btn'>(LIE)</button>
                <div id='LieSpecialtySec' class='Sec5'>
                    <p>Roll vs Perception. Lie sincerely. 1:Slip up.</p>
                </div>
            </div>
            <button id='LeadershipSkillBtn' class='Btn'>LEADERSHIP</button>
            <div id='LeadershipSkillSec' class='Sec4'>
                <p>Using your force of personality on others.</p>
                <button id='EncourageSpecialtyBtn' class='Btn'>(ENCOURAGE)</button>
                <div id='EncourageSpecialtySec' class='Sec5'>
                    <p>1rnd. # = Comrade’s Demeanors. +d6 divided among Comrades to a roll each. 1:-1 all rolls.</p>
                </div>
                <button id='OrderSpecialtyBtn' class='Btn'>(ORDER)</button>
                <div id='OrderSpecialtySec' class='Sec5'>
                    <p>Roll vs D. -3 per Order per day. Target Extra obeys a harmless command. 1:Target disobeys.</p>
                </div>
                <button id='TauntSpecialtyBtn' class='Btn'>(TAUNT)</button>
                <div id='TauntSpecialtySec' class='Sec5'>
                    <p>Roll vs D. Provoke ATK in combat. High roll is a penalty to loser’s next roll. 1:Penalty x2.</p>
                </div>
            </div>
            <button id='TameSkillBtn' class='Btn'>TAME</button>
            <div id='TameSkillSec' class='Sec4'>
                <p>1/rnd. Roll vs Animal's D. Pets are Comrades.</p>
                <button id='CalmSpecialtyBtn' class='Btn'>(CALM)</button>
                <div id='CalmSpecialtySec' class='Sec5'>
                    <p>Improve animal's Attitude by 1. 1:Fight/flee.</p>
                </div>
                <button id='RideSpecialtyBtn' class='Btn'>(RIDE)</button>
                <div id='RideSpecialtySec' class='Sec5'>
                    <p>Mount obeys commands. 1:Thrown, d6 BDMG.</p>
                </div>
                <button id='TrainSpecialtyBtn' class='Btn'>(TRAIN)</button>
                <div id='TrainSpecialtySec' class='Sec5'>
                    <p>Takes 1 week. An animal can learn a number of Tricks = [its Brains x2]. One word commands.</p>
                    <button id='TricksBtn' class='Btn'>TRICKS</button>
                    <div id='TricksSec' class='Sec6'>
                        <button id='AttackTrickBtn' class='Btn'>ATTACK</button>
                        <div id='AttackTrickSec' class='Sec7'>
                            <p>MATK against a designated target.</p>
                        </div>
                        <button id='GuardTrickBtn' class='Btn'>GUARD</button>
                        <div id='GuardTrickSec' class='Sec7'>
                            <p>Stays close and alerts you if strangers approach.</p>
                        </div>
                        <button id='HideTrickBtn' class='Btn'>HIDE</button>
                        <div id='HideTrickSec' class='Sec7'>
                            <p>Stealth nearby until further notice.</p>
                        </div>
                        <button id='HuntingTrickBtn' class='Btn'>HUNTING</button>
                        <div id='HuntingTrickSec' class='Sec7'>
                            <p>Hunting roll using the pet's Skills. See Ch:4.</p>
                        </div>
                        <button id='PerformTrickBtn' class='Btn'>PERFORM</button>
                        <div id='PerformTrickSec' class='Sec7'>
                            <p>Entertain(Distract or Inspire) an audience.</p>
                        </div>
                        <button id='SearchTrickBtn' class='Btn'>SEARCH</button>
                        <div id='SearchTrickSec' class='Sec7'>
                            <p>Show it an item. Perception to go find another.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>