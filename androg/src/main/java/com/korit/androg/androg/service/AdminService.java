package com.korit.androg.androg.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.korit.androg.androg.dto.admin.getColorResDto;
import com.korit.androg.androg.repository.AdminRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminService {
	public final AdminRepository adminRepository;
	public List<getColorResDto> getColors() {
		return adminRepository.getColors();
	}
	
	public int popUpRegister (String content) {
		return adminRepository.popUpRegister(content);
	}
}
