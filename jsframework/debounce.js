/**
 * Created by cz_jjq on 16/10/26.
 */
"use strict";
var defaultDelay = 500;
var throttle = function(targetFn,delay){
    var isFirstTime = true;
    var timer ;
    return function () {
        var self = this;
        var args = arguments;
        if (timer){
            return;
        }
        if (isFirstTime){
            isFirstTime = false;
            return targetFn.apply(self,args);
        }
        timer = setTimeout(function(){
            clearTimeout(timer);
            timer = null ;
            return targetFn.apply(self,args);
        },delay || defaultDelay);

    }
};

module.exports.throttle = throttle;