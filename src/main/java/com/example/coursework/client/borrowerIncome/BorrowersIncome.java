package com.example.coursework.client.borrowerIncome;

import com.example.coursework.client.enumerations.VerificationResult;
import jakarta.persistence.*;
import lombok.*;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.lang.reflect.Field;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class BorrowersIncome {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column
	private double minimumIncome;
	@Column
	private double FSSP;
	@Column
	private String verificationResult;

	public BorrowersIncome(Object borrowersIncome) throws ParseException, IllegalAccessException {
		BorrowersIncome newBorrowersIncome = new BorrowersIncome();
		Field[] newFields = newBorrowersIncome.getClass().getDeclaredFields();
		JSONObject jo = (JSONObject)(new JSONParser().parse(borrowersIncome.toString()));

		Field[] fields = BorrowersIncome.class.getFields();
		for (int i = 0; i < fields.length; i++) {
			newFields[i].set(newBorrowersIncome, jo.get(fields[i].getName()));
		}
	}
}
