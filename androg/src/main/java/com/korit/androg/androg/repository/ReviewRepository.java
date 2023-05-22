package com.korit.androg.androg.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.korit.androg.androg.dto.review.ReviewModifyReqDto;
import com.korit.androg.androg.entity.OrderDetail;
import com.korit.androg.androg.entity.Review;

@Mapper
public interface ReviewRepository {
	public OrderDetail getProduct(Map<String, Object> requestMap);
	
	public int reviewRegister(Review review);
	
	public List<Review> getReviews(int productId);
	
	public int reviewFlag(Map<String, Object> requestMap);
	
	public int reviewModify(ReviewModifyReqDto modifyReqDto);
}
