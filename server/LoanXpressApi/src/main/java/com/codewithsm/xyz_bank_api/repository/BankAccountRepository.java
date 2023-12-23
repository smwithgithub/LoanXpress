package com.codewithsm.xyz_bank_api.repository;

import com.codewithsm.xyz_bank_api.model.BankAccountType;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * This is the bank account type repository interface for client management
 *
 * @author (S.M.Shamim)
 *
 */

public interface BankAccountRepository extends JpaRepository<BankAccountType,Integer> {
}
