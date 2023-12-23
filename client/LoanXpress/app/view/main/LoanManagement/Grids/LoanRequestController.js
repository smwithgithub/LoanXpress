/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 * 
 * @author  S.M.Shamim
 */
Ext.define('XYZ_Bank_Management.view.main.LoanManagement.Grids.LoanRequestController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.loanrequestcontroller',

    // Event handler for editing a student
    onApproveLoan: function (grid, rowIndex) {

        var store = grid.getStore();
        var record = store.getAt(rowIndex);

        var loanViewStore = Ext.getCmp('runningloan').getStore();

        // Get the values you need from the record
        var idLoanCode = record.get('id_loan_code');
        var tenorMonth = record.get('id_loan_tenor_month');
        var rate = record.get('id_interest_rate');

        // Get the duration date
        var currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() + 12);
        var dtDuration = currentDate.toISOString().split('T')[0]; // 'YYYY-MM-DD'

        var requestedAmount = record.get('id_requested_amount');
        
        // Create a reference to the form
        var approveForm = Ext.create('Ext.window.Window', {
            title: 'Approve The Loan',
            width: 320,
            height: 200,
            bodyPadding: 10,
            alwaysOnTop: true,
            layout: 'fit',

            items: [
                {
                    xtype: 'form',
                    
                    items:[
                        {
                            xtype: 'fieldset',
                            title: 'Approve Amount',
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Amount <span class="x-form-required-field"></span>',
                                    name: 'approve_amount',
                                    value:requestedAmount,
                                    allowBlank: false,
                                    width:innerWidth/3
                                },
                            ],
                        },
                    ],

                    buttons: [
                        {
                            text: 'Submit',
                            handler: function () {
                                var form = this.up('form').getForm();

                                // Get the form values
                                var values = form.getValues();

                                var approve_amount = values.approve_amount;

                                if (form.isValid() && approve_amount>=0) {


                                    // ============================================creating installment===========================

                                    // calculation interest rate
                                    var interestRate = rate/(100*12);

                                    var multiplyRate = Math.pow(1+interestRate, tenorMonth);
                                    var divisionRate = Math.pow(1+interestRate,tenorMonth-1);

                                    var emi = (approve_amount*interestRate*multiplyRate)/divisionRate;

                                    var required_amount = parseInt((approve_amount/tenorMonth)+emi);

                                    var installmentRequestOptions = {
                                    method: 'POST',
                                    redirect: 'follow'
                                    };

                                    fetch("http://localhost:9090/xyz_bank_management/create/loaninstallment/"+idLoanCode+"/"+required_amount+"/"+tenorMonth, installmentRequestOptions)
                                    .then(response => {
                                        if (!response.ok) {
                                            // If the response is not OK, show an error toast
                                            Ext.toast('Installment creation failed!', 'Error');
                                            throw new Error('Network response was not ok');
                                        }
                                        return response.text();
                                    })
                                    .then(result => {
                                        // the success case handling 
                                        // console.log(result);
                                        Ext.toast('Installment created successfully!', 'Success');
                                        
                                    })
                                    .catch(error => console.log('error', error));


                                    // =========================================updating loan details==================================
                                    var requestOptions = {
                                    method: 'PUT',
                                    redirect: 'follow'
                                    };

                                    fetch("http://localhost:9090/xyz_bank_management/approveandupdate/loan/"+idLoanCode+"/"+dtDuration+"/"+approve_amount, requestOptions)
                                    .then(response => {
                                        if (!response.ok) {
                                            // If the response is not OK, show an error toast
                                            Ext.toast('Loan approval failed!', 'Error');
                                            throw new Error('Network response was not ok');
                                        }
                                        store.load();
                                        return response.text();
                                    })
                                    .then(result => {
                                        // the success case handling 
                                        // console.log(result);
                                        loanViewStore.load();
                                        Ext.toast('Loan approved successfully!', 'Success');
                                        approveForm.close();
                                    })
                                    .catch(error => console.log('error', error));

                                }

                                else {
                                    // Checkbox is not checked, show a toast message
                                    Ext.toast('Please enter approval ammount', 'Error');
                                }
                            },
                        },
                        {
                            text: 'Cancel',
                            handler: function () {
                                approveForm.close();
                            },
                        },
                    ],

                },
            ],
        });

        approveForm.show();
        
    },


    // reload the grid for updated data
    onReload: function () {
        var grid = this.getView();
        var store = grid.getStore();

        // Reload the data from the server by calling the store's load method
        store.load({
            callback: function (records, operation, success) {
                if (success) {
                    Ext.toast('Data reloaded successfully!', 'Success');
                } else {
                    Ext.toast('Failed to reload data!', 'Error');
                }
            },
        });
    },


    // search values from grid
    onSearch: function (textfield, e) {
        var value = textfield.getValue().toLowerCase(); // Get the text entered in the field and convert it to lowercase
        var grid = this.getView();
        var store = grid.getStore();
    
        // Clear any previous filters
        store.clearFilter();
    
        if (value) {
            store.filterBy(function (record) {
                var clientName = record.get('tx_full_name').toLowerCase();
                var clientAccountNumber = record.get('id_account_number').toString();
    
                return clientName.includes(value) || clientAccountNumber.includes(value);
            });
        }
    },

    onRejectLoan: function(grid, rowIndex){
        var store = grid.getStore();
        var record = store.getAt(rowIndex);

        var loanCode = record.get('id_loan_code');

        var requestOptions = {
        method: 'PUT',
        redirect: 'follow'
        };

        fetch("http://localhost:9090/xyz_bank_management/reject/loan/"+loanCode, requestOptions)
        .then(response => {
            if (!response.ok) {
                // If the response is not OK, show an error toast
                Ext.toast('Loan rejection failed!', 'Error');
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(result => {
            // the success case handling 
            // console.log(result);
            Ext.toast('Loan rejected successfully!', 'Success');
            
        })
        .catch(error => console.log('error', error));

    }
    
    
    
    
});
