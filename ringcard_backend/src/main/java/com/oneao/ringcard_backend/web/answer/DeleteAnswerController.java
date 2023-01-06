package com.oneao.ringcard_backend.web.answer;

import com.oneao.ringcard_backend.config.auth.PrincipalDetails;
import com.oneao.ringcard_backend.domain.answer.Answer;
import com.oneao.ringcard_backend.service.AnswerService;
import com.oneao.ringcard_backend.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import javax.servlet.http.HttpServletRequest;


@Controller
@RequiredArgsConstructor
public class DeleteAnswerController {
    private final AnswerService answerService;
    private final QuestionService questionService;

    @GetMapping("question/{questionId}/deleteAnswer")
    public String deleteAnswer(@PathVariable Long questionId, @AuthenticationPrincipal PrincipalDetails loginUser, HttpServletRequest request) {
        Long userId = loginUser.getUser().getId();
        Answer answer = answerService.findByQuestionId(questionId).get();
        answerService.deleteAnswer(answer.getId());
        questionService.updateToUnanswered(questionId);
        return "redirect:" + request.getHeader("Referer");
    }
}
