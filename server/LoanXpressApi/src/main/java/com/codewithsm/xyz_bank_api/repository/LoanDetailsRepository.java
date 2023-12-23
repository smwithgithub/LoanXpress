package com.codewithsm.xyz_bank_api.repository;

import com.codewithsm.xyz_bank_api.model.LoanDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;


/**
 * This is the Loan Details repository interface for loan management
 *
 * @author (S.M.Shamim)
 *
 */

public interface LoanDetailsRepository extends JpaRepository<LoanDetails,Integer> {

//    get loan request view
    @Procedure(value = "loan_request_view")
    public List<Object[]> fetchLoanRequestView();

//    approving loan and update details
    @Procedure("approve_loan_and_update_details")
    public void fetchApproveLoanAndUpdateDetails(int loan_code, LocalDate duration_date, int approveAmount);


//    create loan installment
    @Procedure("create_loan_installment")
    public void fetchCreateLoanInstallment(int loan_code, int required_amount, int installment_no);


//    getting approved loans view
    @Procedure(value = "approved_loan_view")
    public List<Object[]> fetchApprovedLoanView();


//    getting loan installment view for specific person
    @Procedure("loan_installment_view")
    public List<Object[]> fetchLoanInstallmentView(int loanCode);


//    user authenticate
    @Procedure("authenticate_user")
    public boolean fetchAuthenticateUser(String userName, String passWord);


    //  pay installment
    @Procedure("l_pay_installment")
    public void fetchPayInstallment(
            int loanCode,
            int installNo,
            int installAmount,
            LocalDate install_date,
            int dueAmount,
            int recoveredAmount
    );


    //    reject loan
    @Procedure("l_reject_loan")
    public void fetchRejectLoan(int loanCode);

}
