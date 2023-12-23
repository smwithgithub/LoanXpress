package com.codewithsm.xyz_bank_api.service;

import com.codewithsm.xyz_bank_api.model.LoanDetails;
import com.codewithsm.xyz_bank_api.model.LoanVariation;
import com.codewithsm.xyz_bank_api.repository.LoanDetailsRepository;
import com.codewithsm.xyz_bank_api.repository.LoanVariationRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;


/**
 * This is the service class for loan management
 *
 * @author (S.M.Shamim)
 *
 */

@Service
public class LoanService {

    @Autowired
    public LoanDetailsRepository loanDetailsRepository;

    @Autowired
    public LoanVariationRepository loanVariationRepository;


//    apply for loan
    public String loanApplying(LoanDetails loanDetails){

        loanDetailsRepository.save(loanDetails);
        return "Loan application submited";
    }

//  get loan request view
    @Transactional
    public List<Object[]> fetchLoanRequestView(){
        return loanDetailsRepository.fetchLoanRequestView();
    }


//    get approved loans view
    @Transactional
    public List<Object[]> fetchApprovedLoanView(){
        return loanDetailsRepository.fetchApprovedLoanView();
    }


//    get all loan types
    public List<LoanVariation> getAllLoanType(){
        return loanVariationRepository.findAll();
    }


//    approve and update loan details
    public void fetchApproveLoanAndUpdateDetails(int loan_code, LocalDate duration_date, int approveAmount){
        loanDetailsRepository.fetchApproveLoanAndUpdateDetails(loan_code,duration_date,approveAmount);

    }


//    create loan installment
    public void fetchCreateLoanInstallment(int loan_code, int required_amount, int installment_no){

        loanDetailsRepository.fetchCreateLoanInstallment(loan_code,required_amount,installment_no);
    }


//    getting loan installment view for specific person
    @Transactional
    public List<Object[]> fetchLoanInstallmentView(int loanCode){
        return loanDetailsRepository.fetchLoanInstallmentView(loanCode);
    }

//    user authenticate
    public boolean fetchAuthenticateUser(String userName, String passWord ){
        return loanDetailsRepository.fetchAuthenticateUser(userName,passWord);
    }

    //    paqy installment
    public void fetchPayInstallment(
            int loanCode,
            int installNo,
            int installAmount,
            LocalDate install_date,
            int dueAmount,
            int recoveredAmount
    ){
        loanDetailsRepository.fetchPayInstallment(loanCode,installNo,installAmount,install_date,dueAmount,recoveredAmount);
    }


    //    reject loan
    public void fetchRejectLoan(int loanCode){
        loanDetailsRepository.fetchRejectLoan(loanCode);
    }

}
