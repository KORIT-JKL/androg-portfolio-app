package com.korit.androg.androg.repository;

import org.apache.ibatis.annotations.Mapper;

import com.korit.androg.androg.dto.address.AddressReigsteReqDto;
import com.korit.androg.androg.entity.Address;

@Mapper
public interface AddressRepository {
	public int addressRegister(Address address);
}
