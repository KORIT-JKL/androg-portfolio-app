package com.korit.androg.androg.dto.address;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import com.korit.androg.androg.entity.Address;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AddressUpdateReqDto {
	private int userId;
	
	@NotBlank
	@NotNull
	@NotEmpty
	private String address;
	
	@Pattern(regexp = "^[A-Za-z0-9가-힣,!\\- ]+$", message="특수문자는 - 만 사용 가능합니다.")
	private String addressDetail;
	
	@NotNull
	@NotEmpty
	@NotBlank
	private String addressSigungu;
	
	@NotNull
	@NotBlank
	@NotEmpty
	private String addressSido;
	
	@NotNull
	@NotEmpty
	@NotBlank
	private String addressBname;
	
	@NotNull
	@NotEmpty
	@NotBlank
	private String addressZonecode;
	
	@NotNull
	@NotEmpty
	@NotBlank
	@Pattern(regexp = "^\\d{2,3}-\\d{3,4}-\\d{4}$",message = "휴대전화번호 입력 양식은 000-0000-0000 입니다.")
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