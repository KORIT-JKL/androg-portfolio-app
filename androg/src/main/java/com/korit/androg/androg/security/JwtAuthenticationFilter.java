package com.korit.androg.androg.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import com.korit.androg.androg.security.jwt.JwtTokenProvider;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends GenericFilterBean {
	private final JwtTokenProvider jwtTokenProvider;

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
	
		HttpServletRequest httpRequest  = (HttpServletRequest) request;
		String accessToken = httpRequest.getHeader("Authorization");
		if(accessToken == null) {
			log.warn("토큰 미발행; 미인증");
		} else {
			accessToken = jwtTokenProvider.getToken(accessToken);
			jwtTokenProvider.validateToken(accessToken);
			boolean validationFlag = jwtTokenProvider.validateToken(accessToken);
			
			if(validationFlag) {
				Authentication authentication = jwtTokenProvider.getAuthentication(accessToken);
				SecurityContextHolder.getContext().setAuthentication(authentication);
			}
		}
		chain.doFilter(request, response);
	}
	
	
	
}
