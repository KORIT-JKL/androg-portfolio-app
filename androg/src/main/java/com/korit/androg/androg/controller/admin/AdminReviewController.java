package com.korit.androg.androg.controller.admin;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.korit.androg.androg.service.admin.AdminReviewService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class AdminReviewController {
	public final AdminReviewService adminReviewService;
	@GetMapping("/admin/reviews")
	public ResponseEntity<?> getreviews() {
		return ResponseEntity.ok().body(adminReviewService.getReviews());
	
	}
	@DeleteMapping("/admin/reviews/delete")
	public ResponseEntity<?> deleteReviews(@RequestParam int reviewID) {
		adminReviewService.reviesDelete(reviewID);
		return null;
	}
	@GetMapping("/admin/reviews/review")
	public ResponseEntity<?> getReviewsReview(@RequestParam int answer) {
		return ResponseEntity.ok().body(adminReviewService.getReivewsReview(answer));
	}
	@PostMapping("/admin/reviews/review/register")
	public ResponseEntity<?> reviewsReviewRegister(@RequestParam Map<String, Object> requestmaMap) {
		int reviewId = Integer.parseInt((String)requestmaMap.get("reviewId")) ;
		String content = (String)requestmaMap.get("content") ;
		adminReviewService.reviewReviewRegister(reviewId, content);
		return null;
	}
	@PutMapping("/admin/reviews/review/modify")
	public ResponseEntity<?> reviewsReviewModify(@RequestParam Map<String, Object> requestmaMap) {
		int reviewId = Integer.parseInt((String)requestmaMap.get("reviewId")) ;
		String content = (String)requestmaMap.get("content") ;
		adminReviewService.reviewReviewModify(reviewId, content);
		return null;
	}
}
