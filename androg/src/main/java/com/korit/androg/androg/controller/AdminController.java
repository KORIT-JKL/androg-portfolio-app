package com.korit.androg.androg.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	
	@GetMapping("/admin/pop-up")
	public ResponseEntity<?> getPopUp() {
		return ResponseEntity.ok().body(null);
	}
	
	@PostMapping("/admin/pop-up/register")
	public ResponseEntity<?> popUpRegister(@RequestBody Map<String, Object> requestMap) {
		String content = (String) requestMap.get("content");
		return ResponseEntity.ok().body(adminService.popUpRegister(content));
	}
}
