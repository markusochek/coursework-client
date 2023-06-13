package com.example.coursework.client.borrower;

import com.example.coursework.client.FullName;
import com.example.coursework.client.enumerations.Confirmation;
import jakarta.persistence.*;
import lombok.*;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.lang.reflect.Field;
import java.util.GregorianCalendar;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Borrower {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column
	private String fullName;
	@Column
	private String dateOfBirth;
	@Column
	private boolean isSalaryProject;
	@Column
	private int dependents;
	@Column
	private double income;
	@Column
	private String confirmation;
	@Column
	private boolean isDelayOfMoreThan20Days;
	@Column
	private boolean isBankrupt;
	@Column
	private int scoring;

    public Borrower(Object borrower) throws ParseException, IllegalAccessException {
		Borrower newBorrower = new Borrower();
		Field[] newFields = newBorrower.getClass().getDeclaredFields();
		JSONObject jo = (JSONObject)(new JSONParser().parse(borrower.toString()));

		Field[] fields = Borrower.class.getDeclaredFields();
		System.out.println(fields.length);
		for (int i = 0; i < fields.length; i++) {
			newFields[i].set(newBorrower, jo.get(fields[i].getName()));
		}
    }
}
