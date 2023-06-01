package com.korit.androg.androg.controller.admin;

import java.util.Map;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.korit.androg.androg.aop.annotation.ValidAspect;
import com.korit.androg.androg.dto.admin.ModifyProductReqDto;
import com.korit.androg.androg.dto.admin.RegisterProductReqDto;
import com.korit.androg.androg.service.admin.AdminProductService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class AdminProductsController {
	public final AdminProductService adminProductService;
	@GetMapping("/admin/products/colors")
	public ResponseEntity<?> getColors() {
		return ResponseEntity.ok().body(adminProductService.getColors()) ;
	}
	@ValidAspect
	@PostMapping("/admin/product/register")
	public ResponseEntity<?> registerProduct(@Valid @RequestBody RegisterProductReqDto productReqDto, BindingResult bindingResult) {
		adminProductService.registerProductDetails(productReqDto);
		return null;
	}
	
	@GetMapping("/admin/products/{categoryId}")
	public ResponseEntity<?> getProductByCategoryId(@PathVariable int categoryId) {
		return ResponseEntity.ok().body(adminProductService.getProducts(categoryId));
	}
	@PutMapping("/admin/products/modify")
	public ResponseEntity<?> productModify(@Valid @RequestBody ModifyProductReqDto modifyProductReqDto, BindingResult bindingResult) {
		adminProductService.productModify(modifyProductReqDto);
		return null;
	}
	@DeleteMapping("/admin/products/delete")
	public ResponseEntity<?> productDelete(@RequestParam int productId) {
		adminProductService.productDelte(productId);
		return null;
	}
	
	@PutMapping("/admin/products/soldout")
	public ResponseEntity<?> productSoldout(@RequestParam Map<String, Object> reqeustMap) {
		adminProductService.modifySoldOut(reqeustMap);
		return null;
	}

	
}
