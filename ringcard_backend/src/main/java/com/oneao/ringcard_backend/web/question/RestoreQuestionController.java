package com.oneao.ringcard_backend.web.question;

import com.oneao.ringcard_backend.config.auth.PrincipalDetails;
import com.oneao.ringcard_backend.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import javax.servlet.http.HttpServletRequest;


@Controller
@RequiredArgsConstructor
public class RestoreQuestionController {
    private final QuestionService questionService;

    @GetMapping("question/{questionId}/restore/question")
    public String restoreQuestionController(@PathVariable Long questionId, @AuthenticationPrincipal PrincipalDetails loginUser, HttpServletRequest request){
        questionService.updateInTrash(questionId);
        return "redirect:" + request.getHeader("Referer");
    }
}