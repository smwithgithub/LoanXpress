

-- Author: [S.M.Shamim]
-- Date: [25/05/2023]
-- Description: [create authorized user password table]
create TABLE T_L_user_password (
    id_userpass_code INT IDENTITY(1, 1) constraint t_l_user_password_pk PRIMARY KEY,
    tx_user_name VARCHAR(50) not null,
    tx_password VARCHAR(50) not null,
	tx_designation varchar (50) not null
);


-- Author: [S.M.Shamim]
-- Date: [25/05/2023]
-- Description: [create bank account types table]
CREATE TABLE T_L_bank_account_type (
    id_account_type_code INT IDENTITY(1, 1) constraint T_bank_account_type_code_pk PRIMARY KEY,
    tx_account_type VARCHAR(30)
);

-- Author: [S.M.Shamim]
-- Date: [26/05/2023]
-- Description: [create customer's information table]
create table T_L_customer (
	id_customer_code INT IDENTITY constraint t_l_customer_pk PRIMARY KEY,
    id_account_number BIGINT, --default next value for S_L_auto_increment_account_number,
	tx_account_type varchar(30) not null,
    tx_first_name VARCHAR(70) not null,
	tx_last_name VARCHAR(70),
    tx_father_name VARCHAR(70) not null,
	tx_mother_name VARCHAR(70) not null,
    id_nid BIGINT not null constraint t_l_customer_nid_un unique,
    dt_date_of_birth DATE,
    tx_occupation VARCHAR(80) not null,
    id_monthly_income INT ,
	tx_nationality varchar(60) not null,
	tx_present_address varchar(100),
	tx_permanent_address varchar(100),
	tx_district varchar (20),
	id_mobile_number BIGINT not null,
	tx_email varchar(80) ,
    id_account_type_code INT,
	CONSTRAINT t_l_customer_account_type_code_fk FOREIGN KEY (id_account_type_code) REFERENCES T_L_bank_account_type(id_account_type_code)
    
);


-- Author: [S.M.Shamim]
-- Date: [25/05/2023]
-- Description: [create all loans types table]
CREATE TABLE T_L_loan_variation (
    id_loan_type_code INT IDENTITY(1, 1) constraint t_loan_type_code_pk PRIMARY KEY,
    tx_loan_type VARCHAR(25) not null,
	id_interest_rate float not null,

);


-- Author: [S.M.Shamim]
-- Date: [26/05/2023]
-- Description: [create loan details table]
CREATE TABLE T_L_loan_Details (
    id_loan_code INT IDENTITY(1, 1) constraint t_loan_application_code_pk PRIMARY KEY,
    dt_application_date DATE not null,
	id_account_number bigint not null constraint t_l_account_number_un unique,
    id_requested_amount INT not null,
	id_loan_tenor_month int not null,
	id_total_number_of_applicant int,
	tx_full_name varchar(50) not null,
	dt_date_of_birth date not null,
	id_nid BIGINT not null constraint t_l_loan_details_nid_un unique,
	tx_nationality varchar(20) not null,
    tx_present_address varchar(100) not null,
	tx_proffession varchar(50) not null,
	tx_name_of_the_organization varchar(100),
	tx_email varchar(60),
	tx_mobile_number varchar (15) not null,
	id_monthly_income int not null,
	id_approved_amount INT,
	dt_duration_date DATE,
	id_due_amount int,
    tx_loan_status VARCHAR(10) not null,
	id_recovered_amount INT,
    id_loan_type_code INT not null,
    FOREIGN KEY (id_loan_type_code) REFERENCES T_L_loan_variation(id_loan_type_code)
);

/*
-- Author: [S.M.Shamim]
-- Date: [26/05/2023]
-- Description: [create sequence for make auto increment account number]
CREATE SEQUENCE S_L_auto_increment_installment_no
    START WITH 1
    INCREMENT BY 1
    MINVALUE 1
    NO MAXVALUE;*/

-- Author: [S.M.Shamim]
-- Date: [26/05/2023]
-- Description: [create loan installment table]
CREATE TABLE T_L_loan_installment (
    id_installment_code INT IDENTITY(1, 1) constraint t_loan_installment_code_pk PRIMARY KEY,
    id_loan_code INT not null,
	id_required_amount int,
    id_installment_no INT, --default next value for S_L_auto_increment_installment_no,
    dt_installment_date DATE,
    id_installment_amount INT,
    tx_pay_status VARCHAR(15),
    FOREIGN KEY (id_loan_code) REFERENCES T_L_loan_Details(id_loan_code)
);



