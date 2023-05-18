package com.korit.androg.androg.dto.address;

import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AddressDefaultReqDto {
	private int userId;
	private int addressId;
	private List<Integer> addressIdList;
}
