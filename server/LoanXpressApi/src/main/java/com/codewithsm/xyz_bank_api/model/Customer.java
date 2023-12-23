package com.codewithsm.xyz_bank_api.model;


import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

/**
 * This is the customer model class for client management
 *
 * @author S.M.Shamim
 *
 */

@Entity
@Data
@Table(name = "T_L_customer")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_customer_code;

    private long id_account_number;
    private String tx_account_type;
    private String tx_first_name;
    private String tx_last_name;
    private String tx_father_name;
    private String tx_mother_name;
    private long id_nid;
    private LocalDate dt_date_of_birth;
    private String tx_occupation;
    private int id_monthly_income;
    private String tx_nationality;
    private String tx_present_address;
    private String tx_permanent_address;
    private String tx_district;
    private String tx_mobile_number;
    private String tx_email;
    private int id_account_type_code;

}
