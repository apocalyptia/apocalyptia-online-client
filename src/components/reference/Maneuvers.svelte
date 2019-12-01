<div class='maneuvers-rules'>
    <h2>Maneuvers</h2>
    <button id='ManeuversBtn' class='Btn'>MANEUVERS</button>
    <div id='ManeuversSec' class='Sec2'>
        <p>These are special combat actions that allow for more creative and detailed combat options than a basic MATK or RATK. The GN may allow Maneuvers to be performed together in combination.</p>
        <p># = Difficulty.  MATK = Melee.  RATK = Ranged.  DEF = Defense.</p>
        <button id='DefensiveBtn' class='Btn'>DEFENSIVE MANEUVERS</button>
        <div id='DefensiveSec' class='Sec3'>
            <button id='BlockManBtn' class='Btn'>BLOCK</button>
            <div id='BlockManSec' class='Sec4'>
                <p>Melee roll vs ATK. This is your DEF for that ATK. You cannot normally Block Guns unless you use a Shield for Cover. This counts as a Fast action for the rnd.</p>
            </div>
            <button id='DistractManBtn' class='Btn'>DISTRACT</button>
            <div id='DistractManSec' class='Sec4'>
                <p>To divert an opponent's attention, roll Entertain(Distract) vs Perception. The opponent uses Reflex for DEF for 1rnd. Botch = fall Prone.</p>
            </div>
            <button id='DodgeManBtn' class='Btn'>DODGE</button>
            <div id='DodgeManSec' class='Sec4'>
                <p>Acrobatics roll vs ATK. This is your DEF for that ATK. This counts as a Fast action for the rnd.</p>
            </div>
            <button id='DuckManBtn' class='Btn'>DUCK</button>
            <div id='DuckManSec' class='Sec4'>
                <p>Fast. Take Cover. Material’s DR reduces DMG. See Cover in SITUATIONS.</p>
            </div>
            <button id='FullDefenseManBtn' class='Btn'>FULL DEFENSE</button>
            <div id='FullDefenseManSec' class='Sec4'>
                <p>Make no ATK this rnd. You get a bonus to DEF rolls this rnd equal to your Reflex.</p>
            </div>
            <button id='ProtectManBtn' class='Btn'>PROTECT</button>
            <div id='ProtectManSec' class='Sec4'>
                <p>Fast. To put yourself between danger and someone within 1yd, roll Dodge vs their DEF when they are attacked. If you Succeed, and the attack Succeeds, you are hit instead of them.</p>
            </div>
            <button id='ShoveManBtn' class='Btn'>SHOVE</button>
            <div id='ShoveManSec' class='Sec4'>
                <p>Fast. 0DMG MATK. Roll C vs C to push a target d6/2yds away.</p>
            </div>
            <button id='SprintManBtn' class='Btn'>SPRINT</button>
            <div id='SprintManSec' class='Sec4'>
                <p>Spend your entire turn moving [Speed x2 + d6yds]. You can Sprint for minutes = C. Use Reflex for DEF. Unstable (-3 RATKs at or from you) unless Sprinting directly toward your opponent.</p>
            </div>
            <button id='TauntManBtn' class='Btn'>TAUNT</button>
            <div id='TauntManSec' class='Sec4'>
                <p>Leadership(Taunt) vs D. In combat, provoke the target into attacking you. Using a weapon adds the greater of DMG or Size. The result is a penalty to the loser’s next roll.</p>
            </div>
        </div>
        <button id='OffensiveBtn' class='Btn'>OFFENSIVE MANEUVERS</button>
        <div id='OffensiveSec' class='Sec3'>
            <button id='AimManBtn' class='Btn'>AIM</button>
            <div id='AimManSec' class='Sec4'>
                <p>Hold your Ranged weapon on target for 1rnd to get a +1 bonus to RATK next rnd, up to 3 consecutive rnds for +3 RATK. Use Reflex for DEF while Aiming. Aim bonus is negated if you move or take DMG.</p>
            </div>
            <button id='AmbushManBtn' class='Btn'>AMBUSH</button>
            <div id='AmbushManSec' class='Sec4'>
                <p>Roll Stealth vs Perception while your target is unaware of your presence. Targets use only their Reflex for DEF.</p>
            </div>
            <button id='CalledShotManBtn' class='Btn'>CALLED SHOT</button>
            <div id='CalledShotManSec' class='Sec4'>
                <p>ATK targeting a specific body Location.</p>
                <p>MATK penalties: -3 (Eye), -1 (Head), -0 (Arm, Torso, or Leg).</p>
                <p>RATK penalties: -6 (Eye), -3 (Head), -1 (Arm or Leg), -0 Torso.</p>
                <button id='DisarmManBtn' class='Btn'>DISARM</button>
                <div id='DisarmManSec' class='Sec5'>
                    <p>Arm [MATK vs C/2 if 1h, MATK vs C if 2h]. 0DMG. Attacker gets the weapon if Disarming with an Unarmed MATK.</p>
                </div>
                <button id='TripManBtn' class='Btn'>TRIP</button>
                <div id='TripManSec' class='Sec5'>
                    <p>Legs. Optional 0DMG. A vs C. Knock target Prone.</p>
                </div>
            </div>
            <button id='DualWieldManBtn' class='Btn'>DUAL-WIELD</button>
            <div id='DualWieldManSec' class='Sec4'>
                <p>Extra Block for free or Fast ATK with Off-hand weapon. -1 (Primary), -3 (Off-hand). Total Size cannot exceed C x2.</p>
            </div>
            <button id='GrabManBtn' class='Btn'>GRAB</button>
            <div id='GrabManSec' class='Sec4'>
                <p>0DMG Unarmed MATK as a Called Shot to disable a Location. Use Reflex for DEF. Fast action to maintain a Grab.</p>
                <button id='DefenderManBtn' class='Btn'>DEFENDER</button>
                <div id='DefenderManSec' class='Sec5'>
                    <p>Cannot ATK with Grabbed Location. Use Reflex for DEF. Acrobatics or Melee vs Grab ATK to escape. Succeed by 3+ with Melee to reverse the Grab.</p>
                </div>
                <button id='HoldManBtn' class='Btn'>HOLD</button>
                <div id='HoldManSec' class='Sec5'>
                    <p>Fast. You may Block ATKs using the Defender as a Shield. Defender counts as Cover.</p>
                </div>
                <button id='LockManBtn' class='Btn'>LOCK</button>
                <div id='LockManSec' class='Sec5'>
                    <p>1 BDMG/rnd to the Grabbed Location.</p>
                </div>
                <button id='TackleManBtn' class='Btn'>TACKLE</button>
                <div id='TackleManSec' class='Sec5'>
                    <p>Sprint and Grab Torso. Combatants both fall Prone.</p>
                </div>
            </div>
            <button id='OverwatchManBtn' class='Btn'>OVERWATCH</button>
            <div id='OverwatchManSec' class='Sec4'>
                <p>+1 Perception and RATKs from higher ground.</p>
            </div>
            <button id='ReloadManBtn' class='Btn'>RELOAD</button>
            <div id='ReloadManSec' class='Sec4'>
                <p>Drop empty magazine or shell casings (Fast action), then load one new magazine or 2 new shells per rnd. Use Reflex for DEF.</p>
            </div>
            <button id='SuppressingFireManBtn' class='Btn'>SUPPRESSING FIRE</button>
            <div id='SuppressingFireManSec' class='Sec4'>
                <p>With an Auto gun, pick a 90° firing arc and fire 10 shots/rnd. Make one RATK roll with a d6 only, no bonuses. Until your next turn, the closest 10 individuals in your firing arc take the RATK vs Reflex. RNG penalties apply. Use Reflex for DEF.</p>
            </div>
        </div>
    </div>
</div>