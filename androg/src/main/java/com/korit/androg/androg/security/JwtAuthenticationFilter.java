package com.korit.androg.androg.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.filter.GenericFilterBean;

import com.korit.androg.androg.exception.CustomException;
import com.korit.androg.androg.security.jwt.JwtTokenProvider;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends GenericFilterBean {
	private final JwtTokenProvider jwtTokenProvider;

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {

		HttpServletRequest httpServletRequest = (HttpServletRequest) request;
//		HttpServletResponse httpServletResponse = (HttpServletResponse) response;
		String accessToken = jwtTokenProvider.getToken(httpServletRequest.getHeader("Authorization"));
//		System.out.println(accessToken + httpServletRequest.getRequestURI());
		boolean validatedFlag = jwtTokenProvider.validateToken(accessToken);
		if (validatedFlag) {
			Authentication authentication = jwtTokenProvider.getAuthentication(accessToken);
			SecurityContextHolder.getContext().setAuthentication(authentication);
		}
//		if (!httpServletRequest.getRequestURI().startsWith("/auth")
//				&& !httpServletRequest.getRequestURI().startsWith("/products")
//				&& !httpServletRequest.getRequestURI().startsWith("/image")) {
//			throw new UsernameNotFoundException("로그인!!!!");
//		}
//		System.out.println(httpServletRequest.getRequestURI());
		chain.doFilter(request, response);
//		System.out.println(httpServletRequest.getRequestURI());
//		System.out.println(httpServletResponse.getStatus());
	
	}
	
}
