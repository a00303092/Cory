

(function(StoryManager) {

    var sneak = React.createClass({
        render: function() { return (
            <div>
                <p>You manage to carefully sneak up behind the oblivious goblin.</p>

                <StoryManager.Replacer>
                    <StoryManager.StoryLink req='Knife'>Stab the gobin in the back</StoryManager.StoryLink><br/>
                    <StoryManager.StoryLink req='Sword'>Swing for the goblin's neck</StoryManager.StoryLink><br/>
                    <StoryManager.StoryLink>Strange the goblin with your bare hands</StoryManager.StoryLink>
                </StoryManager.Replacer>
            </div>
        )}
    });

    StoryManager.register(React.createClass({
        render: function() { return (
            <div>
                <p>You see a lone goblin wandering the passage up ahead.</p>

                <StoryManager.Replacer>
                    <StoryManager.StoryLink passage={sneak}>Sneak up on the goblin</StoryManager.StoryLink><br/>
                    <StoryManager.StoryLink req='Sword'>Charge the goblin</StoryManager.StoryLink>
                </StoryManager.Replacer>
            </div>
        )}
    }));



}( Frost.StoryManager));


//You feel your axe cleave through several ribs, each rib cracking separately from your mighty blow. Vast quantities of blood drop to the floor. You take your axe out of his ribcage, and your opponent slumps to the floor like a ragdoll, dead as dead can be.

//You slash open your opponent's gut, who is now frantically trying to keep his innards in. It is to no avail. His intestines litter the ground and he keels over dead.

//"You find a stick. It has been broken. By something."

//Your fireball roars across the room with terrifying speed and detonates in the midst of the goblins. The goblins, being unable to react quickly enough, are blow apart in the explosion into millions of tiny pieces. A finger from one of them lands in your hair and the iron-tinged smell of evaporated blood and burnt flesh assails your nostrils...

//your swing clangs harmlessly off of the orc's armor and he laughs mercilessly at you while reading his next counter-attack with an evil grin...

// the smell of sulphur stings your nose as small embers materialize in the air above the fray. You see the goblins look up, surprise and terror on their faces, just before they are consumed in flame. The intense heat washes over you. They die without even having time to scream. You smell burning hair, and realize it is your eyebrows. The nauseating smell of charred goblin then wafts over the room

//Your dirk plunged into the man's gut. You feel the blood pour over your grip. It's warm on your hand, and you can feel the man's resistance to you give way--his body start to go slack. You're staring right into his eyes, and his focus seems at your but also somewhere past you. The smell of his open gut invades your nostrils, and when a puff of breath blows into your face, you realize it was the man's last.

//ss knees give, and you slide him to the floor. His body slips off your dirk as you let him drop. Blood drips from your crimson dirk.

//ou know that you've just killed your first man."

//https://docs.google.com/spreadsheets/d/1AhUyjoFrl9F3BjVM6zmpbk7cCH7D5FTWhuvQfOIBUVE/edit?usp=sharing