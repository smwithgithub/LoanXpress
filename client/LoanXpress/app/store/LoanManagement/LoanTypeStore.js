/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 * 
 * @author  S.M.Shamim
 */
Ext.define('XYZ_Bank_Management.store.LoanManagement.LoanTypeStore', {
    extend: 'Ext.data.Store',

    alias: 'store.loantypestore',


    fields: [
        'id_loan_type_code', 'tx_loan_type', 'id_interest_rate'
    ],

    proxy: {
        type: 'ajax',


        api: {
          
          read: 'http://localhost:9090/xyz_bank_management/getall/loantypes',  // api's url to get all customers
          
        },

        actionMethods: {
          read: 'GET',       // Use GET for read operation
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
