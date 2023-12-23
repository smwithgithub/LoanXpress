/** 
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 * 
 * @author  S.M.Shamim
 */
Ext.application({
    extend: 'XYZ_Bank_Management.Application',

    name: 'XYZ_Bank_Management',

    requires: [
        // This will automatically load all classes in the XYZ_Bank_Management namespace
        // so that application classes do not need to require each other.
        'XYZ_Bank_Management.*'
    ],

    // The name of the initial view to create.
    mainView: 'XYZ_Bank_Management.view.main.Login.LoginView'
});

// XYZ_Bank_Management.view.main.Desktop.DesktopView
// XYZ_Bank_Management.view.main.LoanManagement.LoanView
// XYZ_Bank_Management.view.main.Login.LoginView
// XYZ_Bank_Management.view.main.ClientManagement.Forms.ClientAccountCreationForm


