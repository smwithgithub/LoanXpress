Ext.define('XYZ_Bank_Management.view.main.ClientManagement.Grids.RunningClientsController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.runningclientscontroller',

    
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
                var firstName = record.get('tx_first_name').toLowerCase();
                var lastName = record.get('tx_last_name').toLowerCase();
                var clientAccountNumber = record.get('id_account_number').toString();
    
                return firstName.includes(value) || lastName.includes(value) || clientAccountNumber.includes(value);
            });
        }
    },




});
