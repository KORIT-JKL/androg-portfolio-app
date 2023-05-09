package com.korit.androg.androg.service;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.korit.androg.androg.dto.LoginReqDto;
import com.korit.androg.androg.dto.auth.JwtRespDto;
import com.korit.androg.androg.entity.User;
import com.korit.androg.androg.exception.CustomException;
import com.korit.androg.androg.exception.ErrorMap;
import com.korit.androg.androg.repository.UserRepository;
import com.korit.androg.androg.security.jwt.JwtTokenProvider;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService implements UserDetailsService {
	
	private final JwtTokenProvider jwtTokenProvider;
	private final UserRepository userRepository;
	private final AuthenticationManagerBuilder authenticationManagerBuilder;
	
	public JwtRespDto signin(LoginReqDto loginReqDto) {
		System.out.println(loginReqDto);
		UsernamePasswordAuthenticationToken authenticationToken =
				new UsernamePasswordAuthenticationToken(loginReqDto.getEmail(), loginReqDto.getPassword());
		
		Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
		System.out.println(authentication);
		return jwtTokenProvider.generateToken(authentication);
	}
	
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User userEntity = userRepository.findUserByEmail(username);
		
		if(userEntity == null ) {
			throw new CustomException("로그인 실패", ErrorMap.builder().put("email", "사용자 정보를 확인하세요").build());
		}
		
		return userEntity.toPrincipal();
	}
	
}
