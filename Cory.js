
(function( Cory, $, undefined ) {

    var passages = [];

    Cory.StoryManager = {};
    Cory.StoryManager.register = function(passage) {
        passages.push(passage);
    };

    var Story = React.createClass({
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

       render: function() {
           if (this.state.passage)
               return React.createElement(this.state.passage,{nextPassage:this.nextPassage});
           else
               return <a href='#' onClick={function(){this.nextPassage();}.bind(this)}>Click Here to Start</a>
       }
    });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var Attributes = React.createClass({
        //componentDidMount: function() {
        //    Doll.Events.on('equipped', function() {
        //        this.forceUpdate();
        //    }.bind(this));
        //    Doll.Events.on('unequipped', function() {
        //        this.forceUpdate();
        //    }.bind(this));
        //},
        render: function() {
            return (
                <div>
                    <p><a href='#' data-toggle="popover" data-container="body" data-placement="left" data-trigger="hover" title="Strenght" data-content="Strength measures muscle and physical power.">Strength</a>: 10</p>
                    <p><a href='#' data-toggle="popover" data-container="body" data-placement="left" data-trigger="hover" title="Dexterity" data-content="Dexterity measures hand-eye coordination, agility, reflexes, and balance.">Dexterity</a>: 10</p>
                    <hr/>
                </div>
            );
        }
    });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var Test = React.createClass({
        render: function() {
            console.log('rendering');
            if (this.props.showEditor)
                return <h3>editor</h3>
            else
                return <h3>nothing</h3>;
        }
    });

    var Foundation = React.createClass({
        getInitialState: function() {
            return {showEditor: false};
        },
        showEditor: function() {
            console.log('setting showEditor');
            this.setState({showEditor: true});
        },
        loadItems: function() {
            var input = window.document.createElement('input');
            input.type = 'file';
            input.onchange = function(e){
                var reader = new FileReader();
                var file = e.target.files[0];

                reader.onload = function(upload) {
                    ItemManager.deserialize(JSON.parse(upload.target.result))
                }

                reader.readAsText(file);
            };
            input.onclick = function(){console.log('click')};
            document.body.appendChild(input)
            input.click();

            document.body.removeChild(input);
        },
        saveItems: function() {
            var csv = JSON.stringify(ItemManager.serialize());
            var csvData = 'data:application/octet-stream;charset=utf-8,'
                + encodeURIComponent(csv);

            var a = window.document.createElement('a');
            a.href = window.URL.createObjectURL(new Blob([csv], {type: 'application/octet-stream'}));
            a.download = 'filename.txt';

            document.body.appendChild(a)
            a.click();

            document.body.removeChild(a);
        },
        render: function(){
            console.log('rendering Foundation');
            var editor = false;
            if (this.state.showEditor)
                editor = <Editor.Editor />

            return (
                <div className="container">
                    <nav className="navbar navbar-default">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="#">Cory</a>
                            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                                <ul className="nav navbar-nav">
                                    <li className="active"><a href="#">Link <span className="sr-only">(current)</span></a></li>
                                    <li><a href="#">Link</a></li>
                                </ul>
                                <ul className="nav navbar-nav navbar-right">
                                    <li><a href="#" onClick={this.loadItems}>Load Items</a></li>
                                    <li><a href="#" onClick={this.saveItems}>Save Items</a></li>
                                    <li><a href="#" data-toggle="modal" data-target="#exampleModal">Create Item</a></li>
                                    <li><a href="#" onClick={this.showEditor}>Editor</a></li>
                                </ul>
                            </div>
                        </div>
                    </nav>

                    <div className="col-md-3">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <canvas id="canvas" width="600" height="600"></canvas>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="panel panel-default">
                            <div className="panel-body">
                            <Story />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <Attributes />
                            </div>
                        </div>
                        {editor}
                    </div>
                </div>
            );
        }
    });

    React.render(<Foundation/>, document.body);

    Frost.init();

    $(function () {
        $('[data-toggle="popover"]').popover()
    })

}( window.Cory = window.Cory || {}, jQuery ));
