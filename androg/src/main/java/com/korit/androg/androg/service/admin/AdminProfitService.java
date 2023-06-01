package com.korit.androg.androg.service.admin;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.korit.androg.androg.dto.admin.CountRankRespDto;
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
			if(orderDetail.getRank() < 4) {
				list.add(orderDetail.toRankDto());
			}
		});
		return list;
	}
	
	public List<CountRankRespDto> getProfitRank() {
		List<CountRankRespDto> list = new ArrayList<>();
		adminProfitRepository.getProfitRank().forEach(orderDetail -> {
			if(orderDetail.getRank() < 4) {
				list.add(orderDetail.toRankDto());
			}
		});
		return list;
	}
	
	public List<UserRankRespDto> getUserRank() {
		List<UserRankRespDto> list = new ArrayList<>();
		adminProfitRepository.getUserRank().forEach(orderDetail -> {
			if(orderDetail.getRank() < 4) {
				list.add(orderDetail.toUserRankDto());
			}
		});
		System.out.println(list);
		return list;
	}
	
}
