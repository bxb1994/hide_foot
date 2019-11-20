/*
* @Author: Alpha
* @Date:   2019-08-15 17:02:37
* @Last Modified by:   Alpha
* @Last Modified time: 2019-08-15 17:30:42
*/

'use strict';
(function(win){
    var doc = win.document;
    var docEl = doc.documentElement;
    var tid;

    function refreshRem(){
        var width = docEl.getBoundingClientRect().width;
        var rem = width / 7.5;  //将屏幕宽度分成6.4份，1份1rem;   6.4可修改
        // if(rem > 50){
        //     rem = 50;
        // }
        docEl.style.fontSize = rem + 'px';
    }

    //放大缩小触发
    win.addEventListener('resize', function(){
        clearTimeout(tid);
        tid = setTimeout(refreshRem,10);
    },false);

    win.addEventListener('pageshow',function(e){
        if(e.persisted){
            clearTimeout(tid);
            tid = setTimeout(refreshRem,10);
        }
    },false);

    refreshRem();

})(window);