var methods = require('methods');

var app = exports = module.exports = {};

app.init = function(){
    this.cache ={};
    this.engines = {}
    this.settings = {}

    this._router = undefined; //app routef
};


const slice = Array.prototype.slice;

methods.forEach((method)=>{
    app[method] = function(path){
        this.lazyrouter();

        let route = this._router.route(path);
        route[method].apply(route,slice.call(arguments,1));
        return this;
    }
})
