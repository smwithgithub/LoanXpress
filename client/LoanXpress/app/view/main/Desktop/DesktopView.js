
/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 * 
 * @author  S.M.Shamim
 */

Ext.define('XYZ_Bank_Management.view.main.Desktop.DesktopView', {
    extend: 'Ext.panel.Panel',
    xtype: 'desktopview',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',

        'XYZ_Bank_Management.view.main.Desktop.DesktopController'
    ],

    controller: 'desktop',
    
    viewModel: 'main',

    ui: 'navigation',
    layout:'column',
    id:'desktopView',

    bodyStyle:{
        'background-image':'url(resources/images/xyzbackground2.png)',
        'backgroundSize': '100% 100%',
        'backgroundRepeat': 'no-repeat',
        'backgroundPosition': 'cover',
            
        },

// ===================================================items of main panel=================================================
    items:[
        {
            xtype:'container',
            layout:'column',
            columnWidth:0.06,

            items:[

                // ==============Loan Management Button============================
                {
                    xtype: 'button',
                    margin: '15 0 0 10',
                    padding: '5',
                    height: 105,
                    width: 85,
                    draggable: true,

                    html: '<div> <img src="resources/images/loanicon.png" height=65px width=65px "> <br> <span style="color: white; line-height: .05; font-weight: normal; font-size: 10px; text-align: center; margin-left:18px;">LOAN</span> <br> <span style="color: white; line-height: .05; font-weight: normal; font-size: 10px; text-align: center;">MANAGEMENT</span> </div>',

                    style:{
                        'background-color':'transparent',
                        'border':'none'
                    },
                    listeners: {
                        click: 'loanOnclick',
                    }
                },


                // ==============Customer Service Button============================
                {
                    xtype: 'button',
                    margin: '15 0 0 10',
                    padding: '5',
                    height: 110,
                    width: 85,
                    draggable: true,

                    html: '<div> <img src="resources/images/customerservice.png" height=65px width=65px style="margin-bottom: 3px;"> <br> <span style="color: white; line-height: .05; font-weight: normal; font-size: 10px; text-align: center; margin-left:15px;">CLIENT</span> <br> <span style="color: white; line-height: .05; font-weight: normal; font-size: 10px; text-align: center;">MANAGEMENT</span> </div>',

                    style:{
                        'background-color':'transparent',
                        'border':'none'
                    },
                    listeners: {
                        click: 'clientOnclick',
                    }
                },

                // =========button elements end of main panel's container
            ]
        },
        
        
    ], // ======end items of main panel

    // =========bottom bar of main panel

    
    bbar: {

        cls:'bbardesign',
        id:'bbarid',

        items:[

            // ===========windows button of bbar===================
            {
                xtype: 'button',
                cls:'windowsbtn',
                icon:'resources/images/windows.png',
                style:{
                    backgroundColor:'transparent'
                },
                listeners: {
                    click: 'windowsPopUp'
            }
          
            },
            
            // ===============search bar of bbar===================
            {
                xtype: 'textfield',
                emptyText: 'Search...',
                id:'searchField',
                fieldStyle: 'background-color: #0b0a1d;',
                width: 200,
            },

            {
                xtype: 'button',
                text: 'Search',
                id:'searchBtn',
                iconCls: 'x-fa fa-search',
                style:{'background-color': '#0b0a1d;'},
                margin: '0 0 0 -10', 
                handler: function () {
                    // Add your search logic here
                }
            },

            // form to add and remove button to the bbar
            {
                xtype: 'form',
                id:'newBtnForm',
                width:'800',
                bodyStyle:{'background-color': 'transparent',
                },
                margin: '0 0 0 0', 

            },
            
            
            '->', //to set element at the right of the bar=====

            // ============date and time on bbar===============
            {
                xtype: 'component',
                id:'dateTimeLabel',
                autoEl: 'div', // Render as a <div> element
                html: 'Loading...', // Initial text
                margin:'0 20 0 0',
                listeners:{
                    afterrender:'updateDateTimeLabel' //the function will update date and time label after the view rendered
                }
            },

            // ============notification button of bbar===============
            {
                xtype: 'button',
                iconCls:'fas fa-comment-alt',
                cls:'notification',
                listeners: {
                    click: function (button) {
                        button.el.setStyle('background-color', 'transparent');
                        Ext.Msg.alert('Alert', 'We are working on Notifications');
                    }
                }
            },
            
            
        ]

    }, //===============bbar code==========================================


});
