package com.codewithsm.xyz_bank_api.model;

import jakarta.persistence.*;
import lombok.Data;

/**
 * This is the Loan Variation model class for loan management
 *
 * @author (S.M.Shamim)
 *
 */

@Entity
@Data
@Table(name = "T_L_loan_variation")
public class LoanVariation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_loan_type_code;

    private String tx_loan_type;

    private float id_interest_rate;
}
