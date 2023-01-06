package com.oneao.ringcard_backend.config;

import com.oneao.ringcard_backend.config.filter.LoginRedirectHomeFilter;
import com.oneao.ringcard_backend.config.oauth.PrincipalOauth2UserService;
import com.oneao.ringcard_backend.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.session.DisableEncodeUrlFilter;

@RequiredArgsConstructor
@Slf4j
@Configuration
@EnableWebSecurity(debug = true) // 스프링 시큐리티 필터(이 파일)가  스프링 필터체인에 등록이 됩니다.
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true) // 특정 주소 접근시 권한 및 인증을 위한 어노테이션 활성화
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private final CorsConfig corsConfig;

    private final UserService userService;

    private final AuthenticationFailureHandler customFailureHandler;

    @Autowired
    private PrincipalOauth2UserService principalOauth2UserService;


    // 해당 메소드는 리턴되는 오브젝트를 IoC로 등록해준다.
    @Bean
    public BCryptPasswordEncoder encodePwd() {
        return new BCryptPasswordEncoder();
    }


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.authorizeRequests()
                .mvcMatchers(HttpMethod.OPTIONS, "/**").permitAll() // Preflight Request 허용해주기
//                .antMatchers("/home/**", "/mypage/**", "/**/user")
                .antMatchers(  "/joinForm","/loginForm", "/login", "/logout", "/findPassword/**", "/userHome/**", "/**/anony/**", "/lo", "/log", "/login/user/me").permitAll()
                .anyRequest().authenticated()
            .and()
                .formLogin()
                .successForwardUrl("/home/unanswered")
                .defaultSuccessUrl("/home/unanswered")
                .loginPage("/loginForm")
                .loginProcessingUrl("/login")
            .and()
                .oauth2Login()
                .loginPage("/loginForm")
                .userInfoEndpoint()
                .userService(principalOauth2UserService);

        http.formLogin()
                .successForwardUrl("/home/unanswered")
                .defaultSuccessUrl("/home/unanswered")
                .loginPage("/loginForm")
                .loginProcessingUrl("/login")

                .failureHandler(customFailureHandler) // 로그인 실패 핸들러
                .and()
                .addFilter(corsConfig.corsFilter())
                .addFilter(new JwtAuthenticationFilter(authenticationManager()))
                .addFilter(new JwtAuthorizationFilter(authenticationManager(), userService))
                .addFilterBefore(new LoginRedirectHomeFilter(), DisableEncodeUrlFilter.class);
        http.logout()
                .logoutUrl("/logout")
//                .logoutSuccessUrl("/loginForm").permitAll()
                .deleteCookies(JwtProperties.COOKIE_NAME)
                .invalidateHttpSession(true)
                .logoutSuccessHandler(new CustomLogoutSuccessHandler());
    }

}
