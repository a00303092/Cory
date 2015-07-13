(function(StoryManager){

    var passages = [];

    StoryManager.register = function(passage) {
        passages.push(passage);
    };

    StoryManager.Story = React.createClass({
        getInitialState: function() {
            return {passage: passages[0]};
        },

        nextPassage: function(passage) {
            if (passage != undefined) {
                this.setState({passage: passage});
            }
            else{
                var index = Math.floor((Math.random() * passages.length));
                this.setState({passage: passages[index]});
            }
        },

        start: function() {
            Frost.ItemManager.clearGround();
            StoryManager.nextPassage();
        },

        render: function() {
            StoryManager.nextPassage = this.nextPassage;
            if (this.state.passage)
                return React.createElement(this.state.passage);
            else
                return <a href='#' onClick={this.start}>Click Here to Start</a>
        }
    });

    StoryManager.StoryLink = React.createClass({
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
            if (this.props.req === undefined || Frost.ItemManager.hasItem(this.props.req))
                return <a href='#'onClick={this.click}>{this.formatText()}</a>
            else
                return <a href='#' style={{color:"grey"}}>{this.formatText()}</a>
        }
    });

    StoryManager.Replacer = React.createClass({
        getInitialState: function() {
            return {replacement: undefined};
        },
        setReplacement: function(passage, linkText) {
            if (passage != undefined)
                this.setState({replacement: passage, linkText: linkText});
            else
                StoryManager.nextPassage();
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

})(window.Frost.StoryManager = {});