/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 * 
 * @author  S.M.Shamim
 */
Ext.define('XYZ_Bank_Management.store.LoanManagement.RunningLoanStore', {
    extend: 'Ext.data.Store',

    alias: 'store.runningloanstore',


    fields: [
        'id_loan_code', 'tx_full_name', 'id_account_number', 'id_approved_amount','id_loan_tenor_month','dt_duration_date', 'id_due_amount', 'id_recovered_amount', 'id_interest_rate', 'tx_mobile_number'
    ],

    proxy: {
        type: 'ajax',


        api: {
          
          read: 'http://localhost:9090/xyz_bank_management/getall/approvedloan',  // api's url to get all customers
          
        },

        actionMethods: {
          read: 'GET',       // Use GET for read operation
          update: 'PUT',     // Use PUT for update operation
      },

        reader: {
          type: 'json',
          rootProperty: 'data',
          
        },
        writer: {
          type: 'json',
          writeAllFields: true
        }
      },
      autoLoad: true

});
