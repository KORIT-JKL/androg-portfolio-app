package com.korit.androg.androg.service.admin;

import java.util.Map;

import org.springframework.stereotype.Service;

import com.korit.androg.androg.dto.admin.AdminNoticeReqDto;
import com.korit.androg.androg.dto.admin.PopUpRespDto;
import com.korit.androg.androg.entity.Notice;
import com.korit.androg.androg.entity.PopUp;
import com.korit.androg.androg.repository.admin.AdminNoticeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminNoticeService {
	public final AdminNoticeRepository adminNoticeRepository;

	public int popUpRegister(String content) {
		return adminNoticeRepository.popUpRegister(content);
	}
	public PopUpRespDto getPopUpList(){
		PopUp popUp = adminNoticeRepository.getPopUpList();
		return popUp.toDto();
	}

	public int popUpModify(String content) {
		return adminNoticeRepository.popUpModify(content);
	}

	public int popUpDelete(int popUpId) {
		return adminNoticeRepository.popDelete(popUpId);
	}

	// notice
	public int noticeRegister(AdminNoticeReqDto adminNoticeReqDto) {
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
