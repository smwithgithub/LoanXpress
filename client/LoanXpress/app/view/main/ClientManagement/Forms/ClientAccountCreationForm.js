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

Ext.define('XYZ_Bank_Management.view.main.ClientManagement.Forms.ClientAccountCreationForm', {
    extend: 'Ext.form.Panel',
    xtype: 'clientaccountcreationform',

    title: 'Create Your Account in XYZ Bank',

    requires: [
        'XYZ_Bank_Management.store.ClientManagement.AccountTypeStore'
    ],

    cls:'bankaccountform',

    controller:'clientformcontroller',

    bodyStyle:{

        bodyPadding:10,

    },

    items: [

        // account type selection=================
        {
            xtype: 'fieldset',
            title: 'Account Selection',
            defaults: {
                // xtype: 'textfield',
                anchor: '100%',
                allowBlank: false,
            },
            layout:'hbox',
            items: [
                {
                    xtype: 'combobox',
                    fieldLabel: 'AccountType<span class="x-form-required-field"></span>', // Label for the dropdown
                    name: 'tx_account_type', // Field name (used when submitting the form)
                    width:innerWidth*0.2,
                    margin:'0 0 10 0',
                    id:'accountTypeCombo',

                    store: {
                        type: 'accounttypestore' // Reference to the store alias
                    },
                    
                    queryMode: 'remote', // Use 'remote' mode for remote data loading
                    displayField: 'tx_account_type', // Field to display in the dropdown
                    valueField: 'id_account_type_code', // Field representing the selected value
                    forceSelection: true, // Require a valid selection
                    editable: false, // Prevent manual input
                    emptyText: 'select', // Placeholder text
                    
                },
            ],
        },

        // personal information====================
        {
            xtype: 'fieldset',
            title: 'Personal Information',
            defaults: {
                // xtype: 'textfield',
                anchor: '100%',
                
            },
            layout:'column',
            

            items: [

                {
                    xtype: 'textfield',
                    fieldLabel: 'First Name<span class="x-form-required-field"></span>',
                    name: 'tx_first_name',
                    allowBlank: false,
                    columnWidth:0.5,
                    regex: /^[A-Za-z\s.]+$/, // Regular expression to allow only letters and spaces
                    regexText: 'Invalid characters. Please use only letters, numbers, and spaces.', // Error message for invalid input
                    margin:'0 20 0 0'
                    
                },

                {
                    xtype: 'textfield',
                    fieldLabel: 'Last Name<span class="x-form-required-field"></span>',
                    name: 'tx_last_name',
                    allowBlank: false,
                    columnWidth:0.5,
                    regex: /^[A-Za-z\s.]+$/, // Regular expression to allow only letters and spaces
                    regexText: 'Invalid characters. Please use only letters, numbers, and spaces.', // Error message for invalid input
                    margin:'0 0 0 10'
                    
                },

                {
                    xtype: 'textfield',
                    fieldLabel: 'Father Name<span class="x-form-required-field"></span>',
                    name: 'tx_father_name',
                    allowBlank: false,
                    columnWidth:0.5,
                    regex: /^[A-Za-z\s.]+$/, // Regular expression to allow only letters and spaces
                    regexText: 'Invalid characters. Please use only letters, numbers, and spaces.', // Error message for invalid input
                    margin:'10 20 0 0'
                    
                },

                {
                    xtype: 'textfield',
                    fieldLabel: 'Mother Name<span class="x-form-required-field"></span>',
                    name: 'tx_mother_name',
                    allowBlank: false,
                    columnWidth:0.5,
                    regex: /^[A-Za-z\s.]+$/, // Regular expression to allow only letters and spaces
                    regexText: 'Invalid characters. Please use only letters, numbers, and spaces.', // Error message for invalid input
                    margin:'10 0 0 10'
                    
                },

                {
                    xtype: 'numberfield',
                    fieldLabel: 'NID<span class="x-form-required-field"></span>',
                    name: 'id_nid',
                    allowBlank: false,
                    columnWidth:0.5,
                    maskRe: /^[0-9]*$/, // Regular expression to allow only digits
                    listeners: {
                        change: function (field, newValue, oldValue) {
                            // Remove any decimal point if it exists
                            field.setValue(parseInt(newValue, 10));
                        }
                    },
                    margin:'10 20 0 0'
                    
                },

                {
                    xtype: 'datefield',
                    fieldLabel: 'Date Of Birth<span class="x-form-required-field"></span>',
                    name: 'dt_date_of_birth',
                    allowBlank: false,
                    format: 'Y-m-d', // Use the desired date format
                    submitFormat: 'Y-m-d', // Format sent to the server
                    columnWidth:0.5,
                    margin:'10 0 0 10',
                    // Set the maxValue to the current date to restrict future dates
                    maxValue: validDate, // This restricts dates to today or earlier
                    
                },

                {
                    xtype: 'combobox',
                    fieldLabel: 'Occupation<span class="x-form-required-field"></span>', // Label for the dropdown
                    name: 'tx_occupation', // Field name (used when submitting the form)
                    allowBlank: false,
                    margin:'15 0 0 0',
                    columnWidth:0.2,

                    store: {
                        // Manually specify the data
                        fields: ['id', 'type'],
                        data: [
                            { id: 1, type: 'Service holder' },
                            { id: 2, type: 'Business man' },
                            { id: 3, type: 'Others' },
                            
                        ]
                    },
                    
                    queryMode: 'local', // Use 'local' mode for local data
                    displayField: 'type', // Field to display in the dropdown
                    valueField: 'type', // Field representing the selected value
                    forceSelection: true, // Require a valid selection
                    editable: false, // Prevent manual input
                    emptyText: 'select', // Placeholder text
                    
                },


                {
                    xtype: 'textfield',
                    fieldLabel: 'Present Address',
                    name: 'tx_present_address',
                    columnWidth:0.8,
                    regex: /^[A-Za-z0-9\s]+$/, // Regular expression to allow only letters, numbers, and spaces
                    regexText: 'Invalid characters. Please use only letters, numbers, and spaces.', // Error message for invalid input
                    margin:'15 0 0 380'
                    
                },

                {
                    xtype: 'textfield',
                    fieldLabel: 'Permanent Address',
                    name: 'tx_permanent_address',
                    columnWidth:1,
                    regex: /^[A-Za-z0-9\s]+$/, // Regular expression to allow only letters, numbers, and spaces
                    regexText: 'Invalid characters. Please use only letters, numbers, and spaces.', // Error message for invalid input
                    margin:'10 0 0 0'
                    
                },

                {
                    xtype: 'combobox',
                    fieldLabel: 'Nationality<span class="x-form-required-field"></span>', // Label for the dropdown
                    name: 'tx_nationality', // Field name (used when submitting the form)
                    // store: 'Countries', // Reference to the store you defined
                    allowBlank: false,
                    margin:'20 20 0 0',
                    columnWidth:0.5,

                    store: {
                        // Manually specify the data
                        fields: ['id', 'type'],
                        data: [
                            { id: 1, type: 'Bangladeshi' },
                            { id: 2, type: 'Others' },
                        ]
                    },
                    // queryMode: 'remote', // Use 'remote' mode for remote data loading
                    queryMode: 'local', // Use 'local' mode for local data
                    displayField: 'type', // Field to display in the dropdown
                    valueField: 'type', // Field representing the selected value
                    forceSelection: true, // Require a valid selection
                    editable: false, // Prevent manual input
                    emptyText: 'select', // Placeholder text
                    listeners: {
                        // Optional event listeners, e.g., for handling selection changes
                    }
                },

                {
                    xtype: 'textfield',
                    fieldLabel: 'District<span class="x-form-required-field"></span>',
                    name: 'tx_district',
                    allowBlank: false,
                    columnWidth:0.5,
                    regex: /^[A-Za-z\s]+$/, // Regular expression to allow only letters and spaces
                    regexText: 'Invalid characters. Please use only letters, numbers, and spaces.', // Error message for invalid input
                    margin:'20 20 0 0'
                    
                },

                {
                    xtype: 'textfield',
                    fieldLabel: 'Email',
                    name: 'tx_email',
                    vtype: 'email',
                    columnWidth:0.5,
                    margin:'20 20 0 0'
                },
                
                {
                    xtype: 'textfield',
                    fieldLabel: 'Phone Number<span class="x-form-required-field"></span>',
                    name: 'tx_mobile_number',
                    allowBlank: false,
                    columnWidth:0.5,
                    margin:'15 0 0 0',
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

        // Income Details
        {
            xtype: 'fieldset',
            title: 'Income',
            defaults: {
                // xtype: 'textfield',
                anchor: '100%',
                
            },
            layout:'column',
            items: [

                {
                    xtype: 'textfield',
                    fieldLabel: 'Monthly Income',
                    name: 'id_monthly_income',
                    columnWidth:0.2,
                    
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
