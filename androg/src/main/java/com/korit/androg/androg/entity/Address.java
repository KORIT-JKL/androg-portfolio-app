package com.korit.androg.androg.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Address {
	private int AddressId;
	private int userId;
	private String address;
	private String addressDetail;
	private String addressSigungu;
	private String addressSido;
	private String addressBname;
	private String addressZonecode;
	
	private User user;
}
