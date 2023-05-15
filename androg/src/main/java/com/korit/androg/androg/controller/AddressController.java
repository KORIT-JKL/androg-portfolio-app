package com.korit.androg.androg.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.korit.androg.androg.dto.address.AddressReigsteReqDto;
import com.korit.androg.androg.service.AddressService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class AddressController {
	
	private final AddressService addressService;
	
	
	@PostMapping("/user/mypage/address")
	public ResponseEntity<?> addressRegister(@RequestBody AddressReigsteReqDto addressReigsteReqDto){
		System.out.println(addressReigsteReqDto);
		return ResponseEntity.ok().body(addressService.addressRegister(addressReigsteReqDto));
	}
}
