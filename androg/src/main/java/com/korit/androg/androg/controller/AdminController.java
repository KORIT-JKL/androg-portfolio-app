package com.korit.androg.androg.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
