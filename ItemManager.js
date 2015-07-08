
(function( ItemManager, $, undefined ) {
    var assignedId = 1;
    var items = [];

    ItemManager.Events = new Events();

    ItemManager.createItem = function(images) {
        var item = new Item(assignedId++);

        for (var i = 0; i < images.length; i++) {
          item.addImage(images[i].name || images[i]);
        }
        items.push(item);
        return item;
    };

    ItemManager.getItemById = function(id) {
        for (var i in items) {
            if (items[i].id === id)
            return items[i];
        }
        console.log('Failed to find item with id '+ id);
    };

    ItemManager.serialize = function() {
        var serializedItems = [];
        for (var i in items) {
            serializedItems.push(items[i].serialize());
        }
        return serializedItems;
    };

    ItemManager.deserialize = function(its) {
        for (var i = 0; i < its.length; ++i) {
            items.push(new Item(its[i].id));
        }
        for (var i = 0; i < its.length; ++i) {
            items[i].deserialize(its[i]);
        }
    };

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //ItemManager.createItem([
    //    'DAGGR1H1.GIF',
    //    'DAGGR1B1.GIF'
    //]);

}( window.ItemManager = window.ItemManager || {}, jQuery ));
