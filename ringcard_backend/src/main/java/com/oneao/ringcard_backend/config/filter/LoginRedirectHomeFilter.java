package com.oneao.ringcard_backend.config.filter;

import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Objects;

@Component
public class LoginRedirectHomeFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {

        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;
        System.out.println("req.getServletPath() = " + req.getServletPath());
        if (Objects.equals(req.getServletPath(), "/login") && res.getStatus() == 200) {
            res.setStatus(302);
            res.setHeader("Location", "/home/unanswered");

            chain.doFilter(request, res);

        } else{
            chain.doFilter(request, response);
        }


    }
}