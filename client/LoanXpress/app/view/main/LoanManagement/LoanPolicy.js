/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 * 
 * @author  S.M.Shamim
 */
Ext.define('XYZ_Bank_Management.view.main.LoanManagement.LoanPolicy', {
    extend: 'Ext.panel.Panel',
    xtype: 'loanpolicyview',

    controller:'loanpolicy',

    bodyStyle:{
        'background-color':'transparent',
            
        },

    
// the policy's for all types loan
    items: [

        // ===========================================home loan policys==========================================================
        {
            xtype: 'form',
            id:'homeLoanForm',

            layout: {
                type: 'vbox',
            },

            bodyPadding:15,
            
            items: [

                // details
                {
                    xtype: 'displayfield',
                    value: '<h1>Bank loan policy:</h1>' +

                        '<div style="margin-top: 40px;">' +
                          '<p><strong style="font-size: 16px; margin-top: 10px;">⬛ Loan Type (Home):</strong></p>' +
                          '<p style="font-size: 16px; line-height: 1.5;">&emsp;Make your dream home a reality with easy home loans from our Bank. Our wide range of options is designed to cater to your every home financing need,<br>&emsp;be it purchasing a new flat, constructing a house or renovating your existing home. Allow us to be the finance partner of one of the biggest investments of your<br>&emsp;lifetime and give you a delightful experience of banking.</p>' +
                        '</div>' +

                        '<div style="margin-top: 10px;">' +
                          '<p><strong style="font-size: 16px;">◆ Features:</strong></p>' +

                          '<ul style="font-size: 14px; line-height: 1.5;">' +
                          '<li>Loan amount ranging from BDT 5 lac to BDT 200 lac</li>' +
                          '<li>Repayment tenure 1 year to 25 years</li>' +
                          '<li>Financing up to 70% of property value</li>' +
                          '<li>Semi-pucca financing facility</li>' +
                          '<li>Financing to Non-Resident Bangladeshi (NRB)</li>' +
                          '<li>Home loan with overdraft (OD) facility</li>' +
                          '<li>No hidden cost</li>' +
                          '<li>Early settlement facility</li>' +
                          '<li>Loan across the country</li>' +
                          '</ul>' +
                        '</div>' +

                        '<div style="margin-top: 30px;">' +
                          '<p><strong style="font-size: 16px;">◆ Eligibility:</strong></p>' +
                          '<p style="font-size: 16px; line-height: 1.5;">&emsp;Age: 22 to years to 55 years. Experience: At least 3 years of Experience in respective field.</p>' +
                        '</div>' +

                        '<div style="margin-top: 30px;">' +
                          '<p><strong style="font-size: 16px;">◆ Requirement Documents::</strong></p>' +
                          '<ul style="font-size: 14px; line-height: 1.5;">' +
                          '<li>Photocopy of NID/Smart card</li>' +
                          '<li>3 copies of Passport size lab print photograph</li>' +
                          '<li>Business card/Office ID copy</li>' +
                          '<li>Latest E-TIN certificate or tax-payment slip</li>' +
                          '<li>Latest utility bill Copy</li>' +
                          '<li>Recent 02 passport size lab print photograph, NID, Office ID, Business Card etc. of Guarantor (if any)</li>' +
                          '<li>Sanction letter and repayment statement of existing loans (if any)</li>' +
                          '</ul>' +
                        '</div>' +

                        '<div style="margin-top: 30px;">' +
                          '<p><strong style="font-size: 16px;">◆ Income Criteria:</strong></p>' +

                          '<ul style="font-size: 14px; line-height: 1.5;">' +
                          '<li>BDT 50,000 and above</li>' +
                          '<li>BDT 30,000 (Government officials only).</li>' +
                          '</ul>' +
                        '</div>' ,

                        margin: '20 0', // Optional margin for spacing

                },
                

                // emi calculator 
                {
                    xtype: 'fieldset',
                    title: '◆ Calculate Your EMI:- ',
                    defaults: {
                        anchor: '100%',
                    },
        
                    layout:'vbox',
        
                    items: [
        
                        // Loan amount==========
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Loan Amount<span class="x-form-required-field"></span>',
                            name: 'loan_amount',
                            margin:'5 0 0 0',
                            allowBlank: false,
                            width:250,
                           
                            
                        },


                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Loan Tenor(month)<span class="x-form-required-field"></span>',
                            name: 'tenore_month',
                            allowBlank: false,
                            value: 12,  // Set the default value here  
                            width:250,
                          
                            listeners: {
                                change: function (field, newValue, oldValue) {
                                    // Remove any decimal point if it exists
                                    field.setValue(parseInt(newValue, 10));
                                }
                            }
                            
                        },

                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Interest Rate',
                            name: 'interest_rate',
                            allowBlank: false,
                            value: 7.2,  // Set the default value here  
                            width:250,
                       
                            readOnly: true, // Set this to make it read-only
                            
                        },

                        {
                            xtype:'displayfield',
                            name:'showEmiAndAmount',
                 
                        },

                        {
                            xtype:'button',
                            text: 'Calculate',
                            handler: 'onHomeCalculate',

                        },
        
                    ],
                },

            ],

            dockedItems: [

                // bottom bar
                {
                    xtype: 'toolbar',
                    dock: 'bottom', 
                    style: {
                        backgroundColor: '#E9E4D4', // set your desired background color
                    },
        
                    items: [
        
                        '->',
                        // download to csv file
                        {
                            text: 'Download(pdf)',
                            // handler: 'onHomePdf'
                            
                        }
        
                        
                    ],
        
                },
        
        
            ],
        },

        // ===========================================Business Loan policys=====================================================
        {
            xtype: 'form',
            id:'businessLoanForm',

            layout: {
                type: 'vbox',
            },

            bodyPadding:15,
            
            items: [

                // details
                {
                    xtype: 'displayfield',
                    value: '<div>' +
                          '<p><strong style="font-size: 16px; margin-top: 10px;">⬛ Loan Type(Business):</strong></p>' +
                          '<p style="font-size: 16px; line-height: 1.5;">&emsp;Available for small sized businesses operating in trading, manufacturing, services, non-farm activity, agriculture and agro-based industries, City SME Small Loan<br>&emsp;offers flexibility and convenience to help you grow your business for we are here.</p>' +
                        '</div>' +

                        '<div style="margin-top: 10px;">' +
                          '<p><strong style="font-size: 16px;">◆ Features:</strong></p>' +

                          '<ul style="font-size: 14px; line-height: 1.5;">' +
                          '<li>BDT 3, 00,000 to 25, 00,000 for (Unsecured loans)</li>' +
                          '<li>BDT 10, 00,000 to 100, 00,000 for (Secured loans)</li>' +
                          '<li>Term Loan: 12 to 72 months (Unsecured Loan 12 to 36 months)</li>' +
                          '<li>OD: To be renewed annually</li>' +
                          '<li>Single Installment Loan: 3 to 9 months</li>' +
                          '<li>Quick approval process</li>' +
                          '</ul>' +

                        '</div>' +

                        '<div style="margin-top: 30px;">' +
                          '<p><strong style="font-size: 16px;">◆ Processing Fee::</strong></p>' +
                          '<p style="font-size: 16px; line-height: 1.5;">&emsp;(No Processing fee need so far) (Actually Depends on Bank policy)</p>' +
                        '</div>' +

                        '<div style="margin-top: 30px;">' +
                          '<p><strong style="font-size: 16px;">◆ Eligibility:</strong></p>' +
                          '<ul style="font-size: 14px; line-height: 1.5;">' +
                          '<li>Legal form of business</li>' +
                          '<li>Proprietorship concerns</li>' +
                          '<li>Partnership Firms</li>' +
                          '<li>Private Limited</li>' +
                          '<li>Business Experience minimum 3 years</li>' +
                          '<li>Age of the owner: 23 to 65 years</li>' +
                          '<li>Secured Loan is offered against the registered mortgage of property (land, building and flat)</li>' +
                          '</ul>' +
                        '</div>' +

                        '<div style="margin-top: 30px;">' +
                          '<p><strong style="font-size: 16px;">◆ Requirement Documents:</strong></p>' +

                          '<ul style="font-size: 14px; line-height: 1.5;">' +
                          '<li>Valid Trade License</li>' +
                          '<li>Trade License of last 3 years</li>' +
                          '<li>Latest 12 months bank statement</li>' +
                          '<li>Valid photo id of Business Owners</li>' +
                          '<li>Photograph of Business owners</li>' +
                          '<li>Utility Bill of residence & business address</li>' +
                          '<li>e-TIN certificate</li>' +
                          '<li>Sanction letter of all other loans (if any)</li>' +
                          '<li>Board/Partnership Resolution</li>' +
                          '<li>Registered Partnership deed (for partnership firm)</li>' +
                          '<li>Certificate of incorporation, schedule X and form XII for limited liability company</li>' +
                          '<li>Memorandum & Article of Association for limited liability company</li>' +

                          '</ul>' +
                        '</div>' ,

                        margin: '20 0', // Optional margin for spacing

                },
                

                // emi calculator 
                {
                    xtype: 'fieldset',
                    title: '◆ Calculate Your EMI:- ',
                    defaults: {
                        anchor: '100%',
                    },
        
                    layout:'vbox',
        
                    items: [
        
                        // Loan amount==========
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Loan Amount<span class="x-form-required-field"></span>',
                            name: 'loan_amount',
                            margin:'5 0 0 0',
                            allowBlank: false,
                            width:250,
                            
                        },


                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Loan Tenor(month)<span class="x-form-required-field"></span>',
                            name: 'tenore_month',
                            allowBlank: false,
                            value: 12,  // Set the default value here  
                            width:250,

                            listeners: {
                                change: function (field, newValue, oldValue) {
                                    // Remove any decimal point if it exists
                                    field.setValue(parseInt(newValue, 10));
                                }
                            }
                            
                        },

                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Interest Rate',
                            name: 'interest_rate',
                            allowBlank: false,
                            value: 10,  // Set the default value here  
                            width:250,
                            readOnly: true, // Set this to make it read-only
                            
                        },

                        {
                            xtype:'displayfield',
                            name:'showEmiAndAmount',
                        },

                        {
                            xtype:'button',
                            text: 'Calculate',
                            handler: 'onBusinessCalculate',

                        },
        
                    ],
                },

            ],

            dockedItems: [

                // bottom bar
                {
                    xtype: 'toolbar',
                    dock: 'bottom', 
                    style: {
                        backgroundColor: '#E9E4D4', // set your desired background color
                    },
        
                    items: [
        
                        '->',
                        // download to csv file
                        {
                            text: 'Download(pdf)',
                            // handler: 'onBusinessPdf'
                            
                        }
        
                        
                    ],
        
                },
        
        
            ],
        },
        

    ],

});
