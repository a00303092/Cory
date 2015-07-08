function Item(id) {
    this.id = id;
    this.left = 0;
    this.top = 0;
    this.visible = true;
    this.selectable = true;
    this.collider = undefined;
    this.collisions = [];
    this.images = [];
    this.properties = [];
    this.Events = new Events();
    this.origin = undefined;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    this.serialize = function() {
        var collisions = this.collisions.map(function(collision) {
            return {
                top: collision.top,
                left: collision.left,
                item: collision.item.id
            }
        });

        var images = this.images.map(function(image) {
           return {
               filename: image.filename,
               z: Cory.canvas.getObjects().indexOf(image)
           }
        });

        return {
            id: this.id,
            top: this.top,
            left: this.left,
            visible: this.visible,
            selectable: this.selectable,
            collisions: collisions,
            images: images
        }
    };

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    this.deserialize = function(item) {
        console.log(item);
        this.visible = item.visible !== false;
        this.selectable = item.selectable;
        for (var i in item.images) {
            this.addImage(item.images[i].filename, item.images[i].z);
        }
        for (var i in item.collisions) {
            this.collisions.push({
                item: ItemManager.getItemById(item.collisions[i].item),
                top: item.collisions[i].top,
                left: item.collisions[i].left
            });
        }
        this.moveTo(item.left, item.top)
    };

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    this.addImage = function(filename, z){
        this.properties.push('Noisy');
        var self = this;
        fabric.Image.fromURL('./img/'+filename, function(oImg) {
            oImg.selectable = self.selectable;
            oImg.visible = self.visible;
            oImg.top = self.top;
            oImg.left = self.left;

            oImg.on('moving', function() {
                if (this.origin === undefined) {
                    this.origin = {top: oImg.top, left: oImg.left};
                    this.Events.emit('moveStarted', this);
                }
                this.moveTo(oImg.left, oImg.top);
            }.bind(this));

            oImg.on('modified', function() {
                self.collide();
                self.origin = undefined;
            });

            if (!self.collider)
                self.collider = oImg;
            else if((oImg.getOriginalSize().width * oImg.getOriginalSize().height) > (self.collider.getOriginalSize().width * self.collider.getOriginalSize().height))
                self.collider = oImg;

            self.images.push(oImg);
            oImg.filename = filename;
            oImg.parentItem = self;
            Cory.canvas.add(oImg);
            if (z != undefined) {
                oImg.moveTo(z);
            }

            Cory.canvas.renderAll();
            console.log(filename + ' loaded');
        }.bind(this));
    };

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    this.setSelectable = function(value) {
        this.selectable = value;
        for (var i in this.images) {
            this.images[i].selectable = value;
        }
    };

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    this.setVisible = function(value) {
        this.visible = value;
        for (var i in this.images.length) {
            this.images[i].visible = value;
        }
    };

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    this.moveTo = function(left, top) {
        this.left = left;
        this.top = top;
        for (var i = 0; i < this.images.length; ++i) {
            this.images[i].left = left;
            this.images[i].top = top;
            this.images[i].setCoords();
        }
        Cory.canvas.renderAll();
    };

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    this.checkCollision = function(item) {
        return (this.collider.intersectsWithObject(item.collider) ||
            this.collider.isContainedWithinObject(item.collider));
    };

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    this.collide = function() {
        for (var i = 0; i < this.collisions.length; ++i) {
            var item = this.collisions[i].item;
            if (this.collider.intersectsWithObject(item.collider) ||
                this.collider.isContainedWithinObject(item.collider)) {
                this.moveTo(this.collisions[i].left, this.collisions[i].top);
                ItemManager.Events.emit('moveEnded', {item: this, collision:this.collisions[i].item});
                return;
            }
        }
        ItemManager.Events.emit('moveEnded', {item: this});
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}