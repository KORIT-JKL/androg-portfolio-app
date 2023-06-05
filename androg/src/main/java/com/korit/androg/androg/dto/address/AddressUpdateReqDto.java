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
	

	@NotEmpty
	private String address;
	
	@Pattern(regexp = "^[A-Za-z0-9가-힣,!\\- ]+$", message="공백일 수 없습니다(특수문자는 - 만 사용 가능합니다.)")
	private String addressDetail;
	

	@NotBlank
	private String addressSigungu;
	

	@NotBlank
	private String addressSido;
	

	@NotBlank
	private String addressBname;
	
	@NotBlank
	private String addressZonecode;
	
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
