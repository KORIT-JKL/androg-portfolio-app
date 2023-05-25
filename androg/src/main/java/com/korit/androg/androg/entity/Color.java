package com.korit.androg.androg.entity;

import com.korit.androg.androg.dto.admin.ColorRespDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Color {
	private int colorId;
	private String colorName;
	
	public ColorRespDto toDto() {
		return ColorRespDto.builder()
							.colorId(colorId)
							.colorName(colorName)
							.build();
	}
}
