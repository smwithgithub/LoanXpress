/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 * 
 * @author  S.M.Shamim
 */

Ext.define('XYZ_Bank_Management.view.main.ClientManagement.ClientView', {
    extend: 'Ext.tab.Panel',
    xtype: 'clientview',


    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',

        'XYZ_Bank_Management.view.main.List',
        'XYZ_Bank_Management.view.main.ClientManagement.Forms.ClientAccountCreationForm',
        'XYZ_Bank_Management.view.main.ClientManagement.Grids.RunningClients'
    ],

    // controller: 'main',
    viewModel: 'main',

    ui: 'navigation',

    tabBarHeaderPosition: 1,
    titleRotation: 0,
    tabPosition: 'left', // Set the tab position to 'left'
    tabRotation: 0,


    // tabbar header
    header: {
        flex: 1,
        width:220,
        id:'clientheader',

        layout: {
            align: 'stretchmax'
        },

        title: {

            text:'Client Management',
            flex: 0
        },

        style: {
            background: '#303030', // Change this to your desired background color
            
        }
        
    },

    responsiveConfig: {
        tall: {
            headerPosition: 'top'
        },
        wide: {
            headerPosition: 'left'
        }
    },

    // tabbar layout & sizeing
    tabBar: {
        flex: 1,
        width:220,
        id:'clienttabbar',
        padding: 10,
        scrollable:true,
        layout: {
            type:'vbox',
            align: 'stretch',
            overflowHandler: 'none' // set the tab to scroll
        },
    },

    // content view's settings
    defaults: {
        
        // content area's style
        bodyStyle: {
            backgroundColor:'#b7b7b7',
        },

        // tabs style
        tabConfig: {
            style: {
                borderRadius: '10px', // Adjust the border radius value as needed
            },
            // tabs
            responsiveConfig: {
                wide: {
                    iconAlign: 'left',
                    textAlign: 'left'
                },
                tall: {
                    iconAlign: 'top',
                    textAlign: 'center',
                    width: 120
                }
            }
        },

        
        
    },

    items: [

        // feature to view all clients
        {
            title: 'View Clients',
            iconCls: 'fa-solid fa-eye',
            scrollable: true, // Set scrollable to true
            // The following grid shares a store with the classic version's grid as well!
            items: [{
                xtype: 'runningclients',
                
            }]
        },

        // feature to create bank account 
        {
        title: 'Create Account',
        height:70,
        iconCls: 'fa-solid fa-cart-plus',
        scrollable: true, // Set scrollable to true

        // The following grid shares a store with the classic version's grid as well!
        items: [{
            xtype: 'clientaccountcreationform',
            
        }]
        },
        
        // feature to view all old clients
        {
            title: 'Old Clients',
            iconCls: 'fa-solid fa-recycle',
            scrollable: true, // Set scrollable to true
            bind: {
                html: '{loremIpsum}'
            }
        },
        

],

    // Define the common top toolbar for all tabs
    tbar: {

        height:41,
        layout: {
            pack: 'center', // Center-align items horizontally
        },
        cls:'tbarOnClient',

        items: [

            // collapse button
            {
                xtype:'button',
                height:30,
                width:35,
                html: '<div style="display: flex; justify-content: center; align-items: center;"><img src="resources/images/collapse.png" height="30px" width="25px"></div>',
                style:{
                    backgroundColor:'transparent',
                    border:'none'
                },

                handler: function (button) {
                    var tabBar = Ext.getCmp('clienttabbar');
                    var tabHeader = Ext.getCmp('clientheader');

                    // Toggle the visibility of the tab bar
                    tabBar.setHidden(!tabBar.isHidden());
                    tabHeader.setHidden(!tabHeader.isHidden());
                }
            },



            '->', // Spacer to push buttons to the right

            // notifications button=======================
            {
                xtype:'button',
                height:30,
                width:35,
                html: '<div style="display: flex; justify-content: center; align-items: center;"><img src="resources/images/notification.png" height="23px" width="25px"></div>', 
                
                style:{
                    backgroundColor:'transparent',
                    border:'none'
                    
                },

                layout: {
                    type: 'vbox',
                    pack: 'center',
                    align: 'center'
                  },

                handler: function (button) {
                    Ext.Msg.alert('Alert', 'We are working on Notifications');
                }
            },
        ]
    }

});