(function () {
    'use strict';

    var Merge = require('lodash.merge'),

        defaults = {
            showCancel: false
        },

        isIos = Ti.Platform.osname === 'iphone'
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

        // If the user passed `showCancel: true` then automatically add a cancel
        // object to the optionData array
        if (settings.showCancel === true) {
            optionData.push({
                cancel: true,
                title: 'Cancel'
            });
        }

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
        create: function (options) {
            return create(Merge({}, defaults, options));
        }
    };
}());
