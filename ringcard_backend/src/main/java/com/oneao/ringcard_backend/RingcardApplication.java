package com.oneao.ringcard_backend;

import com.oneao.ringcard_backend.config.*;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;

@Import({SpringDataJpaConfig.class, SecurityConfig.class, CorsConfig.class, EmailConfig.class, JasyptConfig.class})
@SpringBootApplication(scanBasePackages = "com.oneao.ringcard_backend.web")
public class RingcardApplication {
	public static void main(String[] args) {
		SpringApplication.run(RingcardApplication.class, args);
	}
}
