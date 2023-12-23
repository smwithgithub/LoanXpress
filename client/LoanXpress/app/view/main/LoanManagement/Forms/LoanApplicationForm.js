/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 * 
 * @author  S.M.Shamim
 */

// Calculate the minimum allowed date as 18 years ago from the current date
var validDate = new Date();
validDate.setFullYear(validDate.getFullYear() - 18);

Ext.define('XYZ_Bank_Management.view.main.LoanManagement.Forms.LoanApplicationForm', {
    extend: 'Ext.form.Panel',
    xtype: 'loanapplicationform',

    title: 'Apply for Loan',

    cls:'loanapplicationform',

    controller:'loanapplicationformcontroller',

    requires: [
        'XYZ_Bank_Management.store.LoanManagement.LoanTypeStore'
    ],

    bodyStyle:{

        bodyPadding:10,

    },

    items: [

        // loan requirement field============================
        {
            xtype: 'fieldset',
            title: 'Loan Requirement',
            defaults: {
                
                anchor: '100%',
                allowBlank: false,
            },

            layout:'hbox',


            items: [

                // type of loan===============
                {
                    xtype: 'combobox',
                    fieldLabel: 'Type of Loan<span class="x-form-required-field"></span>', // Label for the dropdown
                    name: 'id_loan_type_code', // Field name (used when submitting the form)
                    width:innerWidth*0.2,
                    margin:'5 0 0 0',
                    flex:1,

                    store: {
                        type: 'loantypestore' // Reference to the store alias
                    },
                    
                    
                    queryMode: 'remote', // Use 'remote' mode for remote data loading
                    displayField: 'tx_loan_type', // Field to display in the dropdown
                    valueField: 'id_loan_type_code', // Field representing the selected value
                    forceSelection: true, // Require a valid selection
                    editable: false, // Prevent manual input
                    emptyText: 'select', // Placeholder text
                },

                // free space to looks good===
                {
                    xtype:'component',
                    flex:0.2,
                },

                // loan tenor month
                {
                    xtype: 'numberfield',
                    fieldLabel: 'Loan Tenor(month)<span class="x-form-required-field"></span>',
                    name: 'id_loan_tenor_month',
                    allowBlank: false,
                    value: 12,  // Set the default value here  
                    flex:1,
                    listeners: {
                        change: function (field, newValue, oldValue) {
                            // Remove any decimal point if it exists
                            field.setValue(parseInt(newValue, 10));
                        }
                    }
                    
                },

                // free space to looks good===
                {
                    xtype:'component',
                    flex:0.2,
                },

                // applicant account number
                {
                    xtype: 'numberfield',
                    fieldLabel: 'Account Number<span class="x-form-required-field"></span>',
                    name: 'id_account_number',
                    allowBlank: false,
                    flex:1,
                    listeners: {
                        // change: 'onAccountNumberChange',
                        specialkey: 'onAccountNumberSpecialKey' // New specialkey event for Enter key
                        
                        // function (field, newValue, oldValue) {
                        //     // Remove any decimal point if it exists
                        //     field.setValue(parseInt(newValue, 10));
                        // }
                    }
                    
                },

                // free space to looks good===
                {
                    xtype:'component',
                    flex:0.2,
                },

                // Loan amount==========
                {
                    xtype: 'numberfield',
                    fieldLabel: 'Loan Amount<span class="x-form-required-field"></span>',
                    name: 'id_requested_amount',
                    margin:'5 0 0 0',
                    allowBlank: false,
                    flex:1,
                    
                },

            ],
        },

        // total number of applicant
        {
            xtype: 'fieldset',
            title: 'Total Number Loan Applicant',
            defaults: {
                anchor: '100%',
            },

            layout:'vbox',

            items: [

                // Loan amount==========
                {
                    xtype: 'numberfield',
                    name: 'id_total_number_of_applicant',
                    allowBlank: false,
                    width:200,
                    emptyText: '1-6',
                    minValue: 1,
                    maxValue: 6,
                    value: 1,  // Set the default value here  
                    listeners: {
                        change: function (field, newValue, oldValue) {
                            // Remove any decimal point if it exists
                            field.setValue(parseInt(newValue, 10));
                        }
                    }
                },

                {
                    xtype:'displayfield',
                    value:'*** If multiple applicant exist'
                }

            ],
        },

        // personal information
        {
            xtype: 'fieldset',
            title: 'Personal Information',
            defaults: {
                anchor: '100%',
            },
            layout:'vbox',

            items: [

                {
                    xtype:'textfield',
                    fieldLabel: 'Full Name <span class="x-form-required-field"></span>',
                    name: 'tx_full_name',
                    allowBlank: false,
                    regex: /^[A-Za-z\s.]+$/, // Regular expression to allow only letters and spaces
                    regexText: 'Invalid characters. Please use only letters, numbers, and spaces.', // Error message for invalid input
                    width:innerWidth/3
                },

                {
                    xtype:'datefield',
                    fieldLabel: 'Date of Birth <span class="x-form-required-field"></span>',
                    name: 'dt_date_of_birth',
                    allowBlank: false,
                    width:innerWidth/6,
                    format: 'Y-m-d', // Use the desired date format
                    submitFormat: 'Y-m-d', // Format sent to the server
                    // Set the maxValue to the current date to restrict future dates
                    maxValue: validDate, // This restricts dates to today or earlier
                },

                {
                    xtype: 'combobox',
                    fieldLabel: 'Nationality<span class="x-form-required-field"></span>', // Label for the dropdown
                    name: 'tx_nationality', // Field name 
                    allowBlank: false,
                    width:innerWidth/6,
                    id:'nationalityCombo',

                    store: {
                        // Manually specify the data
                        fields: ['id', 'type'],
                        data: [
                            { id: 1, type: 'Bangladeshi' },
                            { id: 2, type: 'Others' },
                        ]
                    },

                    queryMode: 'local', // Use 'local' mode for local data
                    displayField: 'type', // Field to display in the dropdown
                    valueField: 'id', // Field representing the selected value
                    forceSelection: true, // Require a valid selection
                    editable: false, // Prevent manual input
                    emptyText: 'select', // Placeholder text
                    
                },

                {
                    xtype: 'numberfield',
                    fieldLabel: 'NID <span class="x-form-required-field"></span>',
                    name: 'id_nid',
                    allowBlank: false,
                    width:innerWidth/3,
                    maskRe: /^[0-9]*$/, // Regular expression to allow only digits
                    listeners: {
                        change: function (field, newValue, oldValue) {
                            // Remove any decimal point if it exists
                            field.setValue(parseInt(newValue, 10));
                        }
                    }
                    
                },

                {
                    xtype: 'textfield',
                    fieldLabel: 'Present Address (Thana & District name) <span class="x-form-required-field"></span>',
                    name: 'tx_present_address',
                    allowBlank: false,
                    regex: /^[A-Za-z0-9\s]+$/, // Regular expression to allow only letters, numbers, and spaces
                    regexText: 'Invalid characters. Please use only letters, numbers, and spaces.', // Error message for invalid input
                    width:innerWidth/3,
                },

                {
                    xtype: 'combobox',
                    fieldLabel: 'Occupation<span class="x-form-required-field"></span>', 
                    name: 'tx_proffession', // Field name 
                    allowBlank: false,
                    width:innerWidth/6,
                    id:'occupationCombo',

                    store: {
                        // Manually specify the data
                        fields: ['id', 'type'],
                        data: [
                            { id: 1, type: 'Service holder' },
                            { id: 2, type: 'Business man' },
                            { id: 3, type: 'Others' },
                            // Add more data as needed
                        ]
                    },

                    queryMode: 'local', // Use 'local' mode for local data
                    displayField: 'type', // Field to display in the dropdown
                    valueField: 'id', // Field representing the selected value
                    forceSelection: true, // Require a valid selection
                    editable: false, // Prevent manual input
                    emptyText: 'select', // Placeholder text
                    
                },

                {
                    xtype: 'textfield',
                    fieldLabel: 'Name of The Organization',
                    name: 'tx_name_of_the_organization',
                    width:innerWidth/3,
                    validator: function (value) {
                        // Use a regular expression to check if the first character is not a special character
                        if (/^[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(value)) {
                            return 'Cannot start with a special character.';
                        }
                        return true;
                    }
                },

                {
                    xtype: 'numberfield',
                    fieldLabel: 'Monthly Income <span class="x-form-required-field"></span>',
                    name: 'id_monthly_income',
                    allowBlank: false,
                    width:innerWidth/4,
                    
                    
                },

                {
                    xtype: 'textfield',
                    fieldLabel: 'Email',
                    name: 'tx_email',
                    vtype: 'email',
                    width:innerWidth/3
                    
                },

                {
                    xtype: 'textfield',
                    fieldLabel: 'Phone Number <span class="x-form-required-field"></span>',
                    name: 'tx_mobile_number',
                    allowBlank: false,
                    width:innerWidth/3,
                    maskRe: /^[0-9]$/, // Regular expression to allow only single digits (0-9)
                    validator: function(value) {
                        if (/^[0-9]{11}$/.test(value)) {
                            return true; // The input is valid
                        } else {
                            return 'The number must be exactly 11 digits long.';
                        }
                    }
                },
            ],
        },

        
    ],

    buttons: [
        {
            text: 'Submit',
            handler: 'onSubmitClick', // Handle form submission
        },
        {
            text: 'Reset',
            handler: 'onResetClick', // Handle form reset
        },
    ],

    
});
