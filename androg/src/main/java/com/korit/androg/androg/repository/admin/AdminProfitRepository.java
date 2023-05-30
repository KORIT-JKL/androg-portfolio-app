package com.korit.androg.androg.repository.admin;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.korit.androg.androg.entity.OrderDetail;

@Mapper
public interface AdminProfitRepository {
	public List<OrderDetail> getCountRank();
	public List<OrderDetail> getProfitRank();
	public List<OrderDetail> getUserRank();
}
