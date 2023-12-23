/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 * 
 * @author  S.M.Shamim
 */
Ext.define('XYZ_Bank_Management.view.main.ClientManagement.Grids.RunningClients', {
    extend: 'Ext.grid.Panel',
    xtype: 'runningclients',

    requires: [
        'XYZ_Bank_Management.store.ClientManagement.RunningClientStore',
        'XYZ_Bank_Management.view.main.ClientManagement.Grids.RunningClientsController'
    ],

    controller: 'runningclientscontroller',

    cls:'runningclientsstyle',
    id:'runningclientsstyle',

    store: {
        type: 'runingclientstore'
    },

    bodyStyle:{

        bodyPadding:10,

    },

    columns: [
        { text: 'ID',  dataIndex: 'id_customer_code', flex: 0.5, align: 'center' },
        { text: 'Account Number', dataIndex: 'id_account_number', flex: 1, align: 'center' },
        { text: 'First Name', dataIndex: 'tx_first_name', flex: 1, align: 'center' },
        { text: 'Last Name', dataIndex: 'tx_last_name', flex: 1, align: 'center' },
        { text: 'Father Name', dataIndex: 'tx_father_name', flex: 1, align: 'center' },
        { text: 'NID', dataIndex: 'id_nid', flex: 1, align: 'center' },
        { text: 'DOB', dataIndex: 'dt_date_of_birth', flex: 1, align: 'center' },
        { text: 'Occupation', dataIndex: 'tx_occupation', flex: 1, align: 'center' },
        { text: 'Nationality', dataIndex: 'tx_nationality', flex: 1, align: 'center' },
        { text: 'District', dataIndex: 'tx_district', flex: 1, align: 'center' },
        { text: 'Phone', dataIndex: 'tx_mobile_number', flex: 1, align: 'center' },
        { text: 'Email', dataIndex: 'tx_email', flex: 1, align: 'center' },
        { text: 'Account Type', dataIndex: 'tx_account_type', flex: 1, align: 'center' },
    ],


    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top', 
            style: {
                backgroundColor: '#E9E4D4', // set your desired background color
            },

            items: [

                {
                    xtype: 'button',
                    height: 32,
                    width: 35,
                    html: '<div style="display: flex; justify-content: center; align-items: center;"><img src="resources/images/reload.png" height="20px" width="20px"></div>',
                    style: {
                        backgroundColor: 'transparent',
                        border: 'none',
                    },
                    handler: 'onReload'
                },

                // search bar
                {
                    xtype: 'textfield',
                    emptyText: 'name or account number....',
                    margin:'0 0 0 15',
                    fieldStyle: 'background-color: #ededed;',
                    enableKeyEvents: true,
                    width: 300,
                    triggers: {
                        search: {
                            cls: 'x-form-search-trigger custom-search-trigger', // Apply a CSS class to the search trigger icon
                        },
                    },

                    // search with pressing enter
                    listeners:{
                        keyup: 'onSearch'
                    }
                    
                },

                
            ],

        },
    ],


    
});
