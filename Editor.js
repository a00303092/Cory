(function( Editor, $, undefined ) {
    //Private Property

    var pickingCollider = false;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var selectionBroker = {
        callbacks: [],
        push: function(callback) {
            this.callbacks.unshift(callback);
        },
        pop: function() {
            this.callbacks.shift();
        },
        init: function() {
            var self = this;
            Cory.canvas.on('mouse:down', function(options) {
                if (options.target && self.callbacks.length > 0)
                    self.callbacks[0](options.target);
            });
        }
    };

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var PositionInput = React.createClass({
        componentDidMount: function(){
            Cory.canvas.on('object:moving', this.movement );
        },
        movement: function(){ this.forceUpdate(); },
        plus: function(){ this.props.activeItem[this.props.field] += 1; this.props.activeItem.update();},
        minus: function(){ this.props.activeItem[this.props.field] -= 1; this.props.activeItem.update();},
        change: function(){
            console.log(this.refs.value.getDOMNode().value);
            this.props.activeItem[this.props.field] = +this.refs.value.getDOMNode().value;
            this.props.activeItem.update();
            this.forceUpdate();
        },
        render: function(){
            return(
                <div className='input-group'>
                    <span className="input-group-addon"><a href="#" onClick={this.plus}><span className="glyphicon glyphicon-plus"></span></a></span>
                    <input type="text" ref="value" className="form-control" onChange={this.change} value={this.props.activeItem[this.props.field]}/>
                    <span className="input-group-addon"><a href="#" onClick={this.minus}><span className="glyphicon glyphicon-minus"></span></a></span>
                </div>
            );
        }
    });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var Collision = React.createClass({
        componentDidMount: function(){
            if (this.props.collider) {
                this.setState({
                    collider: this.props.collider.item,
                    left: this.props.collider.left,
                    top: this.props.collider.top
                });
            }
        },
        getInitialState: function() {
            return {
                pickingCollider: false,
                collider: undefined,
                left: 0,
                top: 0
            };
        },
        setPosition: function() {
            this.setState({left: this.props.activeItem.left, top: this.props.activeItem.top});
        },
        pickCollider: function() {
            if (this.state.pickingCollider) {
                this.setState({pickingCollider: false});
                selectionBroker.pop();
                return;
            }
            var self = this;
            this.setState({pickingCollider: true});
            selectionBroker.push(function(image){
                selectionBroker.pop();
                self.setState({pickingCollider: false, collider: image.parentItem});
            });
        },
        save: function() {
            if (this.props.collider) {
                this.props.collider.top = this.state.top;
                this.props.collider.left = this.state.left;
            }
            else{
                this.props.activeItem.collisions.push({item: this.state.collider, left: this.state.left, top: this.state.top});
                this.setState(this.getInitialState());
                this.props.parent.forceUpdate();
            }
        },
        componentWillReceiveProps: function(nextProps) {
            if (nextProps.collider) {
                this.setState({
                    collider: nextProps.collider.item,
                    left: nextProps.collider.left,
                    top: nextProps.collider.top
                });
            }
        },
        render: function() {
            var colliderText;
           if (this.state.pickingCollider)
               colliderText = "cancel";
           else if (this.state.collider)
               colliderText = this.state.collider.collider.filename;
           else
               colliderText = "Pick Collider";

            var collider
            if (this.props.collider)
                collider = this.props.collider.item.collider.filename.replace(/[\. ,:-]+/g, "-");
            else
                collider = "New";
           return (
               <div className="panel panel-default">
                   <div className="panel-heading" role="tab" id="headingOne">
                       <h4 className="panel-title">
                           <a data-toggle="collapse" data-parent="#accordion" href={"#collider"+collider}>
                           {collider}
                           </a>
                       </h4>
                   </div>
                   <div id={"collider"+collider} className="panel-collapse collapse" role="tabpanel">
                       <div className="panel-body">
                           <a href="#" onClick={this.pickCollider}>{colliderText}</a>
                           <br/>
                           Left: {this.state.left}<br/>
                           Top: {this.state.top}<br/>
                           <a href="#" onClick={this.setPosition}>Set Position</a><br/>
                           <a href="#" onClick={this.save}>Save</a>
                       </div>
                   </div>
               </div>
           );
       }
    });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var CollisionEditor = React.createClass({
        render: function(){
            var self = this;
            var colliders = this.props.activeItem.collisions.map( function(collider) {
                return (<Collision activeItem={self.props.activeItem} collider={collider} parent={self}/>);
            });
            return (
                <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                    {colliders}
                    <Collision activeItem={this.props.activeItem} collider={undefined} parent={this}/>
                </div>
            );
        }
    });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var CreateItem = React.createClass({
        createItem: function() {
            var files = React.findDOMNode(this.refs.files).files;
            var item = ItemManager.createItem(files);
            if (React.findDOMNode(this.refs.static).checked)
                item.setSelectable(false);
        },
        render: function(){
            return (
                <div className="modal fade" id="exampleModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title">Create Item</h4>
                            </div>
                            <div className="modal-body">
                                <div className="input-group">
                                    <span className="input-group-addon" id="basic-addon1">Item Name</span>
                                    <input type="text" className="form-control" placeholder="Super awesome sword of epic greatness" ref="name"/>
                                </div>
                                <div className="form-group">
                                    <p className="help-block">File input.</p>
                                    <input id="files-selector" type="file" ref="files" multiple/>
                                    <p className="help-block">Example block-level help text here.</p>
                                </div>
                                <div className="checkbox">
                                    <label>
                                        <input id="static" type="checkbox" ref="static"/> Static
                                    </label>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.createItem}>Create Item</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var OpacitySlider = React.createClass({
        change: function(e) {
            var value = React.findDOMNode(this.refs.slider).value;
            this.props.activeItem.collider.opacity = value /100;
            Cory.canvas.renderAll();
            this.forceUpdate();
        },
        render: function() {
            return (
                <div>
                    <p className="help-block">{this.props.activeItem.collider.opacity * 100}</p>
                    <input type="range" onChange={this.change} ref='slider' value={this.props.activeItem.collider.opacity * 100}/>
                </div>
            );
        }
    });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var DraggablePanel = React.createClass({
        getDefaultProps: function () {
            return {
                initialPos: {x: 0, y: 0}
            }
        },
        getInitialState: function () {
            return {
                pos: this.props.initialPos,
                dragging: false,
                rel: null
            }
        },
        componentDidUpdate: function (props, state) {
            if (this.state.dragging && !state.dragging) {
                document.addEventListener('mousemove', this.onMouseMove)
                document.addEventListener('mouseup', this.onMouseUp)
            } else if (!this.state.dragging && state.dragging) {
                document.removeEventListener('mousemove', this.onMouseMove)
                document.removeEventListener('mouseup', this.onMouseUp)
            }
        },

        // calculate relative position to the mouse and set dragging=true
        onMouseDown: function (e) {
            // only left mouse button
            if (e.button !== 0) return;
            var pos = $(this.getDOMNode()).offset();
            this.setState({
                dragging: true,
                rel: {
                    x: e.pageX - pos.left,
                    y: e.pageY - pos.top
                }
            });
            e.stopPropagation();
            e.preventDefault()
        },
        onMouseUp: function (e) {
            this.setState({dragging: false});
            e.stopPropagation();
            e.preventDefault()
        },
        onMouseMove: function (e) {
            if (!this.state.dragging) return;
            this.setState({
                pos: {
                    x: e.pageX - this.state.rel.x,
                    y: e.pageY - this.state.rel.y
                }
            });
            e.stopPropagation();
            e.preventDefault()
        },
        render: function () {
            return (
                <div className="panel panel-default" style={{
                    position: 'fixed',
                    zIndex: '100',
                    width: '20em',
                    left: this.state.pos.x + 'px',
                    top: this.state.pos.y + 'px'
                }}>
                    <div className="panel-heading" onMouseDown={this.onMouseDown}>
                        {this.props.header}
                    </div>
                    <div className="panel-body">
                        {this.props.children}
                    </div>
                </div>
            );
        }
    });

    Editor.Editor = React.createClass({
        componentDidMount: function() {
            var self = this;
            selectionBroker.init();
            selectionBroker.push(function(image){
                self.setState({activeItem: image});
            });
        },

        getInitialState: function() {
            return {};
        },

        forward: function() {
            this.state.activeItem.bringForward(true);
        },

        backward: function() {
            this.state.activeItem.sendBackwards(true);
        },

        render: function() {
            if (!this.state.activeItem)
                return (
                    <DraggablePanel>
                        Some text
                        <CreateItem />
                    </DraggablePanel>
                    );
            var test = <div className="dropdown">
                <a href="#" data-toggle="dropdown" aria-expanded="true">
                    <span className="caret"></span>
                </a>
                <ul className="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
                    <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Action</a></li>
                    <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Another action</a></li>
                    <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Something else here</a></li>
                    <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Separated link</a></li>
                </ul>
            </div>;
            return (
                <DraggablePanel header={test}>
                    <PositionInput field="top" activeItem={this.state.activeItem.parentItem}/>
                    <PositionInput field="left" activeItem={this.state.activeItem.parentItem}/>
                    <div className="btn-group btn-group-justified" role="group">
                        <div className="btn-group" role="group">
                            <button type="button" onClick={this.forward} className="btn btn-default">Front</button>
                        </div>
                        <div className="btn-group" role="group">
                            <button type="button" onClick={this.backward} className="btn btn-default">Back</button>
                        </div>
                    </div>
                    <OpacitySlider activeItem={this.state.activeItem.parentItem}/>
                    <hr/>
                    <CollisionEditor ref="collisionEditor" activeItem={this.state.activeItem.parentItem}/>
                </DraggablePanel>
            );
        }
    });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Public Property

}( window.Editor = window.Editor || {}, jQuery ));
