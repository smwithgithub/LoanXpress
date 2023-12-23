Ext.define('SMDESKTOP.view.main.Login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',

   
    onLogin: function() {

        var form = Ext.getCmp('loginform');
        var values = form.getValues();


        if (form.isValid()) {

            var username = values.user_name;
            var password = values.password;

            var requestOptions = {
            method: 'GET',
            redirect: 'follow'
            };

            fetch("http://localhost:9090/xyz_bank_management/authenticate/user/"+username+"/"+password, requestOptions)
            .then(response => {
                if (!response.ok) {
                    // If the response is not OK, show an error toast
                    Ext.toast('Network response was not ok', 'Error');
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(result => {
                
                if(result==='true'){

                    this.getView().destroy();

                    const application = XYZ_Bank_Management.getApplication();
                    application.setMainView('XYZ_Bank_Management.view.main.Desktop.DesktopView')


                }else{
                    
                    Ext.toast('Invalid username & password', 'Error');
                }

            })
            .catch(error => console.log('error', error));

            
        }

        else {
            Ext.toast('Please enter your username & password', 'Error');
        }

    },


});