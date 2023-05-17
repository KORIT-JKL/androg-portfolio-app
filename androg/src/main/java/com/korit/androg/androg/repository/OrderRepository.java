package com.korit.androg.androg.repository;

import org.apache.ibatis.annotations.Mapper;

import com.korit.androg.androg.entity.Payment;

@Mapper
public interface OrderRepository {
	public Payment getBuyingProducts(int userId);
}
