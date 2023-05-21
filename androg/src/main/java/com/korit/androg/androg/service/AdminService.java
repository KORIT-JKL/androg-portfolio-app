package com.korit.androg.androg.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.korit.androg.androg.dto.admin.getColorResDto;
import com.korit.androg.androg.dto.admin.getProductRespDto;
import com.korit.androg.androg.dto.admin.registerProductReqDto;
import com.korit.androg.androg.repository.AdminRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminService {
	public final AdminRepository adminRepository;
	public List<getColorResDto> getColors() {
		return adminRepository.getColors();
	}
	public void registerProductDetails(registerProductReqDto productReqDto) {
		adminRepository.registerProductDetail(productReqDto);
		return ;
	}
	public List<getProductRespDto> getProducts(int categoryId) {
		List<getProductRespDto> resultList = new ArrayList<>();
		adminRepository.getProducts(categoryId).forEach((product) -> {
			resultList.add(product.toAdminDto());
		});
		return resultList; 
	}
}
