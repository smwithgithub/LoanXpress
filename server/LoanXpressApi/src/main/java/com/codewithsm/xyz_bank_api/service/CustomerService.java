package com.codewithsm.xyz_bank_api.service;

import com.codewithsm.xyz_bank_api.model.BankAccountType;
import com.codewithsm.xyz_bank_api.model.Customer;
import com.codewithsm.xyz_bank_api.repository.BankAccountRepository;
import com.codewithsm.xyz_bank_api.repository.CustomerRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * This is the service class for client management
 *
 * @author (S.M.Shamim)
 *
 */

@Service
public class CustomerService {

    @Autowired
    public CustomerRepository repository;

    @Autowired
    public BankAccountRepository bankAccountRepository;

//    get all bank account types========
    public List<BankAccountType> getAllBankAccountType(){
        return bankAccountRepository.findAll();
    }

//    get-all customers =================
    public List<Customer> getAllCustomer(){
        return repository.findAll();
    }

//    create customoer bank account=====================
    public Customer createCustomerAccount(Customer customer){

        return repository.save(customer);
    }

//    fetch customer bank account type=====================
    public Integer fetchAccountTypeCode(String account_type){

        return repository.fetchAccountTypeCode(account_type);
    }

//    find last account number=====================
    public Long fetchLastAccountNumber(){
        return repository.fetchLastAccountNumber();
    }


    //    getting client info depends on account number
    @Transactional
    public Customer fetchGettinfoBasedOnAccountNnumber(int accountNumber){
        return repository.fetchGettinfoBasedOnAccountNnumber(accountNumber);
    }

}
