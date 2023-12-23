package com.codewithsm.xyz_bank_api.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

/**
 * This is the Loan details model class for loan management
 *
 * @author S.M.Shamim
 *
 */

@Entity
@Data
@Table(name = "T_L_loan_Details")
public class LoanDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_loan_code;

//    private String tx_loan_type;

    private LocalDate dt_application_date;

    private long id_account_number;

    private int id_requested_amount;

    private int id_loan_tenor_month;

    private int id_total_number_of_applicant;

    private String tx_full_name;

    private LocalDate dt_date_of_birth;

    private long id_nid;

    private String tx_nationality;

    private String tx_present_address;

    private String tx_proffession;

    private String tx_name_of_the_organization;

    private String tx_email;

    private String tx_mobile_number;

    private int id_monthly_income;

    private int id_approved_amount;

    private LocalDate dt_duration_date;

    private int id_due_amount;

    private String tx_loan_status;

    private int id_recovered_amount;

    private int id_loan_type_code;

}
