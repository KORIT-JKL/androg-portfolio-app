package com.korit.androg.androg.dto.order;

import java.util.List;
import java.util.Map;

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
	private String addressDetail;
	private String addressBname;
	private String poneNumber;
}
