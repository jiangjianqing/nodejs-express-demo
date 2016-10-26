/**
 * Created by cz_jjq on 16/10/26.
 */

var throttle = require('../jsframework/debounce.js').throttle;

var fun1 = throttle(function(n){
    console.log(n);
},1);

//20161026  由于js是单线程,下述测试并不能代表测试成功
for (var i=0;i<5000;i++){

    fun1(i);

}