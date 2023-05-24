package com.korit.androg.androg.repository.admin;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.korit.androg.androg.dto.admin.AdminNoticeReqDto;
import com.korit.androg.androg.dto.admin.PopUpRespDto;
import com.korit.androg.androg.entity.Notice;
@Mapper
public interface AdminNoticeRepository {
	//popUp
		public PopUpRespDto getPopUpList();
		public int popUpRegister (String content);
		public int popUpModify(String content);
		public int popDelete(int popUpId);
	//notice
		public int noticeRegister(AdminNoticeReqDto adminNoticeReqDto);
		public Notice getNotice();
		public int noticeModify(AdminNoticeReqDto adminNoticeReqDto);
		public int noticeDelete(int noticeId);
}
