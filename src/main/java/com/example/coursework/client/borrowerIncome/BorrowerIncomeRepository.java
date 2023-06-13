package com.example.coursework.client.borrowerIncome;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BorrowerIncomeRepository extends JpaRepository<BorrowersIncome, Integer> {
}
