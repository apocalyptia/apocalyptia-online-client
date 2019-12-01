<div class='traits-rules'>
    <h2>Traits</h2>
    <button id='TraitsBtn' class='Btn'>TRAITS</button>
    <div id='TraitsSec' class='Sec2'>
        <p>The four Traits range from 1 to 6. Most Characters get 12 points for Traits. Trait rolls are [d6 + Trait]. Trait rolls may be Trait vs a Difficulty(#), Trait vs Trait, or Trait vs Skill. Trait scores set the upper limit for the Skills below them.</p>
        <ol>
            <li>Feeble</li>
            <li>Poor</li>
            <li>Average</li>
            <li>Good</li>
            <li>Superior</li>
            <li>Best</li>
        </ol>
        <p>Traits act as the basis for the following Properties: Speed, Experience, Carry, Health, Threshold, and Luck.</p>
        <p>Properties are explained in each Trait's description below.</p>
        <p>Each Trait has an Instinct associated with it.</p>
        <p>Agility = Stealth, Brains = Perception, Constitution = Athletics, and Demeanor = Socialize. These Instincts are typically passive static values, most often used by the GN to compare against an Extra's Instinct. They can also be rolled actively, just like Skills. You must declare it when you actively use an Instinct.</p>

        <button id='RetrainingTraitsBtn' class='Btn'>RETRAINING TRAITS:</button>
        <div id='RetrainingTraitsSec' class='Sec3'>
            <p>1/year for 36XP you may move 1 point between Traits. Traits can only be changed by +1 or -1 in this way.</p>
        </div>

        <button id='AgilityTraitBtn' class='Btn'>AGILITY (A)</button>
        <div id='AgilityTraitSec' class='Sec3'>
            <p>Agility is a Character’s talent for manual dexterity and physical coordination. Characters with a high Agility are good at feats of balance, flexibility, and fine manipulation. Character’s with a low Agility are clumsy, stiff-jointed, and generally fumbling.</p>
            <p>Agility is the Trait that governs the Stealth Instinct, Fast actions, and also makes up half of the Speed Property, alongside Constitution. Agility is also the parent Trait for the Acrobatics Skill (including Dodge Defense), as well as the Larceny, and Ranged Skills.</p>
            <p>This means that Agility is very important for hiding from enemies, moving quickly, performing gymnastics, avoiding attacks, hiding items, disabling mechanisms, stealing, shooting guns or bows, and throwing weapons.</p>
            <button id='StealthInstinctBtn' class='Btn'>Stealth: [= A]</button>
            <div id='StealthInstinctSec' class='Sec4'>
                <p>This is your talent for remaining undetected. +3 Stealth if you are Prone and +3 more if you do not move on your turn. Stealth is usually a static number that is compared to an enemy's Perception.</p>
                <p>Stealth can be used actively as a bonus to a d6 roll to focus all of your effort on remaining undetected by nearby enemies, but your Speed is reduced by half.</p>
            </div>
            <button id='AgilityPropertiesBtn' class='Btn'>AGILITY PROPERTIES:</button>
            <div id='AgilityPropertiesSec' class='Sec4'>
                <button id='SpeedPropertyBtn' class='Btn'>SPEED: [A+C]</button>
                <div id='SpeedPropertySec' class='Sec5'>
                    <p>Tactical Speed in yards. You may move part of your Speed before and part after your action in combat. See Ch:2 for detailed Movement rules.</p>
                    <ul>
                        <li>Jog = [Speed x2] for up to miles = C.</li>
                        <li>Sprint = [(Speed x2) + d6 yds] for up to mins = C.</li>
                        <li>March = [Speed /2 mph] for up to C x2 hrs.</li>
                    </ul>
                </div>
            </div>
        </div>

        <button id='BrainsTraitBtn' class='Btn'>BRAINS (B)</button>
        <div id='BrainsTraitSec' class='Sec3'>
            <p>Brains is a Character’s talent for cognitive functioning and abstract thought. Characters with a high Brains are good at retaining and accessing knowledge, processing sensory input, and learning from personal experiences. Characters with a low Brains are absent minded, forgetful, and dull-witted.</p>
            <p>Brains is the Trait that governs the Perception Instinct and is the basis of the Experience Property.  Brains is also the parent Trait for the Medicine, Science, and Survival Skills.</p>
            <p>This means that Brains is very important for awareness, improving through reflection, performing medical procedures to treat wounds, mixing Drugs and Bombs, working on electronics, counseling others, and using primitive skills to shelter, forage, and navigate.</p>
            <button id='PerceptionInstinctBtn' class='Btn'>PERCEPTION: [= B]</button>
            <div id='PerceptionInstinctSec' class='Sec4'>
                <p>Allows the gathering of detailed information from all of your senses. Penalties for distance vary by sense and circumstances but -1 per 30yds is standard to See and Hear from far away.</p>
                <p>Perception is a static number that is compared to a Difficulty determined by the GN. It is only a bonus to a roll when a Character is actively searching (vs Stealth or Larceny), tracking (vs Survival), discerning (vs Socialize or Entertain), or Scavenging (# by AREA).</p>
                <p>Reflex is the base Difficulty that an enemy must beat to hit the Character whenever the Character is caught unaware. Reflex is equal to Perception.</p>
            </div>
            <button id='BrainsPropertiesBtn' class='Btn'>BRAINS PROPERTIES:</button>
            <div id='BrainsPropertiesSec' class='Sec4'>
                <button id='ExperiencePropertyBtn' class='Btn'>EXPERIENCE (XP): [= B/in-game week]</button>
                <div id='ExperiencePropertySec' class='Sec5'>
                    <p>XP is shown on the Character Sheet as Unspent XP and Total XP. XP is awarded at the end of each in-game week. The GN can give bonus XP when appropriate. Spend XP to buy Abilities.</p>
                </div>
            </div>
        </div>

        <button id='ConstitutionTraitBtn' class='Btn'>CONSTITUTION (C)</button>
        <div id='ConstitutionTraitSec' class='Sec3'>
            <p>Constitution is a Character’s talent for physical strength and durability. Character’s with a high Constitution are extremely healthy, can lift a great deal of weight, and have strong immune systems. Character’s with a low Constitution cannot withstand very much punishment, are physically weak, and sickly.</p>
            <p>Constitution is the Trait that governs the Athletics Instinct. Constitution determines DMG Mod, Health, Carry, which weapons and armor you can use effectively, and it also makes up half of the Speed Property, along with Agility, and half of the Pain Threshold Property, with Demeanor. Constitution is also the parent Trait for the Build and Drive Skills as well as the Melee (including Block Defense) Skill.</p>
            <p>This means that Constitution is very important for absorbing damage, resisting disease, recovering from wounds, moving quickly, climbing and swimming, making, modifying, and repairing items, driving vehicles, attacking and defending with hand-to-hand weapons, and carrying and using heavy equipment.</p>
            <button id='AthleticsInstinctBtn' class='Btn'>ATHLETICS: [= C]</button>
            <div id='AthleticsInstinctSec' class='Sec4'>
                <p>This is the mastery of physically demanding and specialized forms of movement.</p>
                <ul>
                    <li>Climbing: Move at [Speed /2]</li>
                    <li>Rappelling: Move at [Speed x4] with a rope</li>
                    <li>Swimming: Move at [Speed /4]</li>
                </ul>
                <p>Difficulties are determined by the GN based on a wide variety of factors. Moving with Athletics usually takes your entire action. In some circumstances it may be possible to attack between Athletics rolls (kicking a climber on the wall next to you, for example) but doing so prevents your movement that round. Penalties that apply to Athletics rolls will almost always apply to any ATK or DEF while using Athletics.</p>
            </div>
            <button id='ConstitutionPropertiesBtn' class='Btn'>CONSTITUTION PROPERTIES:</button>
            <div id='ConstitutionPropertiesSec' class='Sec4'>
                <button id='CarryPropertyBtn' class='Btn'>CARRY: [= Cx6]</button>
                <div id='CarryPropertySec' class='Sec5'>
                    <p>This is the maximum total item Size you can haul comfortably. -1 Speed, DEF, and all rolls for each point of Size in excess of your Carry limit</p>
                </div>
                <button id='DMGModPropertyBtn' class='Btn'>DMG MOD: [=(C/3)-1]</button>
                <div id='DMGModPropertySec' class='Sec5'>
                    <p>Modifier to DMG when using Melee and muscle-powered Ranged weapons as follows:</p>
                    <ol>
                        <li>-1</li>
                        <li>-1</li>
                        <li>-0</li>
                        <li>+0</li>
                        <li>+1</li>
                        <li>+1</li>
                    </ol>
                </div>
                <button id='ThresholdPropertyBtn' class='Btn'>THRESHOLD [= C+D]</button>
                <div id='ThresholdPropertySec' class='Sec5'>
                    <p>The maximum Pain you can take before going unconscious. Any Blunt DMG that is taken after Pain has reached the Threshold is lethal and so reduces HP.</p>
                </div>
                <button id='HealthPropertyBtn' class='Btn'>HEALTH (HP): [Torso HP = C x2, Head and Limb HP = C]</button>
                <div id='HealthPropertySec' class='Sec5'>
                    <p>This is the amount of DMG you can take. Limbs are disabled and Bleeding at 0HP, and destroyed at -C. You go unconscious at 0HP on Head or Torso, and die at -C.</p>
                </div>
            </div>
        </div>

        <button id='DemeanorTraitBtn' class='Btn'>DEMEANOR (D)</button>
        <div id='DemeanorTraitSec' class='Sec3'>
            <p>Demeanor is a Character’s talent for navigating social encounters and sheer force of will. Character’s with a high Demeanor are charismatic, self-driven, and inspire confidence. Character’s with a low Demeanor are poor speakers, easily discouraged, find it difficult to make friends, and often feel hopeless about their lives.</p>
            <p>Demeanor is the Trait that governs the Socialize Instinct. Demeanor is the amount of Luck and Psyche a Character starts with. Demeanor is also the parent Trait for the Entertain, Leadership, and Tame Skills.</p>
            <p>This means that Demeanor is very important for altering fate, staying sane, haggling, keeping friends, resisting torture, lying convincingly, taking command, intimidating opponents, and handling animals.</p>
            <div id='SocializeInstinctBtn'>SOCIALIZE: [= D]</div>
            <div id='SocializeInstinctSec' class='Sec4'>
                <p>This is the subtle art of gaining the upper hand in conversation. Uses include persuading an individual or crowd with a speech, gaining information, currying favor, or just general politicking.</p>
                <p>Socialize should be used to quantify roleplaying interaction when necessary, not as a replacement for it.</p>
            </div>
            <div id='DemeanorPropertiesBtn'>DEMEANOR PROPERTIES:</div>
            <div id='DemeanorPropertiesSec' class='Sec4'>
                <div id='ComradesPropertyBtn'>COMRADES:</div>
                <div id='ComradesPropertySec' class='Sec5'>
                    <p>Loyal friends and pets who make your life worth living. It takes at least a month to make a new Comrade. Your Comrade must also consider you a Comrade. Only Comrades get bonuses from Demeanor Skills. Comrades should be listed in order of priority to your Character.</p>
                </div>
                <div id='LuckPropertyBtn'>LUCK: [= D]</div>
                <div id='LuckPropertySec' class='Sec5'>
                    <p>You may spend Luck in dramatic moments to:</p>
                    <ul>
                        <li>Add an Exploding 6 to a roll you just made.</li>
                        <li>Take an additional Fast action on your turn.</li>
                        <li>Give a Luck point to a Comrade in the AREA.</li>
                    </ul>
                    <p>Luck points refill at dawn each day. The GN may call for a Luck roll [d6 + current Luck points] for chance events that do not apply to Traits, Skills or Instincts.</p>
                </div>
                <div id='PsychePropertyBtn'>PSYCHE: [= D]</div>
                <div id='PsychePropertySec' class='Sec5'>
                    <p>This is a measure of your Character’s mental health on a scale from Crazy to Sane. See Psyche.</p>
                </div>
            </div>
        </div>
    </div>
</div>