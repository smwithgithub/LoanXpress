/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 * 
 * @author  S.M.Shamim
 */
Ext.define('XYZ_Bank_Management.view.main.ClientManagement.Forms.ClientAccountCreationFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.clientformcontroller',
  

    onSubmitClick:function(){

        
        var form = this.getView().getForm();
        var values = form.getValues();

        
        var clientViewStore = Ext.getCmp('runningclientsstyle').getStore();
        
        if(form.isValid()){

            // getting last account number 
            async function getLastAccountNumber() {
                try {
                    var requestOptions = {
                        method: 'GET',
                        redirect: 'follow'
                    };
            
                    const response = await fetch("http://localhost:9090/xyz_bank_management/get/lastaccountnumber", requestOptions);
            
                    if (!response.ok) {
                        throw new Error('Network response was not ok');

                    }
            
                    const result = await response.text();
                    return result;
                } catch (error) {
                    Ext.toast('Error fetching last account number!', 'Error');
                    
                    return null;
                }
            }
    
            // ==============================creating account===============================
            async function main() {

                // getting last account number and generate new account number
                var lastAccountNumber = await getLastAccountNumber();
    
                // set the default value of account number
                if(lastAccountNumber === null || lastAccountNumber === undefined || lastAccountNumber.trim() === ''){
                    lastAccountNumber='100200300'
                }
                
                var newAccountNumber = parseInt(lastAccountNumber)+1;


                // Get the selected account type from the combobox
                var accountTypeCombo = Ext.getCmp('accountTypeCombo'); // Use itemId
                var selectedAccountType = accountTypeCombo.getRawValue();
                
                
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                // making the json body 
                var raw = JSON.stringify({
                    "id_account_number": newAccountNumber,
                    "tx_account_type": selectedAccountType,
                    "tx_first_name": values.tx_first_name,
                    "tx_last_name": values.tx_last_name,
                    "tx_father_name": values.tx_father_name,
                    "tx_mother_name": values.tx_mother_name,
                    "id_nid": values.id_nid,
                    "dt_date_of_birth": values.dt_date_of_birth,
                    "tx_occupation": values.tx_occupation,
                    "id_monthly_income": values.id_monthly_income,
                    "tx_nationality": values.tx_nationality,
                    "tx_present_address": values.tx_present_address,
                    "tx_permanent_address": values.tx_permanent_address,
                    "tx_district": values.tx_district,
                    "tx_mobile_number": values.tx_mobile_number,
                    "tx_email": values.tx_email,
                    "id_account_type_code": values.tx_account_type
                });

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                fetch("http://localhost:9090/xyz_bank_management/create/bankaccount", requestOptions)
                    .then(response => {
                        if (!response.ok) {
                            // If the response is not OK, show an error toast
                            Ext.toast('Error creating the account!', 'Error');
                            throw new Error('Network response was not ok');
                        }
                        return response.text();
                    })
                    .then(result => {
                        // the success case handling 
                        // console.log(result);
                        clientViewStore.load();
                        Ext.toast('Account created successfully!', 'Success');
                        
                    })
                    .catch(error => console.log('error', error));
            
            }
    
            main();
            

        }else{
            Ext.toast('Please fill up all required fields', 'Faild');
        }
        
    },


    // Handler for the Reset button
    onResetClick: function () {
        // Get the form instance
        var form = this.getView().getForm();

        // Reset the form fields
        form.reset();
    },
    
});
