package com.korit.androg.androg.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Payment {
	private int paymentId;
	private int productId;
	private String colorName;
	private String sizeName;
	private int countNumber;
	
}
 