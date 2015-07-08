function Events() {
    this.events = {};

    this.on = function(event, callback){
        if (this.events[event] === undefined)
            this.events[event] = [];
        this.events[event].push(callback);
    };

    this.emit = function(event, data){
        for(var index in this.events[event])
            this.events[event][index](data);
    }
}