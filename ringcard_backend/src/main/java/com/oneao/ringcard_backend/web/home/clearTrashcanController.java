package com.oneao.ringcard_backend.web.home;

import com.oneao.ringcard_backend.config.auth.PrincipalDetails;
import com.oneao.ringcard_backend.service.AnswerService;
import com.oneao.ringcard_backend.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpServletRequest;


@Controller
@RequiredArgsConstructor
public class clearTrashcanController {
    private final QuestionService questionService;
    private final AnswerService answerService;

    @GetMapping("home/trashcan/clearTrashcan")
    public String clearTrashcan(@AuthenticationPrincipal PrincipalDetails loginUser, Model model, HttpServletRequest request) {
        Long userId = loginUser.getUser().getId();
        questionService.clearTrashcan(userId);

        return "redirect:" + request.getHeader("Referer");
    }

}
