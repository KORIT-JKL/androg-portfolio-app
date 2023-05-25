package com.korit.androg.androg.repository.admin;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.korit.androg.androg.entity.Notice;
import com.korit.androg.androg.entity.PopUp;
@Mapper
public interface AdminNoticeRepository {
	//popUp
		public PopUp getPopUpList();
		public int popUpRegister (String content);
		public int popUpModify(String content);
		public int popDelete(int popUpId);
	//notice
		public int noticeRegister(Map<String, Object> requestMap);
		public Notice getNotice();
}
