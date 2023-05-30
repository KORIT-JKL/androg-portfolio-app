package com.korit.androg.androg.controller;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.korit.androg.androg.aop.annotation.ValidAspect;
import com.korit.androg.androg.dto.address.AddressDefaultReqDto;
import com.korit.androg.androg.dto.address.AddressReigsteReqDto;
import com.korit.androg.androg.dto.address.AddressUpdateReqDto;
import com.korit.androg.androg.service.AddressService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class AddressController {
	
	private final AddressService addressService;
	
	@ValidAspect
	@PostMapping("/user/mypage/address")
	public ResponseEntity<?> addressRegister(@Valid @RequestBody AddressReigsteReqDto addressReigsteReqDto, BindingResult bindingResult){
		System.out.println(addressReigsteReqDto);
		return ResponseEntity.ok().body(addressService.addressRegister(addressReigsteReqDto));
	}
	
	@GetMapping("/user/mypage/address")
	public ResponseEntity<?> getAddress(int userId){
		
		return ResponseEntity.ok().body(addressService.getAddress(userId));
	}
	
	@ValidAspect
	@PutMapping("/user/mypage/address/{addressId}")
	public ResponseEntity<?> addressUpdate(@Valid @RequestBody AddressUpdateReqDto addressUpdateReqDto,BindingResult bindingResult, @PathVariable int addressId){
		return ResponseEntity.ok().body(addressService.addressUpdate(addressId, addressUpdateReqDto));
	}
	
	@PutMapping("/user/mypage/address/default")
	public ResponseEntity<?> addressDefault(@RequestBody AddressDefaultReqDto addressDefaultReqDto){
		return ResponseEntity.ok().body(addressService.addressDefault(addressDefaultReqDto)); 
	}
	
	@DeleteMapping("/user/mypage/address/{addressId}")
	public ResponseEntity<?> addressDelete(@PathVariable int addressId){
		return ResponseEntity.ok().body(addressService.addressDelete(addressId));
	}
}
