(function(InputManager){

    var offsetX=0;
    var offsetY=0;

    var mouse = {
        currentX:0,
        currentY:0,
        movementX:0,
        movementY:0
    };

    var c;
    var selectedItem = undefined;

    InputManager.init = function(canvas) {
        c = canvas;
        var canvasOffset=canvas.getBoundingClientRect();
        offsetX=canvasOffset.left;
        offsetY=canvasOffset.top;

        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mouseup', handleMouseUp);
    };

    function handleMouseDown(e){
        console.log(mouse.currentX, mouse.currentY);
        var image = Frost.Renderer.getImage(mouse.currentX, mouse.currentY);
        console.log("Selected image:", image);
        if (image) {
            selectedItem = Frost.ItemManager.getItemByImage(image);
            console.log("Selected item:", selectedItem);
        }
    }

    function handleMouseUp(e){
        if (selectedItem) {
            selectedItem.collide();
            Frost.Renderer.render();
            selectedItem = undefined;
        }
    }

    function handleMouseMove(e){
        var lastX = mouse.currentX;
        var lastY = mouse.currentY;

        var canvasOffset=c.getBoundingClientRect();
        mouse.currentX = parseFloat(e.clientX-canvasOffset.left);
        mouse.currentY = parseFloat(e.clientY-canvasOffset.top);

        mouse.movementX = mouse.currentX - lastX;
        mouse.movementY = mouse.currentY - lastY;

        if (selectedItem) {
            selectedItem.moveBy(mouse.movementX, mouse.movementY);
            Frost.Renderer.render();
        }
    }

})(window.Frost.Inputmanager = {});
