(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g=(g.com||(g.com = {}));g=(g.magana||(g.magana = {}));g.betteroptiondialog = f()}})(function(){var define,module,exports;return (function e(t,n,r){function o(i,u){if(!n[i]){if(!t[i]){var a=typeof require=="function"&&require;if(!u&&a)return a.length===2?a(i,!0):a(i);if(s&&s.length===2)return s(i,!0);if(s)return s(i);var f=new Error("Cannot find module '"+i+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[i]={exports:{}};t[i][0].call(l.exports,function(e){var n=t[i][1][e];return o(n?n:e)},l,l.exports,e,t,n,r)}return n[i].exports}var i=Array.prototype.slice;Function.prototype.bind||Object.defineProperty(Function.prototype,"bind",{enumerable:!1,configurable:!0,writable:!0,value:function(e){function r(){return t.apply(this instanceof r&&e?this:e,n.concat(i.call(arguments)))}if(typeof this!="function")throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var t=this,n=i.call(arguments,1);return r.prototype=Object.create(t.prototype),r.prototype.contructor=r,r}});var s=typeof require=="function"&&require;for(var u=0;u<r.length;u++)o(r[u]);return o})({1:[function(require,module,exports){
(function () {
    'use strict';

    var isIos = Ti.Platform.osname === 'iphone'
        || Ti.Platform.osname === 'ipad';

    function getIndexByProperty(array, key, value) {
        for (var i = 0, l = array.length; i < l; i += 1) {
            if (array[i][key] === value) {
                return i;
            }
        }

        return -1;
    }

    function create(settings) {
        var optionData = settings.options,
            optionDialog,
            cancelIndex;

        // Override `settings.options` with an array of strings obtained from
        // each object in the `optionData` array.
        settings.options = optionData.map(function (optionObj) {
            return optionObj.title;
        });


        if (settings.hasOwnProperty('cancel') === false) {
            cancelIndex = getIndexByProperty(
                optionData,
                'cancel',
                true
            );

            if (
                cancelIndex !== -1
                || Ti.Platform.osname !== 'android'
            ) {
                settings.cancel = cancelIndex;
            }
        }

        if (
            settings.hasOwnProperty('destructive') === false
            && isIos === true
        ) {
            settings.destructive = getIndexByProperty(
                optionData,
                'destructive',
                true
            );
        }

        if (
            settings.hasOwnProperty('selected') === false
            && Ti.Platform.osname === 'android'
        ) {
            settings.selectedIndex = getIndexByProperty(
                optionData,
                'selected',
                true
            );
        }


        optionDialog = Ti.UI.createOptionDialog(settings);


        optionDialog.addEventListener('click', function (e) {
            if (
                optionData[e.index].hasOwnProperty('callback') === true
                && typeof optionData[e.index].callback === 'function'
            ) {
                optionData[e.index].callback.call(optionDialog, e);
            }
        });

        return optionDialog;
    }

    module.exports = {
        create: create
    };
}());

},{}]},{},[1])(1)
});