package com.oneao.ringcard_backend.web;

import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class CustomAuthFailureHandler extends SimpleUrlAuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
                                        AuthenticationException exception) throws IOException, ServletException {
//        String errorMessage;
//        if (exception instanceof BadCredentialsException) {
//            errorMessage = "password / id does not match";
//        } else if (exception instanceof InternalAuthenticationServiceException) {
//            errorMessage = "system error";
//        } else if (exception instanceof UsernameNotFoundException) {
//            errorMessage = "no account";
//        } else if (exception instanceof AuthenticationCredentialsNotFoundException) {
//            errorMessage = "authentication denied";
//        } else {
//            errorMessage = "Idon'tknow either";
//        }
//        setDefaultFailureUrl("/auth/login?error=true&exception="+errorMessage);
//
//        super.onAuthenticationFailure(request, response, exception);
    }
}