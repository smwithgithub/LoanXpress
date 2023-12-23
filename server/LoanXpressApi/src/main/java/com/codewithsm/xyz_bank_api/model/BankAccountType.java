package com.codewithsm.xyz_bank_api.model;

import jakarta.persistence.*;
import lombok.Data;

/**
 * This is the bank account type model class for client management
 *
 * @author S.M.Shamim
 *
 */

@Entity
@Data
@Table(name = "T_L_bank_account_type")
public class BankAccountType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_account_type_code;

    private String tx_account_type;
}
