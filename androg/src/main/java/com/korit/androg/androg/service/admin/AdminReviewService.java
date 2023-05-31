package com.korit.androg.androg.service.admin;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.korit.androg.androg.dto.admin.AdminReviewCheckRespDto;
import com.korit.androg.androg.dto.admin.UserReviewsRespDto;
import com.korit.androg.androg.exception.CustomException;
import com.korit.androg.androg.repository.admin.AdminReviewRepository;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class AdminReviewService {
	private int maxlength = 45;
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
		if(content == null) {
			throw new CustomException("내용은 빈값은 안됩니다.");
		} else if(content.isBlank() || content.isEmpty() ) {
			throw new CustomException("내용은 빈값은 안됩니다.");
		} else if(content.length()>45) {
			throw new CustomException("45자 이상은 안됩니다~");
		}
		adminReivewRepository.reviewReviewRegister(reviewId, content);
		return ;
	}
	public void reviewReviewModify(int reviewId, String content) {
		if(content == null) {
			throw new CustomException("내용은 빈값은 안됩니다.");
		} else if(content.isBlank() || content.isEmpty()) {
			throw new CustomException("내용은 빈값은 안됩니다.");
		} else if(content.length()>45) {
			throw new CustomException("45자 이상은 안됩니다~");
		}
		adminReivewRepository.reviewReviewModify(reviewId, content);
	}
}
