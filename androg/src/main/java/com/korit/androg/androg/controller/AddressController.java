package com.korit.androg.androg.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.korit.androg.androg.dto.address.AddressDefaultReqDto;
import com.korit.androg.androg.dto.address.AddressReigsteReqDto;
import com.korit.androg.androg.service.AddressService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class AddressController {
	
	private final AddressService addressService;
	
	
	@PostMapping("/user/mypage/address")
	public ResponseEntity<?> addressRegister(@RequestBody AddressReigsteReqDto addressReigsteReqDto){
		
		return ResponseEntity.ok().body(addressService.addressRegister(addressReigsteReqDto));
	}
	
	@GetMapping("/user/mypage/address")
	public ResponseEntity<?> getAddress(int userId){
		
		return ResponseEntity.ok().body(addressService.getAddress(userId));
	}
	
	@PutMapping("/user/mypage/address/{addressId}")
	public ResponseEntity<?> addressUpdate(@PathVariable int addressId, @RequestBody AddressReigsteReqDto addressReigsteReqDto){
		
		return ResponseEntity.ok().body(addressService.addressUpdate(addressId, addressReigsteReqDto));
	}
	
	@PutMapping("/user/mypage/address/default")
	public ResponseEntity<?> addressDefault(@RequestBody AddressDefaultReqDto addressDefaultReqDto){
		System.out.println(addressDefaultReqDto);
		return ResponseEntity.ok().body(addressService.addressDefault(addressDefaultReqDto)); 
	}
	
	@DeleteMapping("/user/mypage/address/{addressId}")
	public ResponseEntity<?> addressDelete(@PathVariable int addressId){
		return ResponseEntity.ok().body(addressService.addressDelete(addressId));
	}
}
