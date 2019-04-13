const methods = require('methods');
const setPrototypeOf = require('setprototypeof');
const Router = require('./router');
const Layer = require('./Layer');
const slice = Array.prototype.slice;
const http = require('http');


var app = exports = module.exports = {};

app.init = function(){
    this.cache ={};
    this.engines = {}
    this.settings = {}

    this._router = undefined; //app routef
};

methods.forEach((method)=>{
    app[method] = function(path){
        this.lazyrouter();

        let route = this._router.route(path);
        route[method].apply(route,slice.call(arguments,1));
        return this;
    }
})


app.set = function set(setting,val){
    this.settings[setting] = val;

    switch(setting){
        case 'etag':
            this.set('etag fn', '');
            break;
        case 'query selector':
            this.set('query parser fn','');
            break;
        case 'trust proxy': 
            this.set('trust proxy fn', '');
            break;
    }
    return this;
};

app.enabled = function enabled(setting){
    return Boolean(this.set(setting));
};

app.lazyrouter = function lazyrouter(){
    if(!this._router){ //if undefined create it 
        this._route = new Router({});
    }
}

app.listen = function listen(){
    var server =http.createServer(this);
    return server.listen.apply(server,arguments);
}
