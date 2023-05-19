package com.korit.androg.androg.service;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.korit.androg.androg.dto.LoginReqDto;
import com.korit.androg.androg.dto.SignupReqDto;
import com.korit.androg.androg.dto.auth.JwtRespDto;
import com.korit.androg.androg.dto.auth.PrincipalRespDto;
import com.korit.androg.androg.entity.Authority;
import com.korit.androg.androg.entity.User;
import com.korit.androg.androg.exception.CustomException;
import com.korit.androg.androg.exception.ErrorMap;
import com.korit.androg.androg.repository.UserRepository;
import com.korit.androg.androg.security.jwt.JwtTokenProvider;

import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService implements UserDetailsService {
	
	private final JwtTokenProvider jwtTokenProvider;
	private final UserRepository userRepository;
	private final AuthenticationManagerBuilder authenticationManagerBuilder;
	
	public void checkDuplicatedEmail(String email) {
		if(userRepository.findUserByEmail(email) != null) {
			throw new CustomException("Duplicated Email",
					ErrorMap.builder()
					.put("email", "이미 사용중인 email입니다.")
					.build());
		};
	};
	
	public void signup(SignupReqDto signupReqDto) {
		User userEntity = signupReqDto.toEntity();
		userRepository.saveUser(userEntity);
		userRepository.saveAuthority(Authority.builder().userId(userEntity.getUserId()).roleId(2).build());
	};
	
	
	public JwtRespDto signin(LoginReqDto loginReqDto) {
		System.out.println(loginReqDto);
		UsernamePasswordAuthenticationToken authenticationToken =
				new UsernamePasswordAuthenticationToken(loginReqDto.getEmail(), loginReqDto.getPassword());
		
		Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
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
	
	public boolean authenticated(String accessToken) {
		return jwtTokenProvider.validateToken(jwtTokenProvider.getToken(accessToken));
	}
	
	public PrincipalRespDto getPrincipal(String accessToken) {
		Claims claims = jwtTokenProvider.getClaims(jwtTokenProvider.getToken(accessToken));
		User userEntity = userRepository.findUserByEmail(claims.getSubject());
		
		return PrincipalRespDto.builder()
				.userId(userEntity.getUserId())
				.email(userEntity.getEmail())
				.name(userEntity.getName())
				.authorities((String) claims.get("auth"))
				.build();
		
	}
	
}
