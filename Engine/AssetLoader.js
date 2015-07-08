window.Frost = window.Frost || {};
(function(AssetLoader) {
    var imagesLoaded = 0;

    AssetLoader.findAsset = function(src) {
        for (var i = 0; i < Frost.assets.length; ++i) {
            var asset = Frost.assets[i];
            if (asset.image.src.indexOf(src) > -1) {
                return asset;
            }
        }
    }

    AssetLoader.loadAssets = function(srcList) {
      Frost.assets = srcList.map(loadAsset);
    };

    function loadAsset(src) {
        var img = new Image();
        var frostImage = {
            x: 0,
            y: 0,
            image: img,
            visible: true
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
