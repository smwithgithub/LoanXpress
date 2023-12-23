/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 * 
 * @author  S.M.Shamim
 */

Ext.define('XYZ_Bank_Management.view.main.Desktop.DesktopController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.desktop',


    // updateDateAndTime function to update date time every seconds
    updateDateTimeLabel: function (panel) {

        const dateTimeLabel = Ext.getCmp('dateTimeLabel') // Find the label component

        setInterval(() => {
            const currentTime = new Date(); // Get the current date and time
            dateTimeLabel.setHtml(Ext.Date.format(currentTime, 'h:i:s A <br> Y-m-d')); // Update the label text **(A) is for am pm
                                                                                            // \u00A0 is unicode of non-breaking space
        }, 1000); // Update every 1000 milliseconds (1 second)
    },


// make the button dblClick manually because of drag with click problem============================================================
    clickCount: 0,

    // Loan module onclick calling 
    loanOnclick: function(button, e) {
        this.clickCount++;
        if (this.clickCount === 2) {
            this.onClickWindow('loanWindow','loanview','taskLoanButton','LOAN')
            this.clickCount = 0; // Reset click count
        } else {
            // Set a timeout to reset click count after a short delay (e.g., 300ms)
            Ext.defer(this.resetClickCount, 300, this);
        }
    },


    // Client module onclick calling 
    clientOnclick: function(button, e) {
        this.clickCount++;
        if (this.clickCount === 2) {
            this.onClickWindow('clientWindow','clientview','taskClientButton','CLIENT')
            this.clickCount = 0; // Reset click count
        } else {
            // Set a timeout to reset click count after a short delay (e.g., 300ms)
            Ext.defer(this.resetClickCount, 300, this);
        }
    },


    resetClickCount: function() {
        this.clickCount = 0;
    },
// ======================================================================================================================================



    // global onClick function for module buttons 
    onClickWindow: function (window_id,item,newBtnId,newBtnName) {
            
            var existingWindow = Ext.getCmp(window_id);
            var desktopView = Ext.getCmp('desktopView');
            if(!existingWindow){
                // Open the window
                var myWindow = Ext.create('Ext.window.Window', {

                    title: {
                        
                        bind: {
                            text: '{name}' // set title the name off this application
                        },  
                    },
                    titleAlign: 'center', // Center-align the window title
                    constrainHeader:true,
                    width: innerWidth*0.7,
                    height: innerHeight*0.7,
                    scrollable: true,
                    controller: 'desktop',
                    maximizable: true, 
                    minimizable: true, 
                    id:window_id,
                    closable: true,
                    layout:'fit',
                    style:{
                        border:'none'
                    },
                    items: [
                        {
                            xtype:item,
                            
                        }
                    ],

                    listeners: {

                        // hide the window by clicking minimize button
                        minimize: function(window) {
                            window.hide();
                        },

                        // close the window by clicking minimize button
                        close: function(window) {
                            var newTaskButton = Ext.getCmp(newBtnId);
                            var myToolbar = Ext.getCmp('newBtnForm');
                                myToolbar.remove(newTaskButton);
                        },
                        // leave the toolbar height and maximize the window
                        maximize: function(window) {

                            var bbarHeight = desktopView.query('toolbar[dock="bottom"]')[0].getHeight();
                            var windowHeight = window.getHeight();
                            window.setHeight(windowHeight-bbarHeight);
                            
                        },

                    },
                });
                var myToolbar = Ext.getCmp('newBtnForm');
                            // When the window is minimized, add a button or text to your toolbar
                            openingButton=myToolbar.add({
                                xtype: 'button',
                                margin:'0 0 0 10',
                                cls:newBtnId,
                                id:newBtnId,
                                text: newBtnName,
                                style:{
                                    backgroundColor:'transparent'
                                },
                                handler: function() {

                                    if(myWindow.isHidden()){
                                        
                                        // leave the toolbar height and show the window
                                        myWindow.show();

                                        var bbarHeight = desktopView.query('toolbar[dock="bottom"]')[0].getHeight();
                                        var windowHeight = myWindow.getHeight();
                                        myWindow.setHeight(windowHeight-bbarHeight);

                                        if(!myWindow.maximized){
                                            myWindow.setHeight(windowHeight);
                                        }

                                    }
                                    else{
                                        myWindow.hide();
                                    }
                                    
                                }
                            });

                    myWindow.show();
            }
            else{

                // leave the toolbar height and show the window
                existingWindow.show();

                var bbarHeight = desktopView.query('toolbar[dock="bottom"]')[0].getHeight();
                var windowHeight = existingWindow.getHeight();
                existingWindow.setHeight(windowHeight-bbarHeight);

                // when window is no maximized the window height will be default
                if(!existingWindow.maximized){
                    existingWindow.setHeight(windowHeight);
                }

            }

    },


    // windowsPopUp click
    windowsPopUp: function (button) {
        button.el.setStyle('background-color', 'transparent ');

        var existPopUpWindow = Ext.getCmp('popupwindows');
        
        if(!existPopUpWindow){

            var popupWindow = Ext.create('Ext.window.Window', {
                id:'popupwindows',
                width: 300,
                height: 450,
                layout: 'vbox',
                draggable: false,
                resizable: {
                    handles: 'n e', // Allow resizing from the top (north) and right (east) sides
                    dynamic: false, // Disable dynamic resizing
                    pinned: true, // Pin the width while resizing
                },
                closable: false,
                bodyStyle:{'backgroundColor': '#1A1110',
                            'border-color': '#24204d'
                },

                items: [
                    {
                    xtype: 'button',
                    text: 'Log-Out',
                    margin:'20 0 0 0',
                    style:{'background-color': 'transparent',
                            'border-color': '#24204d',
                    },
                    handler: function () {
                        
                        var desktopView = Ext.getCmp('desktopView')

                        popupWindow.destroy();
                        desktopView.destroy();

                        location.reload();
                    }
                }],
                

        });

        // To set the window's position to the bottom of the parent panel
        popupWindow.show();
        var desktopView = Ext.getCmp('desktopView');
        var bbarHeight = desktopView.query('toolbar[dock="bottom"]')[0].getHeight();
        var windowHeight = popupWindow.getHeight();
        popupWindow.alignTo(desktopView, 'bl-bl');
        popupWindow.setHeight(windowHeight-bbarHeight);
        
        }

        else{
            existPopUpWindow.close();
        }
        
}

   
});