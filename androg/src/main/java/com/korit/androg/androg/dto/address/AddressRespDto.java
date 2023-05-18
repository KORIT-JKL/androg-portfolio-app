package com.korit.androg.androg.dto.address;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AddressRespDto {
	private int addressId;
	private int userId;
	private String address;
	private String addressDetail;
	private String addressSido;
	private String addressSigungu;
	private String addressBname;
	private String addressZonecode;
	private int addressFlag;
}
