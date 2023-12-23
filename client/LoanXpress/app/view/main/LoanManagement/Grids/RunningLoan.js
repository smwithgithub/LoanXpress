/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 * 
 * @author  S.M.Shamim
 */
Ext.define('XYZ_Bank_Management.view.main.LoanManagement.Grids.RunningLoan', {
    extend: 'Ext.grid.Panel',
    xtype: 'runningloan',

    controller:'runningloancontroller',

    cls:'runningloan',
    id:'runningloan',

    requires: [
        'XYZ_Bank_Management.store.LoanManagement.RunningLoanStore',
        'XYZ_Bank_Management.view.main.LoanManagement.Grids.RunningLoanController'
    ],

    bodyStyle:{

        bodyPadding:10,

    },


    // title: 'Running Loans',

    store: {
        type: 'runningloanstore',
        
    },

    columns: [
        // { text: 'Loan Code',  dataIndex: 'id_loan_code' },
        { text: 'Full Name', dataIndex: 'tx_full_name', flex: 1, align: 'center'},
        { text: 'Account Number', dataIndex: 'id_account_number', flex: 1, align: 'center' },
        { text: 'Loan Amount', dataIndex: 'id_approved_amount', flex: 1, align: 'center' },
        { text: 'Tenor Month', dataIndex: 'id_loan_tenor_month', flex: 0.5, align: 'center' },
        { text: 'Duration Date', dataIndex: 'dt_duration_date', flex: 1, align: 'center' },
        { text: 'Due Amount', dataIndex: 'id_due_amount', flex: 1, align: 'center' },
        { text: 'Recoverd Amount', dataIndex: 'id_recovered_amount', flex: 1, align: 'center' },
        { text: 'Interest Rate', dataIndex: 'id_interest_rate', flex: 0.5, align: 'center' },
        { text: 'Phone', dataIndex: 'tx_mobile_number', flex: 1, align: 'center' },
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

      listeners: {

        itemcontextmenu: 'OnItemContextMenu', // Reference to the controller method

    }
});
