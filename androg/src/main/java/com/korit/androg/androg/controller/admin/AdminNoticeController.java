package com.korit.androg.androg.controller.admin;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.korit.androg.androg.dto.admin.AdminNoticeReqDto;
import com.korit.androg.androg.service.admin.AdminNoticeService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class AdminNoticeController {
	public final AdminNoticeService adminNoticeService;
	@GetMapping("/auth/pop-up")
	public ResponseEntity<?> getPopUp() {
		return ResponseEntity.ok().body(adminNoticeService.getPopUpList());
	}
	
	@PostMapping("/admin/pop-up/register")
	public ResponseEntity<?> popUpRegister(@RequestBody Map<String, Object> requestMap) {
		String content = (String) requestMap.get("content");
		return ResponseEntity.ok().body(adminNoticeService.popUpRegister(content));
	}
	
	@PutMapping("/admin/pop-up/modify")
	public ResponseEntity<?> popUpModify(@RequestBody Map<String, Object> requestMap){
		String content = (String) requestMap.get("content");
		return ResponseEntity.ok().body(adminNoticeService.popUpModify(content));
	}
	@DeleteMapping("/admin/pop-up")
	public ResponseEntity<?> popUpDelete(int popUpId){
		System.out.println(popUpId);
		return ResponseEntity.ok().body(adminNoticeService.popUpDelete(popUpId));
	}
	//notice
	@PostMapping("/admin/notice/register")
	public ResponseEntity<?> noticeRegister(@RequestBody AdminNoticeReqDto adminNoticeReqDto){
//		System.out.println(requestMap);
		return ResponseEntity.ok().body(adminNoticeService.noticeRegister(adminNoticeReqDto));
	}
	@GetMapping("/auth/notice")
	public ResponseEntity<?> getNotice(){
		return ResponseEntity.ok().body(adminNoticeService.getNotice());
	}
	@PutMapping("/admin/notice/modify")
	public ResponseEntity<?> noticeModify(@RequestBody AdminNoticeReqDto adminNoticeReqDto){
		return ResponseEntity.ok().body(adminNoticeService.noticeModify(adminNoticeReqDto));
	}
	@DeleteMapping("/admin/notice/{noticeId}")
	public ResponseEntity<?> noticeDelete(@PathVariable int noticeId){
		return ResponseEntity.ok().body(adminNoticeService.noticeDelete(noticeId));
	}
}
