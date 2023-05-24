package com.korit.androg.androg.service.admin;

import java.util.List;

import org.springframework.stereotype.Service;

import com.korit.androg.androg.dto.admin.ReviewsRespDto;
import com.korit.androg.androg.dto.admin.ReviewsReviewRespDto;
import com.korit.androg.androg.repository.admin.AdminReviewRepository;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class AdminReviewService {
	private final AdminReviewRepository adminReivewRepository;
	public List<ReviewsRespDto> getReviews() {
		return adminReivewRepository.getReviews();
	}
	
	public void reviesDelete(int reviewsId) {
		adminReivewRepository.delteReivews(reviewsId);
		return;
	}
	public List<ReviewsReviewRespDto> getReivewsReview(int answer) {
		if(answer == 0) {
			return adminReivewRepository.getReviewsYesReview();
		}
		return adminReivewRepository.getReviewsNoReview();
	}
	public void reviewReviewRegister(int reviewId, String content) {
		adminReivewRepository.reviewReviewRegister(reviewId, content);
		return ;
	}
	public void reviewReviewModify(int reviewId, String content) {
		adminReivewRepository.reviewReviewModify(reviewId, content);
	}
}
