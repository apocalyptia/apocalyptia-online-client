<div class="situations-rules">
    <h2>Situations</h2>
    <button id="SituationsBtn" class="Btn">SITUATIONS</button>
    <div id="SituationsSec" class="Sec2">
        <p>These are special circumstances with unique effects.</p>
        <button id="BleedingSitBtn" class="Btn">BLEEDING</button>
        <div id="BleedingSitSec" class="Sec3">
            <p>After lethal DMG, take 1DMG/min to Torso HP. Roll Medicine(First-Aid) or C [# = DMG] to stop (Pain penalty applies). A Bleeding wound can be cauterized by doing 1FDMG to the Location.</p>
        </div>
        <button id="ChaseSitBtn" class="Btn">CHASE</button>
        <div id="ChaseSitSec" class="Sec3">
            <p>Make opposed Athletics, Tame, or Drive rolls each round. +1 Success/rnd for the faster mode of transportation. Keep track of both sides’ total Successes. The Chase ends when the pursuer gives up or one side accumulates 3 Successes above their opponent.</p>
        </div>
        <button id="CoverSitBtn" class="Btn">COVER</button>
        <div id="CoverSitSec" class="Sec3">
            <p>Reduce DMG from ATKs that target a Location that is behind Cover by an amount equal to the Material’s Damage Reduction (DR). Roll Block with a Shield to use it’s Cover DR against an RATK.</p>
            <button id="MaterialSitBtn" class="Btn">MATERIAL</button>
            <div id="MaterialSitSec" class="Sec3">
                <ul>
                    <li>Drywall: 1DR</li>
                    <li>Glass: 1DR</li>
                    <li>Furniture: 3DR</li>
                    <li>Wood: 3DR</li>
                    <li>Sheet Metal: 6DR</li>
                    <li>Brick: 9DR</li>
                    <li>Concrete: 12DR</li>
                    <li>Log: 15DR</li>
                    <li>Water (per ft): 18DR</li>
                </ul>
            </div>
        </div>
        <button id="DeafnessSitBtn" class="Btn">DEAFNESS</button>
        <div id="DeafnessSitSec" class="Sec3">
            <p>Fail Perception(Hear) rolls. No audible communication. Guns without Suppressors cause Deafness within 10yds for 1rnd.</p>
        </div>
        <button id="FallingSitBtn" class="Btn">FALLING</button>
        <div id="FallingSitSec" class="Sec3">
            <p>1 BDMG/yd after the first to Torso. Fast, Acrobatics # = height in yds for BDMG/2 and choose which Location(s) take BDMG.</p>
        </div>
        <button id="FriendlyFireSitBtn" class="Btn">FRIENDLY FIRE</button>
        <div id="FriendlyFireSitSec" class="Sec3">
            <p>-3 RATK to shoot at a target within 1yd of an ally. F:Roll a d6 RATK (no modifiers) vs ally's Reflex.</p>
        </div>
        <button id="GrabbedSitBtn" class="Btn">GRABBED</button>
        <div id="GrabbedSitSec" class="Sec3">
            <p>Use Reflex for DEF. Cannot ATK. Roll Acrobatics or Melee vs Grab # to escape. Succeed by 3+ at Melee to reverse the Grab.</p>
        </div>
        <button id="NeedsSitBtn" class="Btn">NEEDS</button>
        <div id="NeedsSitSec" class="Sec3">
            <p>-1 all rolls for each Need that isn’t met per unit of time.</p>
            <button id="SitBtn" class="Btn">DEHYDRATION</button>
            <div id="SitSec" class="Sec4">
                <p>Die after C days without 1 Water.</p>
            </div>
            <button id="ExhaustionSitBtn" class="Btn">EXHAUSTION</button>
            <div id="ExhaustionSitSec" class="Sec4">
                <p>D# = hrs/6 to stay up past 24hrs without 6hrs sleep.</p>
            </div>
            <button id="HypothermiaSitBtn" class="Btn">HYPOTHERMIA</button>
            <div id="HypothermiaSitSec" class="Sec4">
                <p>Die after C hours exposed to freezing weather.</p>
            </div>
            <button id="StarvationSitBtn" class="Btn">STARVATION</button>
            <div id="StarvationSitSec" class="Sec4">
                <p>Die after C weeks without 1 Food.</p>
            </div>
            <button id="SuffocationSitBtn" class="Btn">SUFFOCATION</button>
            <div id="SuffocationSitSec" class="Sec4">
                <p>Die after C minutes without air.</p>
            </div>
        </div>
        <button id="PainSitBtn" class="Btn">PAIN</button>
        <div id="PainSitSec" class="Sec3">
            <p>-1 to all rolls per point of DMG or other Pain source. Pain fades as DMG heals. Pain not caused by HP loss heals at 1/min.</p>
            <button id="ThresholdSitBtn" class="Btn">THRESHOLD</button>
            <div id="ThresholdSitSec" class="Sec4">
                <p>Go unconscious when Pain exceeds [C + D]. 	Any further Blunt DMG is considered lethal DMG instead.</p>
            </div>
        </div>
        <button id="ProneSitBtn" class="Btn">PRONE</button>
        <div id="ProneSitSec" class="Sec3">
            <p>+1 RATK. Use Reflex for DEF. +3 Stealth. Speed 1yd.</p>
        </div>
        <button id="RangeSitBtn" class="Btn">RANGE (RNG)</button>
        <div id="RangeSitSec" class="Sec3">
            <p>RATKs have a RNG increment in yards. -1 RATK per RNG after the first up to -9 RATK at 10x RNG. RATKs in first RNG target Torso. RATKs beyond that are random Location rolls or Called Shots.  For Scatter, RNG is a penalty to DMG and a bonus to RATK.</p>
        </div>
        <button id="ReflexSitBtn" class="Btn">REFLEX</button>
        <div id="ReflexSitSec" class="Sec3">
            <p>Reflex = Perception. This is default Defense if you are conscious but unaware or out of Fast actions for active Defense. Reflex is never rolled. It is a static Difficulty for enemy ATKs.</p>
        </div>
        <button id="StunnedSitBtn" class="Btn">STUNNED</button>
        <div id="StunnedSitSec" class="Sec3">
            <p>You cannot do anything. You are unaware (-6 Perception). Use Reflex for DEF. Fall Prone if Stunned more than 1 rnd.</p>
        </div>
        <button id="TerrainSitBtn" class="Btn">TERRAIN</button>
        <div id="TerrainSitSec" class="Sec3">
            <p>-1 to -6 Athletics, Acrobatics, Drive, and Speed.</p>
            <button id="AcidRainSitBtn" class="Btn">ACID RAIN</button>
            <div id="AcidRainSitSec" class="Sec4">
                <p>-1 Athletics, Acrobatics, Drive, and Speed</p>
            </div>
            <button id="BlizzardSitBtn" class="Btn">BLIZZARD</button>
            <div id="BlizzardSitSec" class="Sec4">
                <p>-1/inch Athletics, Acrobatics, Drive, and Speed</p>
            </div>
            <button id="DesertSitBtn" class="Btn">DESERT</button>
            <div id="DesertSitSec" class="Sec4">
                <p>-1 Athletics, Acrobatics, Drive, and Speed</p>
            </div>
            <button id="ForestSitBtn" class="Btn">FOREST</button>
            <div id="ForestSitSec" class="Sec4">
                <p>-1 Athletics, Acrobatics, Drive, and Speed</p>
            </div>
            <button id="HailSleetSitBtn" class="Btn">HAIL/SLEET</button>
            <div id="HailSleetSitSec" class="Sec4">
                <p>-3 Athletics, Acrobatics, Drive, and Speed</p>
            </div>
            <button id="MountainSitBtn" class="Btn">MOUNTAIN</button>
            <div id="MountainSitSec" class="Sec4">
                <p>-1 Athletics, Acrobatics, Drive, and Speed</p>
            </div>
            <button id="RainStormSitBtn" class="Btn">RAIN STORM</button>
            <div id="RainStormSitSec" class="Sec4">
                <p>-1 Athletics, Acrobatics, Drive, and Speed</p>
            </div>
            <button id="SnowSitBtn" class="Btn">SNOW</button>
            <div id="SnowSitSec" class="Sec4">
                <p>-1/in Athletics, Acrobatics, Drive, and Speed</p>
            </div>
            <button id="SwampSitBtn" class="Btn">SWAMP</button>
            <div id="SwampSitSec" class="Sec4">
                <p>-6 Athletics, Acrobatics, Drive, and Speed</p>
            </div>
            <button id="TundraSitBtn" class="Btn">TUNDRA</button>
            <div id="TundraSitSec" class="Sec4">
                <p>-6 Athletics, Acrobatics, Drive</p>
            </div>
        </div>
        <button id="UnarmedSitBtn" class="Btn">UNARMED</button>
        <div id="UnarmedSitSec" class="Sec3">
            <p>Punch or Headbutt: 1 DMG. Kick: 2 DMG. Unarmed MATKs do BDMG. BDMG is only Pain until Pain exceeds the Threshold [C + D]. AR is not reduced by Unarmed DMG.</p>
        </div>
        <button id="UnstableSitBtn" class="Btn">UNSTABLE</button>
        <div id="UnstableSitSec" class="Sec3">
            <p>-3 all physical rolls. -3 to RATKs at or from you.</p>
        </div>
        <button id="VisibilitySitBtn" class="Btn">VISIBILITY</button>
        <div id="VisibilitySitSec" class="Sec3">
            <p>-1 to -6 to all sight-based rolls. GN discretion.</p>
        </div>
    </div>
</div>