package com.korit.androg.androg.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.korit.androg.androg.dto.address.AddressDefaultReqDto;
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
		Address address = addressReigsteReqDto.toEntity();
		return addressRepository.addressUpdate(address);
	}
	
	public int addressDelete(int addressId) {
		return addressRepository.addressDelete(addressId);
	}
	
	public int addressDefault(AddressDefaultReqDto addressDefaultReqDto) {
		return addressRepository.addressDefalut(addressDefaultReqDto);
	}
}
