(function() {
    var canvas = this.__canvas = new fabric.Canvas('c');
    var item_store = {};

    function Item() {
        this.id = '';
        this.left = 0;
        this.top = 0;
        this.visible = false;
        this.collider = '';
        this.collisions = [];
        this.parts = [];

        this.show = function() {
            this.visible = true;
            for (var i = 0; i < this.parts.length; ++i) {
                this.parts[i].visible = true;
            }
        }

        this.hide = function() {
            this.visible = false;
            for (var i = 0; i < this.parts.length; ++i) {
                this.parts[i].visible = false;
            }
        }

        this.move = function(left, top) {
            this.left = left;
            this.top = top;
            for (var i = 0; i < this.parts.length; ++i) {
                this.parts[i].left = left;
                this.parts[i].top = top;
                this.parts[i].setCoords();
            }
        }

        this.collide = function() {
            for (var i = 0; i < this.collisions.length; ++i) {
                var item = item_store[this.collisions[i].item];
                if (this.collider.intersectsWithObject(item.collider) ||
                    this.collider.isContainedWithinObject(item.collider)) {
                    this.move(this.collisions[i].left, this.collisions[i].top);
                }
            }
        }

    }

    function loadImages(images) {
        images.forEach(function(image) {
            fabric.Image.fromURL('./img/'+image.img, function(oImg) {
                console.log(image.img + ' loaded');
                var item = item_store[image.item];
                item.parts.push(oImg);
                if (item.collider === image.img)
                    item.collider = oImg;
                oImg.visible = item.visible;
                oImg.selectable = typeof image.selectable === 'undefined' ? true : image.selectable;
                canvas.add(oImg);

                oImg.on('moving', function() {
                    item.move(oImg.left, oImg.top);
                });

                oImg.on('modified', function() {
                    item.collide();
                });
            });
        });
    }

    function loadItems(items) {
        items.forEach(function(item) {
            var oItem = new Item();
            item_store[item.id] = oItem;
            for (var key in item)
                if (item.hasOwnProperty(key))
                    oItem[key] = item[key];
        });
    }

    fabric.Object.prototype.hasBorders = false;
    fabric.Object.prototype.hasControls = false;
    fabric.Object.prototype.perPixelTargetFind = true;

    var itemsToLoad = [
        {id:'BODY', collider:'BODY_1_X.gif', collisions:[]},
        {id:'BELT_5', collider:'BELT_5F.gif', collisions:[{item:'BODY', left:56, top:186}]},
        {id:'BOOT_6L', collider:'BOOT_6L.gif', collisions:[{item:'BODY', left:115, top:294}]},
        {id:'BOOT_6R', collider:'BOOT_6R.gif', collisions:[{item:'BODY', left:63, top:292}]},
        {id:'GLOV_5L', collider:'GLOV_5L.gif', collisions:[{item:'BODY', left:154, top:124}]},
        {id:'GLOV_5R', collider:'GLOV_5R.gif', collisions:[{item:'BODY', left:6, top:155}]},
        {id:'SHIRT5', collider:'SHIRT5L1.gif', collisions:[{item:'BODY', left:11, top:66}]},
        {id:'PANTS_4', collider:'PANTS_4F.gif', collisions:[{item:'BODY', left:54, top:157}]},
    ];

    var imagesToLoad = [
        {item:'BELT_5', img:'BELT_5B.gif'},
        {item:'SHIRT5', img:'SHIRT5LX.gif'},
        {item:'SHIRT5', img:'SHIRT5RX.gif'},
        {item:'PANTS_4', img:'PANTS_4B.gif'},
        {item:'BODY', img:'BODY_1_X.gif', selectable:false},
        {item:'BODY', img:'HAIRBLNB.gif', selectable:false},
        {item:'BODY', img:'HAIRBLNF.gif', selectable:false},
        {item:'BODY', img:'HAIRBLNP.gif', selectable:false},
        {item:'GLOV_5L', img:'GLOV_5L.gif'},
        {item:'GLOV_5L', img:'GLOV_5LF.gif'},
        {item:'GLOV_5R', img:'GLOV_5R.gif'},
        {item:'PANTS_4', img:'PANTS_4F.gif'},
        {item:'PANTS_4', img:'PANTS_4M.gif'},
        {item:'PANTS_4', img:'PANTS_4L.gif'},
        {item:'BOOT_6L', img:'BOOT_6L.gif'},
        {item:'BOOT_6R', img:'BOOT_6R.gif'},
        {item:'SHIRT5', img:'SHIRT5L1.gif'},
        {item:'SHIRT5', img:'SHIRT5F.gif'},
        {item:'SHIRT5', img:'SHIRT5R1.gif'},
        {item:'BODY', img:'HAIRBLNM.gif', selectable:false},
        {item:'BELT_5', img:'BELT_5F.gif'},
    ];

    loadItems(itemsToLoad);
    loadImages(imagesToLoad);

    item_store['BODY'].show();
    item_store['BELT_5'].show();
    item_store['BOOT_6L'].show();
    item_store['BOOT_6R'].show();
    item_store['GLOV_5L'].show();
    item_store['GLOV_5R'].show();
    item_store['SHIRT5'].show();
    item_store['PANTS_4'].show();


    for (var k in item_store){
        if (item_store.hasOwnProperty(k)) {
            var link = "<a href='#' class='list-group-item'>"+k+"</a>";
            $("#item-list").append(link);
        }
    }



})();