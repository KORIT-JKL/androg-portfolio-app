package com.korit.androg.androg.service.admin;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.korit.androg.androg.dto.admin.CountRankRespDto;
import com.korit.androg.androg.dto.admin.DateRankRespDto;
import com.korit.androg.androg.dto.admin.UserRankRespDto;
import com.korit.androg.androg.repository.admin.AdminProfitRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminProfitService {
	private final AdminProfitRepository adminProfitRepository ;
	public List<CountRankRespDto> getCountRank() {
		List<CountRankRespDto> list = new ArrayList<>();
		adminProfitRepository.getCountRank().forEach(orderDetail -> {
			if(orderDetail.getRank() < 6) {
				list.add(orderDetail.toRankDto());
			}
		});
		return list;
	}
	
	public List<CountRankRespDto> getProfitRank() {
		List<CountRankRespDto> list = new ArrayList<>();
		adminProfitRepository.getProfitRank().forEach(orderDetail -> {
			if(orderDetail.getRank() < 6) {
				list.add(orderDetail.toRankDto());
			}
		});
		return list;
	}
	
	public List<UserRankRespDto> getUserRank() {
		List<UserRankRespDto> list = new ArrayList<>();
		adminProfitRepository.getUserRank().forEach(orderDetail -> {
			if(orderDetail.getRank() < 10) {
				list.add(orderDetail.toUserRankDto());
			}
		});
		return list;
	}
	public List<DateRankRespDto> getDateRank() {
		List<DateRankRespDto> list = new ArrayList<>();
		adminProfitRepository.getDateRank().forEach(orderdetail -> {
			list.add(orderdetail.toDateRankDto());
		});
		return list;
	}
	
}
