window.Frost = window.Frost || {};
(function(AssetLoader) {
    var imagesLoaded = 0;

    AssetLoader.loadFront = function(src) {
        var asset = findAsset(src);
        if (asset) {
            return asset;
        }

        asset = loadAsset(src);
        Frost.assets.unshift(asset);
        return asset;
    };

    AssetLoader.loadBack = function(src) {
        var asset = findAsset(src);
        if (asset)
            return asset;

        asset = loadAsset(src);
        Frost.assets.push(asset);
        return asset;
    };

    function findAsset(src) {
        for (var i = 0; i < Frost.assets.length; ++i) {
            var asset = Frost.assets[i];
            if (asset.image.src.indexOf(src) > -1) {
                return asset;
            }
        }
    }

    function loadAsset(src) {
        var img = new Image();
        var frostImage = {
            x: 0,
            y: 0,
            z: 0,
            image: img
        };

        img.onload = function(){
            frostImage.width = img.width;
            frostImage.height = img.height;

            if (++imagesLoaded == Frost.assets.length) {
                Frost.ItemManager.onAssetsLoaded();
            }
        };

        img.src = "img/" + src;

        return frostImage;
    };

}(window.Frost.AssetLoader = window.Frost.AssetLoader || {}));
