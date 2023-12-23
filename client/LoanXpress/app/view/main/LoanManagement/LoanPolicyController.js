/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 * 
 * @author  S.M.Shamim
 */
Ext.define('XYZ_Bank_Management.view.main.LoanManagement.LoanPolicyController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.loanpolicy',

    

    // function to download detailes about business loan
    onBusinessCalculate:function(){
        this.onCalculate('businessLoanForm')
    },


    // function to download detailes about home loan
    onHomeCalculate:function(){
        this.onCalculate('homeLoanForm')
    },



    // default calculation function
    onCalculate:function(formId){
        var form = Ext.getCmp(formId);

        var values = form.getValues();

        if(form.isValid()){
            var amount = values.loan_amount;
            var tenoreMonth = values.tenore_month;
            var rate = values.interest_rate;

            var interestRate = rate/(100*12);

            var multiplyRate = Math.pow(1+interestRate, tenoreMonth);
            var divisionRate = Math.pow(1+interestRate,tenoreMonth-1);

            var emi = (amount*interestRate*multiplyRate)/divisionRate;
            emi = emi.toFixed(2); // Format the result to display 2 decimal places

            var amountPerMonth = parseInt((amount/tenoreMonth)+emi);

            // Create a string with line breaks
            var displayText = '<span style="font-size: 16px; font-weight: bold; line-height: 1.5;">EMI: ' + emi + '</span><br><span style="font-size: 16px; font-weight: bold; line-height: 1.5;">Amount Per Month: ' + amountPerMonth + '</span>';
            
            // Set the created string as the value of the display field
            form.down('displayfield[name=showEmiAndAmount]').setValue(displayText);

        }

    },


    // onHomePdf: function () {

    //     Ext.Loader.loadScript({

    //         url: 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js',

    //         onLoad: function () {
                
    //             // Get the form element by its ID
    //             var formElement = Ext.getCmp('homeLoanForm').getEl().dom;
            
    //             // Create a new jsPDF instance
    //             var pdf = new jsPDF();
            
    //             // Define the function to add HTML content as a PDF page
    //             var addHtml = function () {
    //                 pdf.html(formElement, {
    //                     callback: function () {
    //                         // Save the PDF with a unique filename (e.g., using a timestamp)
    //                         var filename = 'home_loan_policy.pdf';
    //                         pdf.save(filename);
    //                     }
    //                 });
    //             };
            
    //             // Add the HTML content to the PDF
    //             addHtml();

    //         }
    //     });
        
        
    // },



    
});
