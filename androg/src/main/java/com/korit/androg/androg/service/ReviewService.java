package com.korit.androg.androg.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.korit.androg.androg.dto.review.ReviewRegisterReqDto;
import com.korit.androg.androg.dto.review.ReviewRespDto;
import com.korit.androg.androg.dto.user.OrderProductsRespDto;
import com.korit.androg.androg.entity.OrderProducts;
import com.korit.androg.androg.repository.ReviewRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewService {
	
	private final ReviewRepository reviewRepository;
	
	public OrderProductsRespDto getProduct(Map<String, Object> requestMap) {
		OrderProducts orderProducts = reviewRepository.getProduct(requestMap);
		
		return orderProducts.toDto();
	}
	
	public int reviewRegister(ReviewRegisterReqDto reviewRegisterReqDto) {
		return reviewRepository.reviewRegister(reviewRegisterReqDto.toEntity());
	}
	
	public List<ReviewRespDto> getReviews(int productId) {
		List<ReviewRespDto> reviewList = new ArrayList<>();
		reviewRepository.getReviews(productId).forEach(review ->{
			reviewList.add(review.toDto());
		});
		return reviewList;
	}
}