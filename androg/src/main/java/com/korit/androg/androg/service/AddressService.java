package com.korit.androg.androg.service;

import org.springframework.stereotype.Service;

import com.korit.androg.androg.dto.address.AddressReigsteReqDto;
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
}
