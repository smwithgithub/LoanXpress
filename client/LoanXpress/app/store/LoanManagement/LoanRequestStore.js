/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 * 
 * @author  S.M.Shamim
 */
Ext.define('XYZ_Bank_Management.store.LoanManagement.LoanRequestStore', {
    extend: 'Ext.data.Store',

    alias: 'store.loanrequeststore',


    fields: [
        'id_loan_code','dt_application_date', 'id_account_number', 'tx_full_name', 'dt_date_of_birth','tx_nationality','tx_proffession', 'id_monthly_income', 'tx_loan_type','id_interest_rate', 'id_requested_amount', 'id_approved_amount', 'id_loan_tenor_month', 'tx_loan_status'
    ],

    proxy: {
        type: 'ajax',


        api: {
          
          read: 'http://localhost:9090/xyz_bank_management/getall/loanrequest',  // api's url to get all customers
          
        },

        actionMethods: {
          read: 'GET',       // Use GET for read operation
          update: 'PUT',     // Use PUT for update operation
      },

        reader: {
          type: 'json',
          rootProperty: 'data'
        },
        writer: {
          type: 'json',
          writeAllFields: true
        }
      },
      autoLoad: true

});
