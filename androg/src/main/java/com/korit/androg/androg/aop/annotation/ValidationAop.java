package com.korit.androg.androg.aop.annotation;

import org.springframework.stereotype.Component;

@Aspect
@Component
public class ValidationAop {
	
	@Pointcut("@annotation(com.korit.androg.androg.aop.annotation.ValidAspect)")
	private void pointCut() {}
}
