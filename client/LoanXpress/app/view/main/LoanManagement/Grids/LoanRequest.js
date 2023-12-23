/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 * 
 * @author  S.M.Shamim
 */
Ext.define('XYZ_Bank_Management.view.main.LoanManagement.Grids.LoanRequest', {
    extend: 'Ext.grid.Panel',
    xtype: 'loanrequest',

    controller:'loanrequestcontroller',

    cls:'loanrequest',
    id:'loanrequest',

    requires: [
        'XYZ_Bank_Management.store.LoanManagement.LoanRequestStore',
        'XYZ_Bank_Management.view.main.LoanManagement.Grids.LoanRequestController'
    ],

    store: {
        type: 'loanrequeststore'
    },

    bodyStyle:{

      bodyPadding:10,

  },

    columns: [
      // { text: 'Loan Code',  dataIndex: 'id_loan_code', flex:1 },
        { text: 'Application Date',  dataIndex: 'dt_application_date', flex:1, align: 'center' },
        { text: 'Account Number', dataIndex: 'id_account_number', flex:1, align: 'center'},
        { text: 'full Name', dataIndex: 'tx_full_name', flex:1, align: 'center'},
        { text: 'DOB', dataIndex: 'dt_date_of_birth', flex:1, align: 'center'},
        { text: 'Nationality', dataIndex: 'tx_nationality', flex:1, align: 'center'},
        { text: 'Profession', dataIndex: 'tx_proffession', flex:1, align: 'center'},
        { text: 'Monthly Income', dataIndex: 'id_monthly_income', flex:1, align: 'center'},
        { text: 'Loan Type', dataIndex: 'tx_loan_type', flex:1, align: 'center'},
        { text: 'Interest Rate', dataIndex: 'id_interest_rate', flex:1, align: 'center'},
        { text: 'Requested Amount', dataIndex: 'id_requested_amount', flex:1, align: 'center'},
        { text: 'Approved Amount', dataIndex: 'id_approved_amount', flex: 1 , align: 'center'},
        { text: 'Tenor Month', dataIndex: 'id_loan_tenor_month', flex:1,  align: 'center'},
        { text: 'Loan Status', dataIndex: 'tx_loan_status', flex:1, align: 'center'},
        {
          xtype: 'actioncolumn',
          text: 'Actions',
          width: 100,
          align: 'center',
          flex:1,
          items: [
              {
                  iconCls: 'x-fa fa-check',  // Icon for the "Approve" action
                  tooltip: 'Approve Loan',
                  handler: 'onApproveLoan' // Call the appropriate handler method
              },
              {
                xtype: 'tbseparator', // Add a separator (space) between the actions
            },
              {
                  iconCls: 'x-fa fa-trash', // Icon for the "Remove" action
                  tooltip: 'Reject Loan',
                  handler: 'onRejectLoan', // Call the appropriate handler method
              }
          ]
      }
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
