package com.korit.androg.androg.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.korit.androg.androg.dto.admin.getColorResDto;
import com.korit.androg.androg.dto.admin.getProductRespDto;
import com.korit.androg.androg.dto.admin.getReviewsRespDto;
import com.korit.androg.androg.dto.admin.modifyProductReqDto;
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
	public void productModify(modifyProductReqDto modifyProductReqDto) {
		adminRepository.productModify(modifyProductReqDto);
		return ;
	}
	public void productDelte(int productId) {
		adminRepository.productDelte(productId);
		return ;
	}
	public void modifySoldOut(Map<String, Object> requestMap) {
		int productId = Integer.parseInt((String)requestMap.get("productId"));
		int soldoutFlag = Integer.parseInt((String)requestMap.get("value"));
		adminRepository.modifySodlout(productId,soldoutFlag);
		return ;
	}
	public int popUpRegister (String content) {
		return adminRepository.popUpRegister(content);
	}
	
//	리뷰
	public List<getReviewsRespDto> getReviews() {
		return adminRepository.getReviews();
	}
	
	public void reviesDelete(int reviewsId) {
		System.out.println(reviewsId);
		adminRepository.delteReivews(reviewsId);
		return;
	}
}
