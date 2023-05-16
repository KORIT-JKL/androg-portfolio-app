package com.korit.androg.androg.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.korit.androg.androg.entity.Address;

@Mapper
public interface AddressRepository {
	public int addressRegister(Address address);
	
	public List<Address> getAddress(int userId);
	
	public int addressUpdate(Map<String, Object> requestMap);
	
	public int addressDelete(int addressId);
}
