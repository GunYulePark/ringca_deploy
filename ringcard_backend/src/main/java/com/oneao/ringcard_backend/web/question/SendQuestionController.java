package com.oneao.ringcard_backend.web.question;

import com.oneao.ringcard_backend.domain.DTO.SendMailDto;
import com.oneao.ringcard_backend.domain.question.QuestionSendDto;
import com.oneao.ringcard_backend.domain.user.User;
import com.oneao.ringcard_backend.domain.question.Question;
import com.oneao.ringcard_backend.service.AnswerService;
import com.oneao.ringcard_backend.service.MailService;
import com.oneao.ringcard_backend.service.UserService;
import com.oneao.ringcard_backend.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;

import java.sql.Array;
import java.util.List;

import static java.sql.Types.NULL;

@EnableAsync
@Controller
@RequiredArgsConstructor
@RestController
public class SendQuestionController {

    private final QuestionService questionService;
    private final AnswerService answerService;
    private final UserService userService;
    private final MailService mailService;

    @PostMapping({"question/{questionId}/anony"})
    public void addQuestionQuestionAnony(@PathVariable Long questionId, RedirectAttributes redirectAttributes, HttpServletRequest request,@RequestBody QuestionSendDto requestBody) {

        // 이미 띄워져있는 question의 정보
        Question beforeQuestion= questionService.findByIdNoAuth(questionId).get();
        Long userId = beforeQuestion.getUserId();

    // new Question 시작
        String questionContents = requestBody.getQuestionContents();
        String questionHyperlink = requestBody.getQuestionHyperlink();
        Integer questionNoteType = requestBody.getNoteType();
        Integer questionTapeType = requestBody.getTapeType();
        Integer questionTapePosition = requestBody.getTapePosition();


        Integer[] noteList = { 1, 2, 3, 4 };
        Integer[] tapeList = { 1, 2, 3, 4, 5 };
        Integer[] tapePositionList = {1, 2, 3, 4, 5, 6};

        if (questionNoteType == null) {
            int noteIdx = (int) (Math.random() * noteList.length);
            questionNoteType = noteList[noteIdx];
        }
        if (questionTapeType == null) {
            int tapeIdx = (int) (Math.random() * tapeList.length);
            questionTapeType = tapeList[tapeIdx];
        }
        if (questionTapePosition == null) {
            int tapePositionIdx = (int) (Math.random() * tapePositionList.length);
            questionTapePosition = tapePositionList[tapePositionIdx];
        }

        Question question = new Question(questionContents, questionHyperlink, userId, false, false, false, questionNoteType, questionTapeType, questionTapePosition);

        Question savedQuestion = questionService.save(question);

        User user = userService.findById(userId).get();

        if(user.isEmailAlert()) {
            String userEmail = user.getUserEmail();
            SendMailDto dto = mailService.sendNewQuestionMail(userEmail);
            mailService.mailSend(dto);

        }

    }

    @PostMapping({"userHome/{username}"})
    public void addQuestionUserHome(@PathVariable String username, HttpServletRequest request, @RequestBody QuestionSendDto requestBody) {
        User user = userService.findByUsername(username).get();

        String questionContents = requestBody.getQuestionContents();
        String questionHyperlink = requestBody.getQuestionHyperlink();
        Integer questionNoteType = requestBody.getNoteType();
        Integer questionTapeType = requestBody.getTapeType();
        Integer questionTapePosition = requestBody.getTapePosition();

        Integer[] noteList = { 1, 2, 3, 4 };
        Integer[] tapeList = { 1, 2, 3, 4, 5 };
        Integer[] tapePositionList = {1, 2, 3, 4, 5, 6};

        if (questionNoteType == null) {
            int noteIdx = (int) (Math.random() * noteList.length);
            questionNoteType = noteList[noteIdx];
        }
        if (questionTapeType == null) {
            int tapeIdx = (int) (Math.random() * tapeList.length);
            questionTapeType = tapeList[tapeIdx];
        }
        if (questionTapePosition == null) {
            int tapePositionIdx = (int) (Math.random() * tapePositionList.length);
            questionTapePosition = tapePositionList[tapePositionIdx];
        }

        Long userId = user.getId();
        Question question = new Question(questionContents, questionHyperlink, userId, false, false, false, questionNoteType, questionTapeType, questionTapePosition);

        Question savedQuestion = questionService.save(question);

        if(user.isEmailAlert()) {
            String userEmail = user.getUserEmail();
            SendMailDto dto = mailService.sendNewQuestionMail(userEmail);
            mailService.mailSend(dto);
        }


    }
}
