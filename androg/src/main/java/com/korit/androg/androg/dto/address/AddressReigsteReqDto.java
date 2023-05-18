package com.korit.androg.androg.dto.address;

import com.korit.androg.androg.entity.Address;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AddressReigsteReqDto {
	private int userId;
	private String address;
	private String addressDetail;
	private String addressSigungu;
	private String addressSido;
	private String addressBname;
	private String addressZonecode;
	private int addressFlag;
	
	public Address toEntity() {
		return Address.builder()
				.userId(userId)
				.address(address)
				.addressDetail(addressDetail)
				.addressSido(addressSido)
				.addressSigungu(addressSigungu)
				.addressBname(addressBname)
				.addressZonecode(addressZonecode)
				.addressFlag(addressFlag)
				.build();
	}
}
