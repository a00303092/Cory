window.Frost = window.Frost || {};

Frost.Item = function(defenition) {

    this.images = [];
    this.linkedItems = [];
    this.collisions = [];

    var self = this;
    this.front = (defenition.front || []).map(Frost.AssetLoader.findAsset);
    this.back = (defenition.back || []).map(Frost.AssetLoader.findAsset);
    this.images = this.front.concat(this.back);

    (defenition.collisions || []).forEach(function (collision) {
        self.collisions.push({
            x : collision.x,
            y : collision.y,
            image : Frost.AssetLoader.findAsset(collision.image)
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Frost.Item.prototype.addImages = function(imgSrcList) {
    this.images = this.images.concat(imgSrcList.map(Frost.AssetLoader.findAsset));
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Frost.Item.prototype.moveBy = function(x, y) {
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
