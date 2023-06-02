package com.korit.androg.androg.service.admin;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.korit.androg.androg.dto.admin.AdminReviewCheckRespDto;
import com.korit.androg.androg.dto.admin.UserReviewsRespDto;
import com.korit.androg.androg.repository.admin.AdminReviewRepository;
import com.korit.androg.androg.service.ErrorService;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class AdminReviewService {
	private int maxlength = 45;
	private final AdminReviewRepository adminReivewRepository;
	private final ErrorService errorService;
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

		errorService.blankCheck(content, maxlength);
		adminReivewRepository.reviewReviewRegister(reviewId, content);
		return ;
	}
	public void reviewReviewModify(int reviewId, String content) {
		errorService.blankCheck(content, maxlength);
		adminReivewRepository.reviewReviewModify(reviewId, content);
	}
}
