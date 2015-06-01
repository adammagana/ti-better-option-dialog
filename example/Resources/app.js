(function () {
    'use strict';

    var BetterOptionDialog = require('com.magana.betteroptiondialog'),

        window = Ti.UI.createWindow({
            backgroundColor: '#ffffff',
            layout: 'vertical'
        }),

        deleteContainer = Ti.UI.createView({
            height: '50dp',
            top: '20dp'
        }),
        showDeleteLabel = Ti.UI.createLabel({
            left: '10dp',
            text: 'Show Delete Option',
            textAlign: 'left'
        }),
        showDeleteSwitch = Ti.UI.createSwitch({
            right: '10dp',
            value: true
        }),

        cancelContainer = Ti.UI.createView({
            height: '50dp'
        }),
        showCancelLabel = Ti.UI.createLabel({
            left: '10dp',
            text: 'Show Cancel Option',
            textAlign: 'left'
        }),
        showCancelSwitch = Ti.UI.createSwitch({
            right: '10dp',
            value: true
        }),

        showDialogButton = Ti.UI.createButton({
            title: 'Show Option Dialog'
        });


    function createBorder() {
        return Ti.UI.createView({
            backgroundColor: '#cacaca',
            height: '1dp',
            width: '100%'
        });
    }

    function openOptionDialog() {
        var options = [{
            callback: function () {
                Ti.UI.createAlertDialog({
                        message: 'You clicked the default option!'
                    })
                    .show();
            },
            title: 'Default Option'
        }];

        if (showDeleteSwitch.value === true) {
            options.push({
                callback: function () {
                    Ti.UI.createAlertDialog({
                            message: 'Deleting things is really destructive!'
                        })
                        .show();
                },
                destructive: true,
                title: 'Delete'
            });
        }

        if (showCancelSwitch.value === true) {
            options.push({
                cancel: true,
                title: 'Cancel'
            });
        }

        BetterOptionDialog
            .create({
                options: options,
                title: 'Better Option Dialog :)'
            })
            .show();
    }


    showDialogButton.addEventListener('click', openOptionDialog);


    deleteContainer.add(showDeleteLabel);
    deleteContainer.add(showDeleteSwitch);

    cancelContainer.add(showCancelLabel);
    cancelContainer.add(showCancelSwitch);

    window.add(deleteContainer);
    window.add(createBorder());
    window.add(cancelContainer);
    window.add(createBorder());
    window.add(showDialogButton);


    window.open();
}());
