
/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 * 
 * @author  S.M.Shamim
 */
Ext.define('XYZ_Bank_Management.view.main.Login.LoginView', {
    extend: 'Ext.Container',
    xtype: 'loginview',
    controller: 'login',

    ui: 'navigation',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',
        'SMDESKTOP.view.main.Login.LoginController'
    ],

    autoSize: true, // Automatically adjust the width to fit the content

    // layout settings in main 
    layout: {

        type: 'vbox',
        align: 'middle',
        pack:'center', 
    },

    // style in main container
    style: {
        backgroundColor:'#E2DFD2',
    },


    // main container's items
    items:[

        {
            xtype:'form',
            height: innerHeight-300,
            width : innerWidth-500,
            layout:'column',

            style: {
                // backgroundColor:'#ffffff',
                borderRadius:'15px',
                boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)' // Apply a box shadow to the form
            },

            // login form's items
            items:[

                // apply some detailes and style of login form
                {
                    xtype:'form',
                    columnWidth:0.5,
                    height:innerHeight-300,
                    bodyStyle:{
                        backgroundImage:'url(resources/images/loginback.png)',
                        backgroundSize: '100% 100%',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'cover',
                        height: '100%' // Set the form's height to 100% of its container
                    },

                    // layout settings in main 
                    layout: 'column',

                    items:[    
                        {
                            xtype: 'container',
                            height: innerHeight/2-100,
                            columnWidth: 1,
                            margin:'30 0 0 30',
                            layout:'hbox',

                            items:[
                                {
                                    xtype:'image',
                                    height:30,
                                    width:30,
                                    alt:'logo',
                                    src:'resources/images/banklogodesign.png'
                                },

                                {
                                    xtype: 'container', // Use a container element
                                    margin:'7 0 0 7',
                                    // html: '<div> <img src="resources/images/banklogodesign.png" height=30px width=30px "> <span style="color: white; font-weight: bold; font-size: 10px;  margin-left:10px;">Xyz BANK</span> </div>',
                                    style: 'font-weight: bold; color: #ffffff;', // CSS for styling
                                    width: '100%',
                                    html: '<div> <span style="color: white; font-weight: bold; ">Xyz BANK Management</span> </div>' // The text you want to display
                                }
                                                                
                                
                            ]
                        },

                    ]

        
                },

    
                // login information's form
                {
                    xtype:'form',
                    columnWidth:0.5,
                    height:innerHeight-300,
                    id:'loginform',
                    bodyStyle: {
                        backgroundColor:'#000435',
                        // opacity:'70%'
                    },

                    layout: {

                        type: 'vbox',
                        align: 'middle',
                        pack:'center',
                    },

                    // login informations items
                    items:[
                        
                        {
                            xtype: 'component',
                            width: 280,
                            height: 27,
                            html: '<h4>Welcome</h4>',
                            margin:'0 0 0 0',
                            style: {
                                'font-size': '20px',
                                'text-align': 'center',
                                'margin': 'auto',
                                'color':'#ffffff',
                                opacity:'100%'
                            }
                        },
        
        
                        {
                            xtype: 'component',
                            width: 280,
                            height: 27,
                            margin: '50 0 0 0',
                            html: 'Login Into Your Account',
                            style: {
                                'font-size': '20px',
                                'text-align': 'center',
                                'margin': 'auto',
                                'color':'#ffffff',
                                
                            }
                        },
                        
                        {
                            xtype: 'textfield',
                            allowBlank: false,
                            required: true,
                            cls:'username',
                            fieldStyle: 'color: #000000;',
                            width: 400,
                            margin: "40 0 0 0",
                            fieldLabel: 'User Name',
                            name: 'user_name',
                            placeholder: 'username',
                            msgTarget: 'qtip',
                            responsiveConfig: {
                                'desktop': {
                                    msgTarget: 'side'
                                }
                            },
                            style: {
                                'color':'#000000',
                            }
                        },
                        {
                            xtype: 'textfield',
                            inputType: 'password',
                            allowBlank: false,
                            required: true,
                            width: 400,
                            cls:'passwordField',
                            fieldLabel: 'Password',
                            fieldStyle: 'color: #000000;',
                            name: 'password',
                            placeholder: 'password',
                            msgTarget: 'qtip',
                            margin: "25 0 0 0",
                            responsiveConfig: {
                                'desktop': {
                                    msgTarget: 'side'
                                }
                            },
                            style: {
                                'color':'#000000',
                            }
                        
                        },
                        {
                            xtype: 'checkbox',
                            width: 280,
                            height: 30,
                            id:'loginCheckBox',
                            boxLabel: 'Keep me logged in',
                            name: 'remember',
                            margin: "20 0 0 0",
                            style: {
                                'font-size': '16px',
                                'letter-spacing': '1.25px',
                                'color': '#ffffff'
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'LOG IN',
                            id:'loginButton',
                            autoSize: true,
                            handler: 'onLogin',
                            height: 30,
                            width: 130,
                            margin: '20 0 0 0',
                            
                            style: {
                                backgroundColor: '#ffffff',
                                'text-align': 'center',
                                'letter-spacing': '1.25px',
                                'font-size': '14px',
                                borderColor:'#ADD8E6',
                                borderStyle:'solid',
                                borderWidth:'2px',
                                borderRadius:'8px',
                                
                            }
                        },
                        
                        {
                            xtype: 'component',
                            html: "<a style='color: #c7c7c7;'>Forgot your Password?</a>",
                            style: {
                                'font-size': '12px',
                                'text-align': 'center'
                            },
                            width: 280,
                            margin: "20 0 0 0"
                        }

                    ]


                },
        
                
            ]


        }
        
    ]


    
    
});