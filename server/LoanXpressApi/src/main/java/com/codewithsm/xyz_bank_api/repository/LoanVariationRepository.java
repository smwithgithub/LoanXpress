package com.codewithsm.xyz_bank_api.repository;

import com.codewithsm.xyz_bank_api.model.LoanVariation;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * This is the Loan Variation repository interface for loan management
 *
 * @author (S.M.Shamim)
 *
 */

public interface LoanVariationRepository extends JpaRepository<LoanVariation,Integer> {
}
