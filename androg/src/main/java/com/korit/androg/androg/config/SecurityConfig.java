package com.korit.androg.androg.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.korit.androg.androg.security.JwtAuthenticationEntryPoint;
import com.korit.androg.androg.security.JwtAuthenticationFilter;
import com.korit.androg.androg.security.jwt.JwtTokenProvider;
import com.korit.androg.androg.security.oauth2.OAuth2SuccessHandler;
import com.korit.androg.androg.service.OAuth2Service;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	private final JwtTokenProvider jwtTokenProvider;
	private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
	private final OAuth2SuccessHandler auth2SuccessHandler;
	private final OAuth2Service oAuth2Service;
	
	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.httpBasic().disable();
		http.formLogin().disable();
		http.cors();
		http.csrf().disable();
		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		
		http.authorizeRequests()
			.antMatchers("/auth/**","/products/**")
			.permitAll()
			.antMatchers("/admin/**")
			.hasRole("ADMIN")
			.anyRequest()
			.authenticated()
			.and()
			.addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class)
			.exceptionHandling()
			.authenticationEntryPoint(jwtAuthenticationEntryPoint)
			.and()
			.oauth2Login()
			.loginPage("http://localhost:3000/auth/login")
			.successHandler(auth2SuccessHandler)
			.userInfoEndpoint()
			.userService(oAuth2Service);
	}
	
	
	
}
