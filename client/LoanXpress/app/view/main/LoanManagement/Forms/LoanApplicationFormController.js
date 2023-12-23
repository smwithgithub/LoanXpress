/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 * 
 * @author  S.M.Shamim
 */
Ext.define('XYZ_Bank_Management.view.main.LoanManagement.Forms.LoanApplicationFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.loanapplicationformcontroller',
  

    // submit for account creation
    onSubmitClick:function(){

        
        var form = this.getView().getForm();
        var values = form.getValues();

        var loanRequestStore = Ext.getCmp('loanrequest').getStore();
        
        if(form.isValid()){

            // Get the current date in 'Y-m-d' format
            var currentDate = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'


            // Get the selected occupation from the combobox
            var occupationCombo = Ext.getCmp('occupationCombo'); 
            var selectedOccupation = occupationCombo.getRawValue();

            // Get the selected nationality from the combobox
            var nationalityCombo = Ext.getCmp('nationalityCombo'); 
            var selectedNationality = nationalityCombo.getRawValue();

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
            "dt_application_date": currentDate,
            "id_account_number": values.id_account_number,
            "id_requested_amount": values.id_requested_amount,
            "id_loan_tenor_month": values.id_loan_tenor_month,
            "id_total_number_of_applicant": values.id_total_number_of_applicant,
            "tx_full_name": values.tx_full_name,
            "dt_date_of_birth": values.dt_date_of_birth,
            "id_nid": values.id_nid,
            "tx_nationality": selectedNationality,
            "tx_present_address": values.tx_present_address,
            "tx_proffession": selectedOccupation,
            "tx_name_of_the_organization": values.tx_name_of_the_organization,
            "tx_email": values.tx_email,
            "tx_mobile_number": values.tx_mobile_number,
            "id_monthly_income": values.id_monthly_income,
            "tx_loan_status": "Pending",
            "id_loan_type_code": values.id_loan_type_code
            });

            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };

            fetch("http://localhost:9090/xyz_bank_management/applyingfor/loan", requestOptions)
                .then(response => {
                    if (!response.ok) {
                        // If the response is not OK, show an error toast
                        Ext.toast('Loan application faield!', 'Error');
                        throw new Error('Network response was not ok');
                    }
                    return response.text();
                })
                .then(result => {
                    // the success case handling 
                    // console.log(result);
                    loanRequestStore.load();
                    Ext.toast('Loan application submitted successfully!', 'Success');

                })
                .catch(error => console.log('error', error));

            

        }else{
            Ext.toast('Please fill up all required fields', 'Faild');
        }
        
    },


    // getting and setting values depending on account number
    onAccountNumberChange: function (field, newValue, oldValue) {
        // Remove any decimal point if it exists
        field.setValue(parseInt(newValue, 10));

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("http://localhost:9090/xyz_bank_management/getclient/byaccountnumber/" + newValue, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok to retrieve data based on this account number');
                }
                return response.json();
            })
            .then(data => {

                var form = field.up('form');
                form.down('textfield[name=tx_full_name]').setValue(data.tx_first_name + " " + data.tx_last_name);
                form.down('datefield[name=dt_date_of_birth]').setValue(data.dt_date_of_birth);
                form.down('combobox[name=tx_nationality]').setRawValue(data.tx_nationality);
                form.down('numberfield[name=id_nid]').setValue(data.id_nid);
                form.down('combobox[name=tx_proffession]').setRawValue(data.tx_occupation);
                form.down('textfield[name=tx_mobile_number]').setValue(data.tx_mobile_number);
                form.down('textfield[name=tx_email]').setValue(data.tx_email);
                form.down('textfield[name=id_monthly_income]').setValue(data.id_monthly_income);
                form.down('textfield[name=tx_present_address]').setValue(data.tx_present_address);


                // Populate other fields as needed...
                form.down('textfield[name=tx_full_name]').setReadOnly(true);
                form.down('datefield[name=dt_date_of_birth]').setReadOnly(true);
                form.down('combobox[name=tx_nationality]').setReadOnly(true);
                form.down('numberfield[name=id_nid]').setReadOnly(true);
                form.down('combobox[name=tx_proffession]').setReadOnly(true);
                form.down('textfield[name=tx_mobile_number]').setReadOnly(true);
                form.down('textfield[name=tx_email]').setReadOnly(true);

                if(data.tx_email === null || data.tx_email === undefined || data.tx_email.trim() === ''){
                    form.down('textfield[name=tx_email]').setReadOnly(false);
                }

                Ext.toast('Enter others information', 'Alert');
            })
            .catch(error => {
                // console.error('Error:', error);
                Ext.toast('Account number not found!', 'Not Found');
            });
    },

    // Add a specialkey event listener to handle Enter key press
    onAccountNumberSpecialKey: function (field, event) {
        if (event.getKey() === Ext.event.Event.ENTER) {
            // Call the onAccountNumberChange function when Enter key is pressed
            this.onAccountNumberChange(field, field.getValue(), field.originalValue);
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
