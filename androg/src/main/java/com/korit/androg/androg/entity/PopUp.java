package com.korit.androg.androg.entity;

import com.korit.androg.androg.dto.admin.PopUpRespDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PopUp {
	private int popUpId;
	private String content;
	
	public PopUpRespDto toDto() {
		return PopUpRespDto.builder()
							.popUpId(popUpId)
							.content(content)
							.build();
	}
}
