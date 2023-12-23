package com.codewithsm.xyz_bank_api.repository;

import com.codewithsm.xyz_bank_api.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;

import java.util.List;

/**
 * This is the customer repository interface for client management
 *
 * @author (S.M.Shamim)
 *
 */

public interface CustomerRepository extends JpaRepository<Customer,Integer> {

    @Procedure(value = "find_account_type_code")
    public Integer fetchAccountTypeCode(String account_type);

    @Procedure(value = "last_account_number_find")
    public Long fetchLastAccountNumber();

    //    getting client info depends on account number
    @Procedure("l_gettinfo_based_on_accountNnumber")
    public Customer fetchGettinfoBasedOnAccountNnumber(int accountNumber);

}
