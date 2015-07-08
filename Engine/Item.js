window.Frost = window.Frost || {};

Frost.Item = function(defenition) {

    this.images = [];
    this.linkedItems = [];
    this.collisions = [];

    var self = this;
    this.front = (defenition.front || []).map(function (image) {
        var loadedImage = Frost.AssetLoader.loadBack(image);
        loadedImage.visible = true;
        self.images.push(loadedImage);
        return loadedImage;
    });

    (defenition.collisions || []).forEach(function (collision) {
        self.collisions.push({
            x : collision.x,
            y : collision.y,
            image : Frost.AssetLoader.loadBack(collision.image),
            front : (collision.front || []).map(Frost.AssetLoader.loadBack)
        });
    });

    var reverseImages = (defenition.back || []).slice().reverse();
    this.back = reverseImages.map(function (image) {
        var loadedImage = Frost.AssetLoader.loadFront(image);
        loadedImage.visible = true;
        self.images.push(loadedImage);
        return loadedImage;
    });
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
