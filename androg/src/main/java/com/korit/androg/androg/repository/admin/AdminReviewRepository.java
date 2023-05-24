package com.korit.androg.androg.repository.admin;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.korit.androg.androg.dto.admin.ReviewsRespDto;
import com.korit.androg.androg.dto.admin.ReviewsReviewRespDto;
@Mapper
public interface AdminReviewRepository {
//	리뷰
	public List<ReviewsRespDto> getReviews();
	public void delteReivews(int reviewsId);
	public List<ReviewsReviewRespDto> getReviewsNoReview();
	public List<ReviewsReviewRespDto> getReviewsYesReview();
	public void reviewReviewRegister(int reviewId, String content);
	public void reviewReviewModify(int reviewId, String content);
}
