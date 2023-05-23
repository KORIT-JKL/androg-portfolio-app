package com.korit.androg.androg.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.korit.androg.androg.dto.review.ReviewModifyReqDto;
import com.korit.androg.androg.entity.OrderProducts;
import com.korit.androg.androg.entity.Review;

@Mapper
public interface ReviewRepository {
	public OrderProducts getProduct(Map<String, Object> requestMap);
	
	public int reviewRegister(Review review);
	
	public List<Review> getReviews(int productId);
	
	public int reviewFlag(Map<String, Object> requestMap);
	
	public int reviewModify(ReviewModifyReqDto modifyReqDto);
//	adminreview_tb에 등록
	public int adminreview_tb(Review review);
}
