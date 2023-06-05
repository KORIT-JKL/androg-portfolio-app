package com.korit.androg.androg.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.korit.androg.androg.dto.address.AddressDefaultReqDto;
import com.korit.androg.androg.dto.address.AddressRespDto;
import com.korit.androg.androg.entity.Address;

@Mapper
public interface AddressRepository {
	public int addressRegister(Address address);
	
	public List<Address> getAddress(int userId);
	
	public Address getAddressByAddressId(int addressId);
	
	public int addressUpdate(Address address);
	
	public int addressDelete(int addressId);
	
	public int addressDefalut(AddressDefaultReqDto addressDefaultReqDto);
}
