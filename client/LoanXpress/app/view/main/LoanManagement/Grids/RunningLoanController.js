/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 * 
 * @author  S.M.Shamim
 */
Ext.define('XYZ_Bank_Management.view.main.LoanManagement.Grids.RunningLoanController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.runningloancontroller',

    // opening student's full info grid and make editable
    OnItemContextMenu: function(view, record, item, index, e) {
        e.stopEvent(); // Prevent the browser's default context menu

        var loanCode = record.get('id_loan_code');
        var loanAmount = record.get('id_approved_amount');
        var recoveredAmount = record.get('id_recovered_amount');

        var loanViewStore = Ext.getCmp('runningloan').getStore();

        var contextMenu = Ext.create('Ext.menu.Menu', {
            items: [
                {

                text: 'Pay Installment',
                handler: function() {
                    // Handle the button click in the context menu
                    var existingDetailsWindow= Ext.getCmp('loaninstallment');
                    if(!existingDetailsWindow){

                        // create an window to get input data
                        var installmentWindow = Ext.create('Ext.window.Window', {
                            title: 'Loan Installment',
                            width: innerWidth*0.6,
                            height: innerHeight*0.6,
                            id:'loaninstallment',
                            controller: 'runningloancontroller',
                            scrollable: true,
                            maximizable: true, 
                            closable: true,
                            alwaysOnTop: true,
                            layout:'fit',
                            items:[

                                {
                                    xtype:'grid',
                                    id:'loanInstallmentGrid',

                                    store: {
                                        
                                        fields: [
                                            'id_loan_code','id_installment_no', 'tx_full_name','id_account_number', 'id_required_amount',
                                            'dt_installment_date','id_installment_amount','tx_pay_status'
                                        ],
                                        proxy: {
                                            type: 'ajax',
                                            api: {
                                              
                                              read: 'http://localhost:9090/xyz_bank_management/getall/installment/for/'+loanCode,  // api's url to get all customers
                                              
                                            },
                                    
                                            actionMethods: {
                                              read: 'GET',       // Use GET for read operation
                                          },
                                    
                                            reader: {
                                              type: 'json',
                                              rootProperty: 'data'
                                            },
                                            writer: {
                                              type: 'json',
                                              writeAllFields: true
                                            }
                                          },
                                          autoLoad: true
                                    },

                                    columns: [
                                        { text: 'Install No',  dataIndex: 'id_installment_no',flex:1, align: 'center' },
                                        { text: 'Debtor Name', dataIndex: 'tx_full_name', flex: 1, align: 'center' },
                                        { text: 'Account Number', dataIndex: 'id_account_number', flex: 1, align: 'center' },
                                        { text: 'Required Amount', dataIndex: 'id_required_amount', flex: 1, align: 'center' },
                                        { text: 'Install Date', dataIndex: 'dt_installment_date', flex: 1, align: 'center' },
                                        { text: 'Install Amount', dataIndex: 'id_installment_amount', flex: 1, align: 'center' },
                                        { text: 'Pay Status', dataIndex: 'tx_pay_status', flex: 1, align: 'center' },
                                        {
                                            xtype: 'actioncolumn',
                                            text: 'Actions',
                                            width: 100,
                                            align: 'center',
                                            flex:1,
                                            
                                            items: [
                                                {
                                                    iconCls: 'x-fa fa-credit-card',  // Icon for the "Approve" action
                                                    tooltip: 'Pay',
                                                    handler: function(grid, rowIndex){
                                                        var store = grid.getStore();
                                                        var record = store.getAt(rowIndex);

                                                        var installNo = record.get('id_installment_no');

                                                        var requiredAmount = record.get('id_required_amount');

                                                        var oldInstallAmount = record.get('id_installment_amount');

                                                        var paymentform = Ext.create('Ext.window.Window', {
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
                                                                            title: 'Payment',
                                                                            items: [
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    fieldLabel: 'Amount <span class="x-form-required-field"></span>',
                                                                                    name: 'install_amount',
                                                                                    value:requiredAmount,
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
                                                                                var values = form.getValues();

                                                                                var installAmount = parseInt(values.install_amount);

                                                                                var currentDate = new Date();
                                                                                var installDate = Ext.Date.format(currentDate, 'Y-m-d');

                                                                                var newRcoveredAmount = recoveredAmount+installAmount;

                                                                                var newInstallAmount = oldInstallAmount+installAmount;

                                                                                var dueAmount = loanAmount-newRcoveredAmount;

                                                                                var requestOptions = {
                                                                                  method: 'PUT',
                                                                                  redirect: 'follow'
                                                                                };
                                                                                
                                                                                fetch("http://localhost:9090/xyz_bank_management/pay/installment/"+loanCode+"/"+installNo+"/"+
                                                                                newInstallAmount+"/"+installDate+"/"+dueAmount+"/"+newRcoveredAmount, requestOptions)
                                                                                .then(response => {
                                                                                    if (!response.ok) {
                                                                                        // If the response is not OK, show an error toast
                                                                                        Ext.toast('Payment failed (Network issue)!', 'Error');
                                                                                        throw new Error('Network response was not ok');
                                                                                    }
                                                                                    return response.text();
                                                                                })
                                                                                .then(result => {
                                                                                    // the success case handling
                                                                                    store.load();
                                                                                    loanViewStore.load(); 
                                                                                    paymentform.close();
                                                                                    Ext.toast('Payment successful!', 'Success');
                                                                                })
                                                                                .catch(error => console.log('error', error));
                                                                            },
                                                                        },
                                                                        {
                                                                            text: 'Cancel',
                                                                            handler: function () {
                                                                                paymentform.close();
                                                                            },
                                                                        },
                                                                    ],
                                                
                                                                },
                                                            ],
                                                        });
                                                
                                                        paymentform.show();
                                                    }
                                                },
                                                
                                            ]
                                        }
                                    ],

                                    dockedItems: [

                                        // top bar
                                        {
                                            xtype: 'toolbar',
                                            dock: 'top', 
                                            style: {
                                                backgroundColor: '#E9E4D4', // set your desired background color
                                            },
                                
                                            items: [
                                
                                                {
                                                    xtype: 'button',
                                                    height: 32,
                                                    width: 35,
                                                    html: '<div style="display: flex; justify-content: center; align-items: center;"><img src="resources/images/reload.png" height="20px" width="20px"></div>',
                                                    style: {
                                                        backgroundColor: 'transparent',
                                                        border: 'none',
                                                    },
                                                    handler: 'onInstallReload'
                                                },
                                
                                                // search bar
                                                {
                                                    xtype: 'textfield',
                                                    emptyText: 'installment number...',
                                                    margin:'0 0 0 15',
                                                    fieldStyle: 'background-color: #ededed;',
                                                    enableKeyEvents: true,
                                                    width: 200,
                                                    triggers: {
                                                        search: {
                                                            cls: 'x-form-search-trigger custom-search-trigger', // Apply a CSS class to the search trigger icon
                                                        },
                                                    },
                                
                                                    // search with pressing enter
                                                    listeners:{
                                                        keyup: 'onInstallSearch'
                                                    }
                                                    
                                                },
                                
                                                
                                            ],
                                
                                        },

                                        
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
                                                    text: 'Download CSV',
                                                    handler: 'downloadgridtocsvclick'
                                                    
                                                    // function () {
                                                    //     var grid = this.up('grid');
                                                    //     downloadCSVFromGrid(grid);
                                                    // }
                                                }
                                
                                                
                                            ],
                                
                                        },
                                
                                
                                    ],

                                }
                                
                            ],

                            
                            listeners: {
                                // leave the toolbar height and maximize the window
                                maximize: function(window) {
                                    var desktopView = Ext.getCmp('desktopView');
                                    var bbarHeight = desktopView.query('toolbar[dock="bottom"]')[0].getHeight();
                                    var windowHeight = window.getHeight();
                                    window.setHeight(windowHeight-bbarHeight);
                                    
                                },
                            }
                        });
                        installmentWindow.show();
                    }else{
                        existingDetailsWindow.close();
                    }
                }

                }
        
            ]
        });

        // 'e' is event object that holds mouse enevt
        contextMenu.showAt(e.getXY()); // Show the context menu at the mouse cursors X and Y coordinates position
    },


    /**
     * @author  Abu Nasim
     * this author created downloadgridtocsvclick function to download a grid info to pdf
     */
    downloadgridtocsvclick: function() {
        var grid = Ext.getCmp('loanInstallmentGrid');
        var store = grid.getStore();
        var data = [];
    
        // Push headers to the CSV data
        var headers = [];
        grid.columns.forEach(function (column) {
            headers.push(column.text);
        });
        data.push(headers.join(','));
    
        // Push row data to the CSV data
        store.each(function (record) {
            var row = [];
            grid.columns.forEach(function (column) {
                var dataIndex = column.dataIndex;
                row.push('"' + (record.get(dataIndex) || '') + '"'); // Wrap data in double quotes
            });
            data.push(row.join(','));
        });
    
        // Create a Blob containing the CSV data
        var csvContent = data.join('\n');
        var blob = new Blob([csvContent], { type: 'text/csv' });
    
        // Create a download link and trigger the download
        var downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = 'teacher_data.csv';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
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

    // reload installment information
    onInstallReload: function () {
        var grid = Ext.getCmp('loanInstallmentGrid');
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


    // search in installment
    onInstallSearch: function (textfield, e) {
        var value = textfield.getValue().toLowerCase(); // Get the text entered in the field and convert it to lowercase
        var grid = Ext.getCmp('loanInstallmentGrid');
        var store = grid.getStore();
    
        // Clear any previous filters
        store.clearFilter();
    
        if (value) {
            store.filterBy(function (record) {
                
                var installNumber = record.get('id_installment_no').toString();
    
                return installNumber.includes(value);
            });
        }
    },
    
    
});
