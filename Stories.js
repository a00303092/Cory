

(function( Stories, $, undefined ) {

    var StoryLink = React.createClass({
        //componentDidMount: function() {
        //    Doll.Events.on('equipped', function() {
        //        this.forceUpdate();
        //    }.bind(this));
        //    Doll.Events.on('unequipped', function() {
        //        this.forceUpdate();
        //    }.bind(this))
        //},
        click: function() {
            this.props.nextPassage(this.props.passage, this.props.children);
        },
        formatText: function() {
            if (this.props.req === undefined)
                return this.props.children;
            else
                return "[" + this.props.req + "] " + this.props.children;
        },
        render: function() {
            if (this.props.req === undefined || Doll.hasProperty(this.props.req))
                return <a href='#'onClick={this.click}>{this.formatText()}</a>
            else
                return <a href='#' style={{color:"grey"}}>{this.formatText()}</a>
        }
    });

    var Replacer = React.createClass({
        getInitialState: function() {
            return {replacement: undefined};
        },
        setReplacement: function(passage, linkText) {
            if (passage != undefined)
                this.setState({replacement: passage, linkText: linkText});
            else
                this.props.nextPassage();
        },
        renderChildren: function () {
            return React.Children.map(this.props.children, function (child) {
                return React.addons.cloneWithProps(child, {
                    nextPassage: this.setReplacement
                });
            }.bind(this));
        },
        render: function() {
            if (this.state.replacement)
                return <div><p style={{color:"grey"}}><b>{this.state.linkText}</b></p>{React.createElement(this.state.replacement, {nextPassage: this.props.nextPassage})}</div>
            else
                return <div>{this.renderChildren()}</div>
        }
    });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var name = React.createClass({
        render: function () { return (
            <div>

            </div>
        )}
    });

    var relax = React.createClass({
        render: function () { return (
            <div>
                <p>You open your mouth wide open and slightly bend your head, so his penis can slide in and out without the slightest difficulty.</p>
                <p>He thrust a few more times. Then he grabs your head, pressing it on his crotch and you can feel pumping sea of his hot cum down to your throat.</p>
                <p>His grip weakens, and his buckets of sticky semen, mixed with your saliva is leaving your mouth.</p>
                <p>You're trying to swallow all that sticky fluid, but it is too much for you. Semen flows across your chin to your chest and falls on the floor in big drops.</p>
                <p>Everything around your gets dark and you lose consciousness.</p>

                <StoryLink nextPassage={this.props.nextPassage}>Run away!</StoryLink>
            </div>
        )}
    });

    var surrender = React.createClass({
        render: function () { return (
            <div>
                <p>He places one of his palms on your breast, massaging it roughly while the other swings, painfully slapping your ass a few times.</p>
                <p>Then he quickly takes off his waist cloth, forcibly pushing his filthy swollen member inside your mouth.</p>
                <p>He moves his pelvis forward, penetrating deep into your throat. You can not breathe when he starts rocking his pelvis, thrusting his cock inside and pulling it out again.</p>
                <p>You choke as he is furiously fucking your throat, while firmly holding your wrists over your head. You're gettin really sick and you don't know how much longer you can stand it.</p>

                <Replacer nextPassage={this.props.nextPassage}>
                    <StoryLink nextPassage={this.props.nextPassage} passage={relax}>Relax my throat and let him get deeper</StoryLink>
                </Replacer>
            </div>
        )}
    });

    Cory.StoryManager.register(React.createClass({
        render: function() { return (
            <div>
                <p>"Well, look what we have here. It not be safe to wander down here".</p>

                <p>"Not worry. I will not hurt. If you good girl and do what I want". He says with an ominous grin.</p>

                <p>"Bagor not had a juicy woman for a long time". He is eyeing you from head to toe, drooling.</p>
                <Replacer nextPassage={this.props.nextPassage}>
                    <StoryLink nextPassage={this.props.nextPassage} passage={surrender}>Surrender</StoryLink><br/>
                    <StoryLink nextPassage={this.props.nextPassage} req='Noisy'>Run away!</StoryLink>
                </Replacer>
            </div>
        )}
    }));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var jumped = React.createClass({
        render: function () { return (
            <div>
                <p>Some of them jump on me, frantically pulling down everything I wear. While others are watching eagerly.</p>
                <p>One of the goblins pushes me and the other grabs my hands, draging me down to him.</p>
                <p>"We will do everything we like. He,he.." Goblin reveals his rotten teeth to me, rubing my chest, while other plays with my hair.</p>
                <p>He runs his claws along my cheeks and chin, putting his filthy fingers into my mouth.</p>
                <p>Meanwhile the one behind my back is trying to tear down my clothes.</p>
                <p>They begin to rub my naked skin vigorously. One of them strokes my bust, painfully pinching my nipples. Another is tugging at my hair, scratching my back with his other hand.</p>
                <p>They laugh, while they're putting me on all four. One of them lie down under me, while others surround me.</p>
                <p>I can not keep the attention on what is happening around me. All I feel is a lot of small hands touching my helpless body all over.</p>
                <p>The goblin standing behind me grabs my buttcheeks, spreading them. Then I feel his little cock penetrating my butthole.</p>
                <p>The one in front of me also take out his green smelly member and stick it into my mouth, expecting me to lick it.</p>
                <p>The one beneath me grabs my hips, pushing his member into my vagina. Meanwhile the goblins standing around are staring at us, touching my hair, my shoulders, my thighs..</p>
                <p>I hear arousing grunts and groans all around me while the goblins paw my body, penetrating me mercilessly.</p>
                <p>Some of them take out their penises, masturbating, wathing me being fucked by their brethren.</p>
                <p>It doesn't take much longer and first droplet of goblin seed is already falling on my nose.</p>
                <p>The other two increase the speed of their moves rapidly, squirting their loads into both my holes simultaneously.</p>
                <p>When remaining goblins see that, they let their loads splashed on my naked body as well.</p>
                <p>Completely exhausted, with my skin sticky from goblin sperm, I sit on the floor, trying to catch his breath.</p>
                <p>"He, he, he.. That was really fun. Our hetman will be happy to see what slave girl we caught".</p>
                <p>"Stay here and don't you move! We'll get him". Most of them squeeze past the boulder into the next cave.</p>

                <StoryLink nextPassage={this.props.nextPassage}>Close your eyes, trying to forget what's happening.</StoryLink>

                <p>[But goblin doesn't wait for anything, and shoves his pintle into my mouth. I choke and almost throw up, when he runs it over my tongue.]</p>
            </div>
        )}
    });

    Cory.StoryManager.register(React.createClass({
        componentDidMount: function() {
            Doll.Events.on('unequipped', function() {
                this.props.nextPassage(jumped);
            }.bind(this))
        },
        render: function () { return (
            <div>
                <p>"What do you want in our cave? We not happy, you here!"</p>
                <p>Hrrr..! Let's kill her at once! Then eat her!</p>
                <p>No, no, no, no! This one doesn't look tasty at all!</p>
                <p>"Wait!" He laughs loudly. "This one looks like it could be fun with her".</p>
                <StoryLink nextPassage={this.props.nextPassage} passage={jumped}>Surrender</StoryLink><br/>
                <StoryLink nextPassage={this.props.nextPassage}>Run away!</StoryLink>
            </div>
        )}
    }));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //React.createClass({
    //    render: function () { return (
    //        <div>
    //        <p>There.. Stay still and do not try anything. [Righty is thinking for a moment.] So what to do with you, girl?
    //        Me know .. Me know .. <StartAction>[Lefty removes a strip of cloth tied around his waist, revealing two huge cocks hiding beneath it.]</Start>
    //        We either play with you or eat you. The choice is yours. <StartAction>[Righty grins, looking at me eagerly.]</Start>
    //            <StartHighlight>*Success*</Start> <StartAction>[As soon as I touch one of his members with my experienced hands, it immediately flips up, hitting my chin..]</Start>
    //            <StartHighlight>*Success*</Start> <StartAction>[I manage to grap each of his large cocs with one of my hands, massaging them simultaneously. With a heavily breathing he puts his hands behind his heads.]</Start>
    //            <StartAction>[His breathing is getting faster and he starts to rock his pelvis in coupling movements. He will ejaculate any second.]</Start>
    //        THAT'S IT! ..  IT'S HERE..!!! <StartAction>[A huge flow of hot fluid bathes me.]</Start>
    //
    //            <StartAction>[I almost can not see as his semen flows from my head down to my shoulders and my face. My hair and my skin are all dirty and sticky.]</Start>
    //            <StartAction>[Righty wipes sweat from his forehead]</Start> You were good. Better then female of our kind I must say.
    //        We're not done with you yet, little <race>. Look! <StartAction>[He points at his crotch, where a couple of penises is ready for new action.]</Start>
    //        Come here! <StartAction>[He holds my waist with his hands, lifting me easily up.]</Start>
    //        Whoa..! What are you doing?
    //            <StartAction>[The giant dick is sticking up under me like a ship mast while ettin is slowly moving me lower and lower.]</Start>
    //            <StartAction>[The tip of his penis encounters my hole. But he does not stop and continues to moving me down, stretching my lower lips. Severe pain goes through my body as his huge cock stuffs into my thin little slit.]</Start>
    //            <StartAction>[As he penetrates me deeper, my muscles are slowly giving up and my insides opening, adapting to his gigantic member. When half of his penis in me, he begins to slowly moving my body up again.]</Start>
    //            <StartAction>[Still holding the me tight, he is moving me up and down hitting my poor outspread pussy with his manhood, letting his second king-sized member sticking up in front of my bouncing chest.]</Start>
    //            <StartAction>[My ass and my pussy are burning like hell, as he is getting deeper and deeper inside. I can't believe that I am still not torn. Tears leaps out of my eyes.]</Start>
    //
    //        </p></div>
    //    )}
    //});

}( window.Stories = window.Stories || {}, jQuery ));
