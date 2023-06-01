package com.korit.androg.androg.service.admin;

import org.springframework.stereotype.Service;

import com.korit.androg.androg.dto.admin.AdminNoticeReqDto;
import com.korit.androg.androg.entity.Notice;
import com.korit.androg.androg.entity.PopUp;
import com.korit.androg.androg.repository.admin.AdminNoticeRepository;
import com.korit.androg.androg.service.ErrorService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminNoticeService {
	private final AdminNoticeRepository adminNoticeRepository;
	private final ErrorService errorService;
	private int minSubjectLength = 4;
	private int maxSubjectLength = 15;

	public int popUpRegister(String content) {
		errorService.blankCheck(content);
		return adminNoticeRepository.popUpRegister(content);
	}
	public PopUp getPopUpList(){
		return  adminNoticeRepository.getPopUpList();
	}

	public int popUpModify(String content) {
		errorService.blankCheck(content);
		return adminNoticeRepository.popUpModify(content);
	}

	public int popUpDelete(int popUpId) {
		return adminNoticeRepository.popDelete(popUpId);
	}

	// notice
	public int noticeRegister(AdminNoticeReqDto adminNoticeReqDto) {
		errorService.blankCheck(adminNoticeReqDto.getSubject());
		errorService.minMaxLengthCheck("제목", adminNoticeReqDto.getSubject(), minSubjectLength, maxSubjectLength);
		errorService.blankCheck(adminNoticeReqDto.getContent());
		return adminNoticeRepository.noticeRegister(adminNoticeReqDto);
	}

	public Notice getNotice() {
		return adminNoticeRepository.getNotice();
	}
	
	public int noticeModify(AdminNoticeReqDto adminNoticeReqDto) {
		return adminNoticeRepository.noticeModify(adminNoticeReqDto);
	}
	
	public int noticeDelete(int noticeId) {
		return adminNoticeRepository.noticeDelete(noticeId);
	}

}
