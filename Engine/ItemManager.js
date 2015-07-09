window.Frost = window.Frost || {};
(function(ItemManager) {
    Frost.assets = Frost.assets || [];
    var itemList = [];

    ItemManager.hasItem = function(string) {
        for (var i = 0; i < itemList.length; ++i) {
            if (itemList[i].equipped && itemList[i].name.indexOf(string) > -1)
                return true;
        }
        return false;
    };

    ItemManager.clearGround = function() {
        itemList.forEach(function(item) {
            if (!(item.equipped || item.carried || item.static))
                item.hide();
        });
        Frost.Renderer.render();
    };

    ItemManager.generateLoot = function() {
        var index = Math.floor(Math.random() * itemList.length);
        while (index < itemList.length && (itemList[index].equipped || itemList[index].carried || itemList[index].static))
            ++index;
        console.log(itemList[index].name);
        itemList[index].show();
        Frost.Renderer.render();
    };


    ItemManager.addItems = function(items) {
        var imagesToLoad = [];
        items.forEach(function(item) {
            (item.front || []).forEach(function(imageSrc) {
                imagesToLoad.push(imageSrc);
            });
            (item.back || []).forEach(function(imageSrc) {
                imagesToLoad.unshift(imageSrc);
            });
        });
        Frost.AssetLoader.loadAssets(imagesToLoad);

        items.forEach(function (item) {
            if (item.layer) {
                var parentItem = ItemManager.getItemByImage(item.layer);
                parentItem.addImages(item.front);
            }
            else
                itemList.push(new Frost.Item(item));
        });
    };


    ItemManager.onAssetsLoaded = function() {
        console.log("All assets loaded");
        Frost.Renderer.render();
    };


    ItemManager.getItemByImage = function(image) {
        if (typeof image == "string") {
            image = Frost.AssetLoader.findAsset(image);
        }
        for (var i in itemList) {
            var item = itemList[i];
            if (item.images.indexOf(image) > -1)
                return item;
        }
    }

}(window.Frost.ItemManager = window.Frost.ItemManager || {}));

