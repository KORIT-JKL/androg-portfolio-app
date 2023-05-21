package com.korit.androg.androg.repository;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface OrderRepository {
	public int completeOrder(Map<String, Object> requestMap);
}
