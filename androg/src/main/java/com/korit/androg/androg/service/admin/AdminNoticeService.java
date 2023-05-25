package com.korit.androg.androg.service.admin;

import java.util.Map;

import org.springframework.stereotype.Service;

import com.korit.androg.androg.dto.admin.PopUpRespDto;
import com.korit.androg.androg.entity.Notice;
import com.korit.androg.androg.entity.PopUp;
import com.korit.androg.androg.repository.admin.AdminNoticeRepository;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class AdminNoticeService {
	public final AdminNoticeRepository adminNoticeRepository;
	
//notice
	public int noticeRegister(Map<String, Object>requestMap) {
		return adminNoticeRepository.noticeRegister(requestMap);
	}
	public Notice getNotice() {
		return adminNoticeRepository.getNotice();
	}
	public int popUpRegister (String content) {
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
	
}
