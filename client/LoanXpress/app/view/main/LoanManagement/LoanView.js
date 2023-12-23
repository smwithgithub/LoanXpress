/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 * 
 * @author  S.M.Shamim
 */

Ext.define('XYZ_Bank_Management.view.main.LoanManagement.LoanView', {
    extend: 'Ext.tab.Panel',
    xtype: 'loanview',


    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',

        'XYZ_Bank_Management.view.main.List',
        'XYZ_Bank_Management.view.main.LoanManagement.Grids.LoanRequest',
        'XYZ_Bank_Management.view.main.LoanManagement.Grids.RunningLoan'
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
        id:'loanheader',
        layout: {
            align: 'stretchmax'
        },
        title: {
            text:'Loan Management',
            
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
        id:'loantabbar',
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
        // bodyPadding: 10,
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

        // this tab will show all loans
        {
            title: 'View Loans',
            iconCls: 'fa-solid fa-eye',
            // The following grid shares a store with the classic version's grid as well!
            items: [{
                xtype: 'runningloan',
                
            }]
        },

        // this tab will give applying for new loan
        {
        title: 'Apply For Loan',
        height:70,
        iconCls: 'fa-solid fa-pen',
        scrollable: true, // Set scrollable to true

        // The following grid shares a store with the classic version's grid as well!
        items: [{
            xtype: 'loanapplicationform',
            
        }]
        },
        
    
        // this tab will show loan pending requests 
        {
            title: 'Loan Requests',
            iconCls: 'fa-solid fa-spinner fa-spin',
            
            items: [{
                xtype: 'loanrequest',
                
            }]
            
        },
    
        {
            title: 'Policy',
            iconCls: 'fa-solid fa-info',
            scrollable: true, // Set scrollable to true
            items:[
                {
                    xtype:'loanpolicyview',
                }
            ]

        },

],

    // Define the common top toolbar for all tabs
    tbar: {

        height:41,
        layout: {
            pack: 'center', // Center-align items horizontally
        },
        cls:'tbarOnLoan',

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
                    var tabBar = Ext.getCmp('loantabbar');
                    var tabHeader = Ext.getCmp('loanheader');

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