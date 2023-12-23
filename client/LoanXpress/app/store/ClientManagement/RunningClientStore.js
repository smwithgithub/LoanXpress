/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 * 
 * @author  S.M.Shamim
 */
Ext.define('XYZ_Bank_Management.store.ClientManagement.RunningClientStore', {
    extend: 'Ext.data.Store',

    alias: 'store.runingclientstore',


    fields: [
        'id_customer_code', 'id_account_number', 'tx_account_type', 'tx_first_name','tx_last_name','tx_father_name', 'tx_mother_name', 'id_nid', 'dt_date_of_birth', 'tx_occupation', 'id_monthly_income', 'tx_nationality', 'tx_present_address', 'tx_permanent_address', 'tx_district', 'tx_mobile_number', 'tx_email', 'id_account_type_code'
    ],

    proxy: {
        type: 'ajax',


        api: {
          
          read: 'http://localhost:9090/xyz_bank_management/getall/customers',  // api's url to get all customers
          
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
