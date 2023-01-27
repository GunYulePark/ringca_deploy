package com.oneao.ringcard_backend.config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.oneao.ringcard_backend.config.auth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;]
import com.oneao.JwtProperties;


import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;


// 스프링 시큐리티에서 UsernamePasswordAuthenticationFilter 가 있음.
// login 요청해서 username, password 전송하면 (post)
// UsernamePasswordAuthenticationFilter 가 동작을 함.

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        System.out.println("JwtAuthenticationFilter : 로그인 시도 중");
        // 얘는 requestBody의 파라미터를 다 읽어오는 애들임.
//        Enumeration<String> params = request.getParameterNames();
//        while(params.hasMoreElements()){
//            String paramName = params.nextElement();
//            System.out.println("Parameter Name - "+paramName+", Value - "+request.getParameter(paramName));
//        }
        // 1. username, password 받아서
        String paramUsername = request.getParameter("username");
        String paramPwd = request.getParameter("password");
        System.out.println("paramUsername = " + paramUsername);
        System.out.println("paramPwd = " + paramPwd);
        if(paramUsername.endsWith("<twitter>") && Objects.equals(paramPwd, "twitterTemp")) {
            System.out.println("exysexy hi");
            paramPwd = "exySexyMeganFoxy!";
        }
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(paramUsername, paramPwd);

        // 2. 정상인지 로그인 시도를 해보기. authenticationManager 로 로그인 시도를 하면
        // PrincipalDetailsService 의 loadUserByUsername()함수가 실행된 후, 정상이면 authentication 이 리턴됨.
        // DB에 있는 username 과 password 가 일치한다.
        Authentication authentication = authenticationManager.authenticate(authenticationToken);

        // 3. PrincipalDetails 를 세션에 담는다. (권한 관리 목적)
        // authentication 객체가 session 영역에 저장됨.
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        System.out.println("로그인 완료됨 : " + principalDetails.getUser().getUsername()); // => 로그인이 되었다는 뜻!

        // 4. JWT 토큰을 만들어서 응답해주면 됨.
        // authentication 객체가 session 영역에 저장을 해야 하고, 그 방법 : return 해주기
        // 리턴을 하는 이유는 권한 관리를 security 가 대신 해주기 때문에 편하려고 하는 것이다.
        // 굳이 jwt 토큰을 사용하면서 세션을 만들 이유가 없음. 근데 단지 권한처리때문에 session 을 넣어줍니다.
        return authentication;


    }

    // attemptAuthentication 실행 후, 인증이 정상적으로 되었으면 successfulAuthentication 함수가 실행됨.
    // JWT 토큰을 만들어서 request 요청한 사용자에게 JWT 토큰을 response 해주면 됨.


    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        System.out.println("successfulAuthentication 실행됨 : 인증이 완료되었다.");
        PrincipalDetails principalDetails = (PrincipalDetails) authResult.getPrincipal();

        //RSA 방식은 아니고 Hash 암호 방식
        String jwtToken = JWT.create()
                .withSubject("토큰토큰")
                .withExpiresAt(new Date(System.currentTimeMillis() + JwtProperties.EXPIRATION_TIME))
                .withClaim("id", principalDetails.getUser().getId())
                .withClaim("username", principalDetails.getUser().getUsername())
                .sign(Algorithm.HMAC512(JwtProperties.SECRET));

        Cookie jwtCookie = new Cookie(JwtProperties.COOKIE_NAME, jwtToken);
        response.addCookie(jwtCookie);

    }
}
