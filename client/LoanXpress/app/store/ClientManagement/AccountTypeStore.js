/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 * 
 * @author  S.M.Shamim
 */
Ext.define('XYZ_Bank_Management.store.ClientManagement.AccountTypeStore', {
    extend: 'Ext.data.Store',

    alias: 'store.accounttypestore',


    fields: [
        'id_account_type_code', 'tx_account_type'
    ],

    proxy: {
        type: 'ajax',


        api: {
          
          read: 'http://localhost:9090/xyz_bank_management/getall/bankaccounttype',  // api's url to get all customers
          
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
