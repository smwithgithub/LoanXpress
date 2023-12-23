package com.codewithsm.xyz_bank_api.controller;

import com.codewithsm.xyz_bank_api.model.BankAccountType;
import com.codewithsm.xyz_bank_api.model.Customer;
import com.codewithsm.xyz_bank_api.model.LoanDetails;
import com.codewithsm.xyz_bank_api.model.LoanVariation;
import com.codewithsm.xyz_bank_api.service.CustomerService;
import com.codewithsm.xyz_bank_api.service.LoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

/**
 * This is the controller class for XYZ_Bank_Management
 *
 * @author (S.M.Shamim)
 *
 */

@RestController
@RequestMapping("/xyz_bank_management")
@CrossOrigin(origins = "http://localhost:1841/")
public class Controller {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private LoanService loanService;

//    ================================================client management controlling===================================


//    find all customers=======
    @GetMapping("/getall/customers")
    public List<Customer> getAllCustomer(){
        return customerService.getAllCustomer();
    }

//    create customer bank account
    @PostMapping("/create/bankaccount")
    public Customer createCustomerAccount(@RequestBody Customer customer){
        return customerService.createCustomerAccount(customer);
    }

//    call procedure to get account type code
    @GetMapping("/get/accounttypecode/{type}")
    public Integer fetchAccountTypeCode(@PathVariable String type){
        return customerService.fetchAccountTypeCode(type);
    }

//    find last account number ===========
    @GetMapping("/get/lastaccountnumber")
    public Long fetchLastAccountNumber(){
        return customerService.fetchLastAccountNumber();
    }

//    get all bank account types=======
    @GetMapping("/getall/bankaccounttype")
    public List<BankAccountType> getAllBankAccountType(){
        return customerService.getAllBankAccountType();
    }



//    ================================================loan management controlling===================================

//  applying for loan
    @PostMapping("/applyingfor/loan")
    public String loanApplying(@RequestBody LoanDetails loanDetails){
        return loanService.loanApplying(loanDetails);
    }

//    get all loan requests
    @GetMapping("/getall/loanrequest")
    public List<Object[]> fetchLoanRequestView(){
        return loanService.fetchLoanRequestView();
    }


//    get all loan types
    @GetMapping("/getall/loantypes")
    public List<LoanVariation> getAllLoanType(){
        return loanService.getAllLoanType();
    }


//    approve loan and update loan details
    @PutMapping("/approveandupdate/loan/{loan_code}/{duration_date}/{approveAmount}")
    public void fetchApproveLoan(
            @PathVariable int loan_code,
            @PathVariable LocalDate duration_date,
            @PathVariable int approveAmount
    ){
        loanService.fetchApproveLoanAndUpdateDetails(loan_code,duration_date,approveAmount);
    }


//    create loan installment
    @PostMapping("/create/loaninstallment/{loan_code}/{required_amount}/{tenore_month}")
    public void fetchCreateLoanInstallment(
            @PathVariable int loan_code,
            @PathVariable int required_amount,
            @PathVariable int tenore_month
    ){
        int installment_no = 1;

        while(installment_no<=tenore_month){

            loanService.fetchCreateLoanInstallment(loan_code,required_amount,installment_no);

            installment_no++;

        }

    }


//    getting approved loans view
    @GetMapping("/getall/approvedloan")
    public List<Object[]> fetchApprovedLoanView(){
        return loanService.fetchApprovedLoanView();
    }


//    getting loan installment view for specific person
    @GetMapping("/getall/installment/for/{loanCode}")
    public List<Object[]> fetchLoanInstallmentView(@PathVariable int loanCode){
        return loanService.fetchLoanInstallmentView(loanCode);
    }


    //    user authenticate
    @GetMapping("/authenticate/user/{userName}/{passWord}")
    public boolean fetchAuthenticateUser(@PathVariable String userName, @PathVariable String passWord ){
        return loanService.fetchAuthenticateUser(userName,passWord);
    }


    //    pay installment
    @PutMapping("/pay/installment/{loanCode}/{installNo}/{installAmount}/{install_date}/{dueAmount}/{recoveredAmount}")
    public void fetchPayInstallment(
            @PathVariable int loanCode,
            @PathVariable int installNo,
            @PathVariable int installAmount,
            @PathVariable LocalDate install_date,
            @PathVariable int dueAmount,
            @PathVariable int recoveredAmount
    ){
        loanService.fetchPayInstallment(loanCode,installNo,installAmount,install_date,dueAmount,recoveredAmount);
    }

    //    reject loan
    @PutMapping("/reject/loan/{loanCode}")
    public void fetchRejectLoan(@PathVariable int loanCode){
        loanService.fetchRejectLoan(loanCode);
    }


    //    getting client info depends on account number
    @GetMapping("/getclient/byaccountnumber/{accountNumber}")
    public Customer fetchGettinfoBasedOnAccountNnumber(@PathVariable int accountNumber){
        return customerService.fetchGettinfoBasedOnAccountNnumber(accountNumber);
    }

}
