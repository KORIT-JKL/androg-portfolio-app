package com.korit.androg.androg.repository.admin;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.korit.androg.androg.entity.Review;
@Mapper
public interface AdminReviewRepository {
//	리뷰
	public List<Review> getReviews();
	public void delteReivews(int reviewsId);
	public List<Review> getReviewsNoReview();
	public List<Review> getReviewsYesReview();
	public void reviewReviewRegister(int reviewId, String content);
	public void reviewReviewModify(int reviewId, String content);
}
