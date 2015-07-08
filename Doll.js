
(function( Doll, $, undefined ) {
    //Private Property
    var items = [];
    Doll.properties = [];

    //Public Property


    //Public Method

    Doll.hasProperty = function(prop) {
        var index = Doll.properties.indexOf(prop);
        return (index != -1);
    };

    Doll.isEquiped = function(item) {
        var index = items.indexOf(item);
        return (index != -1);
    };

    Doll.equip = function(item) {
        var index = items.indexOf(item);
        if (index === -1) {
            items.push(item);
            updateProperties();
            Doll.Events.emit('equipped', item);
        }
    };

    Doll.unequip = function(item) {
        var index = items.indexOf(item);
        if (index != -1) {
            items.splice(index, 1);
            updateProperties();
            Doll.Events.emit('unequipped', item);
        }
    };

    function updateProperties() {
        Doll.properties = [];
        items.forEach(function(item) {
            item.properties.forEach(function(prop) {
                var index = Doll.properties.indexOf(prop);
                if (index === -1)
                    Doll.properties.push(prop);
            })
        });
    }

    //ItemManager.Events.on('moveEnded', function(e) {
    //    if (e.collision === undefined) {
    //        Doll.unequip(e.item);
    //    }
    //    else {
    //        Doll.equip(e.item);
    //    }
    //});

    //ItemManager.Events.on('moveEnded', function(e) {
    //    if (e.collision === undefined)
    //        return;
    //    var index = items.indexOf(e.item);
    //    if (index === -1) {
    //        if (!checkEquipable(e.item)) {
    //            var origin = e.item.origin;
    //            e.item.moveTo(origin.left, origin.top);
    //            return;
    //        }
    //
    //        items.push(e.item);
    //        items.sort(function(a, b) {
    //            return Cory.canvas.getObjects().indexOf(b.collider) - Cory.canvas.getObjects().indexOf(a.collider);
    //        });
    //        calculateLocks();
    //    }
    //
    //});

    //ItemManager.Events.on('moveEnded', function(e) {
    //    if (e.collision === undefined) {
    //        var index = items.indexOf(e.item);
    //        if (index != -1) {
    //            items.splice(index, 1);
    //            calculateLocks();
    //        }
    //    }
    //});
    //
    ////Private Method
    //function checkEquipable(item) {
    //    for (var i in items) {
    //        if (Cory.canvas.getObjects().indexOf(item.collider) < Cory.canvas.getObjects().indexOf(items[i].collider)) {
    //            if (items[i].collider.intersectsWithObject(item.collider) || items[i].collider.isContainedWithinObject(item.collider)) {
    //                return false;
    //            }
    //        }
    //    }
    //    return true;
    //}
    //
    //function calculateLocks(){
    //    if (items.length === 1) {
    //        items[0].setSelectable(true);
    //        return;
    //    }
    //    for (var i in items) {
    //        for (var j = +i+1; j < items.length; ++j) {
    //            if (items[i].collider.intersectsWithObject(items[j].collider) || items[i].collider.isContainedWithinObject(items[j].collider)) {
    //                items[j].setSelectable(false);
    //            }
    //            else {
    //                items[j].setSelectable(true);
    //            }
    //        }
    //    }
    //}

}( window.Doll = window.Doll || {}, jQuery ));
