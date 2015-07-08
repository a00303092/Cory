

(function(Renderer) {
    var canvas;
    var canvasWidth;
    var canvasHeight;
    var ctx;

    var buffer;

    Frost.init = function() {
        canvas = document.getElementById("canvas");
        canvasWidth = canvas.width;
        canvasHeight = canvas.height;
        ctx = canvas.getContext("2d");

        var offScreenCanvas = document.createElement('canvas');
        offScreenCanvas.width = canvasWidth;
        offScreenCanvas.height = canvasHeight;
        buffer = offScreenCanvas.getContext("2d");

        Frost.Inputmanager.init(canvas);
    };

    Renderer.render = function() {
        var images = Frost.assets;
        ctx.clearRect(0,0,canvasWidth,canvasHeight);
        for (var i in images) {
            var img = images[i];
            if (!img.visible) {
                continue;
            }

            ctx.drawImage(img.image, img.x, img.y);
        }
    };

    Renderer.getImageBySrc = function(src) {
        for (var i in Frost.assets) {
            var image = Frost.assets[i];
            if (image.image.src.indexOf(src) > -1) {
                return image;
            }
        }
    };

    Renderer.getImage = function(x, y) {
        var reverseAssets = Frost.assets.slice().reverse();
        for (var i in reverseAssets) {
            var img = reverseAssets[i];
            console.log(img.image.src);
            if (!img.visible)
                continue;

            if (x <= img.x)
                continue;
            if (y <= img.y)
                continue;
            if (x >= img.x + img.width)
                continue;
            if (y >= img.y + img.height)
                continue;

            buffer.clearRect(0,0,canvasWidth,canvasHeight);
            buffer.drawImage(img.image, img.x, img.y);
            var pixel = buffer.getImageData(x, y, 1, 1);
            if (pixel.data[3] > 0) {
                return img;
            }
        }
    };

    Renderer.checkCollision = function(imageA, imageB) {
        var boxCollision = !(imageB.x > imageA.x + imageA.width ||
        imageB.x + imageB.width < imageA.x ||
        imageB.y > imageA.y + imageA.y + imageA.height ||
        imageB.y + imageB.height < imageA.y);
        if (!boxCollision)
            return false;

        var width = (imageA.x + imageA.width);
        var height = (imageB.x + imageB.height);

        ctx.clearRect(0,0,canvasWidth,canvasHeight);
        ctx.drawImage(imageA.image, imageA.x, imageA.y);
        var dataA = ctx.getImageData(imageA.x, imageA.y,width, height);
        buffer.clearRect(0,0,canvasWidth,canvasHeight);
        buffer.drawImage(imageB.image, imageB.x, imageB.y);
        var dataB = buffer.getImageData(imageA.x, imageA.y,width, height);

        for (var i = 3; i<dataA.data.length; i +=4) {
            if (dataB.data[i] > 0 && dataA.data[i] > 0) {
                console.log(i, dataB.data[i], dataA.data[i])
                return true;
            }
        }
        return false;
    };

}(window.Frost.Renderer = {}));