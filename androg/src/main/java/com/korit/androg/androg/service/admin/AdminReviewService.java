package com.korit.androg.androg.service.admin;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.korit.androg.androg.dto.admin.AdminReviewCheckRespDto;
import com.korit.androg.androg.dto.admin.UserReviewsRespDto;
import com.korit.androg.androg.repository.admin.AdminReviewRepository;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class AdminReviewService {
	private final AdminReviewRepository adminReivewRepository;
	public List<UserReviewsRespDto> getReviews() {
		List<UserReviewsRespDto> userReviewsRespDtos = new ArrayList<>();
		adminReivewRepository.getReviews().forEach(userReview->{
			userReviewsRespDtos.add(userReview.toReviews());
		});
		return userReviewsRespDtos;
	}
	
	public void reviesDelete(int reviewsId) {
		adminReivewRepository.delteReivews(reviewsId);
		return;
	}
	public List<AdminReviewCheckRespDto> getReivewsReview(int answer) {
		List<AdminReviewCheckRespDto> dtos = new ArrayList<>();
		if(answer == 0) {
			adminReivewRepository.getReviewsYesReview().forEach(review ->{
				dtos.add(review.toCheck());
			});
			return dtos;
		}
		adminReivewRepository.getReviewsNoReview().forEach(review ->{
			dtos.add(review.toCheck());
		});
		return dtos;
	}
	public void reviewReviewRegister(int reviewId, String content) {
		adminReivewRepository.reviewReviewRegister(reviewId, content);
		return ;
	}
	public void reviewReviewModify(int reviewId, String content) {
		adminReivewRepository.reviewReviewModify(reviewId, content);
	}
}
