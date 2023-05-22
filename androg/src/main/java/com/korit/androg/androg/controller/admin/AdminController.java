package com.korit.androg.androg.controller.admin;

import java.util.Map;

import org.apache.catalina.connector.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.korit.androg.androg.dto.admin.modifyProductReqDto;
import com.korit.androg.androg.dto.admin.registerProductReqDto;
import com.korit.androg.androg.service.AdminService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class AdminController {
	public final AdminService adminService;
	@GetMapping("admin/products/colors")
	public ResponseEntity<?> getColors() {
		return ResponseEntity.ok().body(adminService.getColors()) ;
	}
	@PostMapping("admin/product/register")
	public ResponseEntity<?> registerProduct(@RequestBody registerProductReqDto productReqDto) {
		adminService.registerProductDetails(productReqDto);
		return null;
	}
	
	@GetMapping("admin/products/{categoryId}")
	public ResponseEntity<?> getProductByCategoryId(@PathVariable int categoryId) {
		return ResponseEntity.ok().body(adminService.getProducts(categoryId));
	}
	@PutMapping("admin/products/modify")
	public ResponseEntity<?> productModify(@RequestBody modifyProductReqDto modifyProductReqDto) {
		adminService.productModify(modifyProductReqDto);
		return null;
	}
	@DeleteMapping("admin/products/delete")
	public ResponseEntity<?> productDelete(@RequestParam int productId) {
		adminService.productDelte(productId);
		return null;
	}
	
	@PutMapping("/admin/products/soldout")
	public ResponseEntity<?> productSoldout(@RequestParam Map<String, Object> reqeustMap) {
		adminService.modifySoldOut(reqeustMap);
		return null;
	}
	
	@GetMapping("/admin/pop-up")
	public ResponseEntity<?> getPopUp() {
		return ResponseEntity.ok().body(null);
	}
	
	@PostMapping("/admin/pop-up/register")
	public ResponseEntity<?> popUpRegister(@RequestBody Map<String, Object> requestMap) {
		String content = (String) requestMap.get("content");
		return ResponseEntity.ok().body(adminService.popUpRegister(content));
	}
	
//	리뷰
	@GetMapping("/admin/reviews")
	public ResponseEntity<?> getreviews() {
//		System.out.println(adminService.getReviews());
		return ResponseEntity.ok().body(adminService.getReviews());
	
	}
	@DeleteMapping("admin/reviews/delete")
	public ResponseEntity<?> deleteReviews(@RequestParam int reviewID) {
		adminService.reviesDelete(reviewID);
		return null;
	}
}
