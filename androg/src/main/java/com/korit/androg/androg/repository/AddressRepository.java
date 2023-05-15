package com.korit.androg.androg.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.korit.androg.androg.entity.Address;

@Mapper
public interface AddressRepository {
	public int addressRegister(Address address);
	
	public List<Address> getAddress(int userId);
}
