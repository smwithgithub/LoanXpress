-- Author: [S.M.Shamim]
-- Date: [28/05/2023]
-- Description: [default values insertion]
insert into T_L_bank_account_type values('Savings'),
										('Current'),
										('DPS'),
										('FDR')

-- Author: [S.M.Shamim]
-- Date: [28/05/2023]
-- Description: [default values insertion]
insert into T_L_loan_variation values ('House loan',7.2),
									('Car loan',12),
									('Personal loan',10),
									('Business loan',11),
									('Student loan',13)


-- Author: [S.M.Shamim]
-- Date: [28/05/2023]
-- Description: [default values insertion]
insert into T_L_user_password values('shamim123','am123shamim','manager')



-- Author: [S.M.Shamim]
-- Date: [27/05/2023]
-- Description: [create sp to get account numbe to make new account number]
create proc last_account_number_find
	@last_account_number bigint output
	as
	begin
		select @last_account_number = id_account_number
		from T_L_customer
		order by id_customer_code desc
		offset 0 rows
		fetch first 1 row only
	end

-- Author: [S.M.Shamim]
-- Date: [29/05/2023]
-- Description: [query to show data on loan request in user interface]
create proc loan_request_view
	as
	begin
		select ld.id_loan_code, ld.dt_application_date, ld.id_account_number, ld.tx_full_name, ld.dt_date_of_birth,
		ld.tx_nationality,ld.tx_proffession, ld.id_monthly_income, lv.tx_loan_type, lv.id_interest_rate, ld.id_requested_amount,
		ld.id_approved_amount,ld.id_loan_tenor_month, ld.tx_loan_status
		from T_L_loan_Details as ld
		inner join T_L_loan_variation as lv
		on ld.id_loan_type_code = lv.id_loan_type_code
		where ld.tx_loan_status = 'Pending'
	end


-- Author: [S.M.Shamim]
-- Date: [30/05/2023]
-- Description: [update loan detailes after approved]
create proc approve_loan_and_update_details
	@loan_code bigint,
	@duration date,
	@approve_amount int
	as
	begin
		update T_L_loan_Details 
		set dt_duration_date = @duration, id_approved_amount = @approve_amount, tx_loan_status ='Approved'
		where id_loan_code = @loan_code
	end


-- Author: [S.M.Shamim]
-- Date: [29/05/2023]
-- Description: [query to show data on approved loans in user interface]
create proc approved_loan_view
	as
	begin
		select ld.id_loan_code, ld.tx_full_name, ld.id_account_number, ld.id_approved_amount,
		ld.id_loan_tenor_month,ld.dt_duration_date, ld.id_due_amount, ld.id_recovered_amount, lv.id_interest_rate,
		ld.tx_mobile_number
		from T_L_loan_Details as ld
		inner join T_L_loan_variation as lv
		on ld.id_loan_type_code = lv.id_loan_type_code
		where ld.tx_loan_status = 'Approved'
	end


-- Author: [S.M.Shamim]
-- Date: [30/05/2023]
-- Description: [installment details insertion after approved a loan]
create proc create_loan_installment
	@loan_code int,
	@required_amount int,
	@installment_no int
	as
	begin
		insert into T_L_loan_installment(id_loan_code,id_required_amount,id_installment_no,tx_pay_status)
										values(@loan_code,@required_amount,@installment_no,'pending')
	end


-- Author: [S.M.Shamim]
-- Date: [30/05/2023]
-- Description: [get installment for a specific client]
create proc loan_installment_view
	@loan_code int
	as
	begin
		select li.id_loan_code, li.id_installment_no, ld.tx_full_name, ld.id_account_number, li.id_required_amount,
			li.dt_installment_date, li.id_installment_amount,li.tx_pay_status
		from T_L_loan_installment as li
		inner join T_L_loan_Details as ld
		on li.id_loan_code = @loan_code and ld.id_loan_code = @loan_code
	end


-- Author: [S.M.Shamim]
-- Date: [30/05/2023]
-- Description: [check user authentication]
create proc authenticate_user
    @user_name varchar(50),
    @password varchar(50),
	@result bit output
	as
	begin
		declare @result_value bit =0;

		if exists (
			select 1
			from T_L_user_password
			where tx_user_name = @user_name and tx_password = @password
		)
		begin
			set @result_value = 1;
		end

		select @result = @result_value
	end

-- Author: [S.M.Shamim]
-- Date: [03/10/2023]
-- Description: [check user authentication]
create proc l_pay_installment
	@loan_code int,
	@install_no int,
	@install_amount int,
	@install_date date,
	@due_amount int,
	@recovered_amount int
	as
	begin
		update T_L_loan_installment
		set id_installment_amount = @install_amount, dt_installment_date = @install_date, tx_pay_status='paid'
		where id_installment_no = @install_no;

		update T_L_loan_Details 
		set id_due_amount = @due_amount, id_recovered_amount = @recovered_amount
		where id_loan_code = @loan_code
	end

-- Author: [S.M.Shamim]
-- Date: [03/10/2023]
-- Description: [reject loan and update detailes]
create proc l_reject_loan
	@loan_code int
	as
	begin
		update T_L_loan_Details
		set tx_loan_status='Rejected'
		where id_loan_code = @loan_code
	end


-- Author: [S.M.Shamim]
-- Date: [07/10/2023]
-- Description: [getting clients information depends on account number]
create proc l_gettinfo_based_on_accountNnumber
	@account_number int
	as
	begin
		select * 
		from T_L_customer
		where id_account_number = @account_number
	end
