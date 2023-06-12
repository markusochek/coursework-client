package com.example.coursework.client.entities;

import enums.VerificationResult;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class BorrowersIncome {
	private Borrower borrower;
	private Borrower coBorrower;
	private double minimumIncome;
	private double FSSP;
	
	private VerificationResult verificationResult;
}
