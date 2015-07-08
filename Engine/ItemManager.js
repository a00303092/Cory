window.Frost = window.Frost || {};
(function(ItemManager) {
    Frost.assets = Frost.assets || [];
    var itemList = [];

    ItemManager.addItems = function(items) {
        items.forEach(function (item) {
            itemList.push(new Frost.Item(item));
        });
    };

    function getImageBySrc(src) {
        for (var i in Frost.assets) {
            var image = Frost.assets[i];
            if (image.image.src.indexOf(src) > -1) {
                return image;
            }
        }
    }

    function pushUnique(array, item) {
        if (array.indexOf(item) === -1)
            array.push(item);
    }

    ItemManager.onAssetsLoaded = function() {
        //itemList.forEach(function(item) {
        //    item.images = [];
        //    (item.collisions || []).forEach(function(collision) {
        //        (collision.front || []).forEach(function(imgSrc) {
        //            var image = getImageBySrc(imgSrc);
        //            image.visible = false;
        //            pushUnique(item.images, image);
        //        });
        //    });
        //
        //    item.front.forEach(function(imgSrc) {
        //        var image = getImageBySrc(imgSrc);
        //        image.visible = true;
        //        pushUnique(item.images, image);
        //    });
        //
        //    item.back.forEach(function(imgSrc) {
        //        var image = getImageBySrc(imgSrc);
        //        image.visible = true;
        //        pushUnique(item.images, image);
        //    });
        //
        //    if (item.layer) {
        //        var image = getImageBySrc(item.layer);
        //        var layerItem = ItemManager.getItemByImage(image);
        //        layerItem.images = layerItem.images.concat(item.images);
        //    }
        //});
        Frost.Renderer.render();
    };

    ItemManager.getItemByImage = function(image) {
        for (var i in itemList) {
            var item = itemList[i];
            if (item.images.indexOf(image) > -1)
                return item;
            console.log(image.image.src);
        }
    }

}(window.Frost.ItemManager = window.Frost.ItemManager || {}));

