package com.korit.androg.androg.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.korit.androg.androg.dto.address.AddressReigsteReqDto;
import com.korit.androg.androg.dto.address.AddressRespDto;
import com.korit.androg.androg.entity.Address;
import com.korit.androg.androg.repository.AddressRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AddressService {
	
	private final AddressRepository addressRepository;
	
	public int addressRegister(AddressReigsteReqDto addressReigsteReqDto) {
		Address address = addressReigsteReqDto.toEntity();
		return addressRepository.addressRegister(address);
	}
	
	public List<AddressRespDto> getAddress(int userId){
		List<AddressRespDto> addressList = new ArrayList<>();
		
		addressRepository.getAddress(userId).forEach(address->{
			addressList.add(address.toDto());
		});
		return addressList;
	}
	
	public int addressUpdate(int addressId, AddressReigsteReqDto addressReigsteReqDto) {
		Map<String, Object> requestMap = new HashMap<>();
		requestMap.put("addressId", addressId);
		requestMap.put("address", addressReigsteReqDto.getAddress());
		requestMap.put("addressSigungu", addressReigsteReqDto.getAddressSigungu());
		requestMap.put("addressSido", addressReigsteReqDto.getAddressSido());
		requestMap.put("addressBname", addressReigsteReqDto.getAddressBname());
		requestMap.put("addressZonecode", addressReigsteReqDto.getAddressZonecode());
		requestMap.put("addressDetail", addressReigsteReqDto.getAddressDetail());
		return addressRepository.addressUpdate(requestMap);
	}
}
