package com.korit.androg.androg.controller.admin;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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
}
