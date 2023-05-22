package com.korit.androg.androg.dto.order;

import lombok.Data;

@Data
public class SaveAddressReqDto {
	private int arrivalId;
	private int addressId;
	private String phone;
}
