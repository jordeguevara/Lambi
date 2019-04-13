exports = module.exports = createApplication;

const mixin = require('merge-descriptors');
const proto = require("./app")

function createApplication() {
    var app = function(req,res,next) {
        app.handle(req,res,next);
    };
    mixin(app,proto,false);

    app.init();

    return app;
}

exports.application = proto;



