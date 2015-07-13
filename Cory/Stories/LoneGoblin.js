

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
