/**
 * Created by cz_jjq on 16/10/23.
 */

var decorator = require('../jsframework/decorator');

var fn1 = function(){
    console.log(2)
};

var testFn=fn1.before(function(){
    console.log(1);

}).after(function(){
    console.log(3);
})

var test2Fn=decorator.createBeforeDecoratorFn(fn1,function(){
    console.log(1);
});

test2Fn=decorator.createAfterDecoratorFn(test2Fn,function(){
    console.log(3);
})

testFn()

test2Fn()