window.Frost = window.Frost || {};

Frost.Item = function(defenition) {

    this.name = defenition.name;
    this.static = defenition.static || false;
    this.images = [];
    this.linkedTo = undefined;
    this.linkedItems = [];
    this.collisions = [];

    this.equipped = false;
    this.carried = false;

    var self = this;
    this.front = (defenition.front || []).map(Frost.AssetLoader.findAsset);
    this.back = (defenition.back || []).map(Frost.AssetLoader.findAsset);
    this.images = this.front.concat(this.back);

    (defenition.collisions || []).forEach(function (collision) {
        self.collisions.push({
            x : collision.x,
            y : collision.y,
            link: collision.link,
            replaceWith: collision.replaceWith,
            image : Frost.AssetLoader.findAsset(collision.image)
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Frost.Item.prototype.addImages = function(imgSrcList) {
    this.images = this.images.concat(imgSrcList.map(Frost.AssetLoader.findAsset));
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Frost.Item.prototype.linkItem = function(item) {
    this.linkedItems.push(item);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Frost.Item.prototype.unlinkItem = function(item) {
    var index = this.linkedItems.indexOf(item);
    if (index > -1) {
        this.linkedItems.splice(index, 1);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Frost.Item.prototype.getCollider = function() {
    return this.front[0];
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Frost.Item.prototype.collide = function() {
    if (this.linkedTo) {
        this.linkedTo.unlinkItem(this);
        this.linkedTo = undefined;
    }

    this.equipped = false;
    this.carried = false;

    for(var i=0, len=this.collisions.length; i < len; ++i) {
        var collision =this.collisions[i];
        var imageA = collision.image;
        var imageB = this.getCollider();
        if (Frost.Renderer.checkCollision(imageB, imageA)) {
            if (collision.replaceWith) {
                console.log("replacing");
                this.hide();
                var replacer = Frost.ItemManager.getItemByImage(collision.replaceWith);
                replacer.moveTo(imageA.x + collision.x, imageA.y + collision.y);
                replacer.collide();
                replacer.show();
                return;
            }
            this.moveTo(imageA.x + collision.x, imageA.y + collision.y);

            if (imageA.image.src.indexOf("BODY") > -1)
                this.equipped = true;
            else
                this.carried = true;

            if (collision.link) {
                this.linkedTo = Frost.ItemManager.getItemByImage(imageA);
                this.linkedTo.linkItem(this);
            }
            return;
        }
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Frost.Item.prototype.hide = function() {
    this.images.forEach(function(image) {
        image.visible = false;
    })
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Frost.Item.prototype.show = function() {
    this.images.forEach(function(image) {
        image.visible = true;
    })
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Frost.Item.prototype.moveBy = function(x, y) {
    if (this.static)
        return;
    
    this.images.forEach(function(image) {
        image.x += x;
        image.y += y;
    });

    this.linkedItems.forEach(function(item) {
        item.moveBy(x, y);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Frost.Item.prototype.moveTo = function(x, y) {
    this.images.forEach(function(image) {
        image.x = x;
        image.y = y;
    });
    this.linkedItems.forEach(function(item) {
        item.moveTo(x, y);
    });
};
