package com.korit.androg.androg.dto.order;

import java.util.List;
import java.util.Map;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OrderCompleteReqDto {
	private int userId;
	private List<Map<String, Object>> products;
	private int addressId;
	private String address;
	private String addressSigungu;
	private String addressSido;
	private String addressZonecode;
	@Pattern(regexp = "^[A-Za-z0-9가-힣,!\\- ]+$", message="특수문자는 - 만 사용 가능합니다.")
	private String addressDetail;
	
	@NotBlank
	@Pattern(regexp = "^\\d{2,3}-\\d{3,4}-\\d{4}$",message = "휴대전화번호 입력 양식은 000-0000-0000 입니다.")
	private String poneNumber;
}
