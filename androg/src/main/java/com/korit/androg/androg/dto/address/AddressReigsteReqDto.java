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
	private String poneNumber;
	private int addressFlag;
	private int addressId;
	
	public Address toEntity() {
		return Address.builder()
				.userId(userId)
				.address(address)
				.addressId(addressId)
				.addressDetail(addressDetail)
				.addressSido(addressSido)
				.addressSigungu(addressSigungu)
				.addressBname(addressBname)
				.addressZonecode(addressZonecode)
				.poneNumber(poneNumber)
				.addressFlag(addressFlag)
				.build();
	}
}
