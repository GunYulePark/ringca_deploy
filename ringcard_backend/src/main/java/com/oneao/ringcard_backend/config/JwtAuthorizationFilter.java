package com.oneao.ringcard_backend.config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.oneao.ringcard_backend.config.auth.PrincipalDetails;
import com.oneao.ringcard_backend.domain.user.User;
import com.oneao.ringcard_backend.service.UserService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

// 시큐리티가 가지고 있는 BasicAuthenticationFilter
// 권한이나 인증이 필요한 특정 주소를 요청했을 때, 위 필터를 무조건 타게 되어 있다.
// 만약, 권한이나 인증이 필요한 주소가 아니라면 이 필터를 안 탄다.
public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

    private UserService userService;

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager, UserService userService) {
        super(authenticationManager);
        this.userService = userService;
    }

    // 인증이나 권한이 필요한 주소 요청이 있을 때 해당 필터를 타게 됨.
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        System.out.println("인증이나 권한이 필요한 주소가 요청됨.");
        Cookie[] cookies = request.getCookies();
        if (cookies == null) {
            chain.doFilter(request, response);
            return;
        }
        String jwtToken = null;
        if (cookies == null) {
            chain.doFilter(request, response);
            return;}

        for (Cookie cookie : cookies) {
            if (cookie.getName().equals(JwtProperties.COOKIE_NAME)) {
                jwtToken = cookie.getValue();
            }
        }
        if (jwtToken == null) {
            System.out.println("Token doesn't exist");
            chain.doFilter(request, response);
            return;
        }

        // jwt 토큰을 검증해서 정상적인 사용자인지 확인
        String username = JWT.require(Algorithm.HMAC512(JwtProperties.SECRET)).build().verify(jwtToken).getClaim("username").asString();

        // 서명이 정상적으로 됨
        if (username != null) {
            User userEntity = userService.findByUsername(username).get();

           PrincipalDetails principalDetails = new PrincipalDetails(userEntity);

            // Jwt 토큰 서명을 통해서 서명이 정상이면 Authentication 객체를 만들어 준다.
            Authentication authentication = new UsernamePasswordAuthenticationToken(principalDetails, null, principalDetails.getAuthorities());

            // 강제로 시큐리티의 세션에 접근하여 Authentication 객체를 저장.
            SecurityContextHolder.getContext().setAuthentication(authentication);

            chain.doFilter(request, response);
        }
    }
}
