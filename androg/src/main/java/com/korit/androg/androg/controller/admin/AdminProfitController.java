package com.korit.androg.androg.controller.admin;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.korit.androg.androg.service.admin.AdminProfitService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class AdminProfitController {
	private final AdminProfitService adminProfitService;
	@GetMapping("/admin/rank/count")
	public ResponseEntity<?> getCountRank(){
		return ResponseEntity.ok().body(adminProfitService.getCountRank());
	}
	@GetMapping("/admin/rank/profit")
	public ResponseEntity<?> getProfitRank(){
		return ResponseEntity.ok().body(adminProfitService.getProfitRank());
	}
	
	@GetMapping("/admin/rank/user")
	public ResponseEntity<?> getRankRank(){
		return ResponseEntity.ok().body(adminProfitService.getUserRank());
	}
	@GetMapping("/admin/rank/date")
	public ResponseEntity<?> getRankDate() {
		System.out.println(adminProfitService.getDateRank());
		return ResponseEntity.ok().body(adminProfitService.getDateRank());
	}
			
}
