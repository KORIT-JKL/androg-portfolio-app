package com.korit.androg.androg.entity;

import com.korit.androg.androg.dto.address.AddressRespDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Address {
	private int addressId;
	private int userId;
	private String address;
	private String addressDetail;
	private String addressSigungu;
	private String addressSido;
	private String addressBname;
	private String addressZonecode;
	private String poneNumber;
	private int addressFlag;
	
	
	private User user;
	
	public AddressRespDto toDto() {
		return AddressRespDto.builder()
				.addressId(addressId)
				.userId(userId)
				.address(address)
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
