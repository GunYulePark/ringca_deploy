package com.oneao.ringcard_backend.web.home;

import com.oneao.ringcard_backend.domain.answer.Answer;
import com.oneao.ringcard_backend.domain.user.User;
import com.oneao.ringcard_backend.domain.question.Question;
import com.oneao.ringcard_backend.domain.question.QuestionSearchCond;
import com.oneao.ringcard_backend.service.AnswerService;
import com.oneao.ringcard_backend.service.UserService;
import com.oneao.ringcard_backend.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;


//멤버 홈 - 응답 질문
@Controller
@RequiredArgsConstructor
public class ShowUserHomeController {
    private final QuestionService questionService;
    private final AnswerService answerService;
    private final UserService userService;
    @GetMapping("userHome/{username}/{page}")
    public ResponseEntity<Model> showHomeAnswered(@PathVariable String username, Model model, @PathVariable int page) {
//        User user= userService.findByUsername(username).get();
        Optional userOptional= userService.findByUsername(username);
        User user = (User) userOptional.orElse(null);
        // Optional .orElseThrow()로 값 가져오기
        // https://minchul-son.tistory.com/472
        Long userId = user.getId();
        QuestionSearchCond questionSearchCond = new QuestionSearchCond(true, false);
        PageRequest pageRequest = PageRequest.of(page, 15, Sort.by("uploadTime").descending());
        Page<Question> questions =questionService.findAll(userId, questionSearchCond, pageRequest);

        List<Object> map = new ArrayList<>();
        for (Question question : questions.getContent()) {
            Long qId = question.getId();
//            Answer answer = answerService.findByQuestionId(qId).get();
            Optional answerOptional = answerService.findByQuestionId(qId);
            Answer answer = (Answer) answerOptional.orElse(null);
            List<Object> innerMap = new ArrayList<>();
            innerMap.add(question);
            innerMap.add(answer);
            map.add(innerMap);
        }
        HashMap<String, Integer> pageInfo = new HashMap<>(2){{
            put("totalPages", questions.getTotalPages());
            put("number", questions.getNumber());
        }};

        System.out.println("user.getUserRingcardName() = " + user.getUserRingcardName());
        model.addAttribute("userRingcardName" , user.getUserRingcardName());
        model.addAttribute("map", map);
        model.addAttribute("pageInfo", pageInfo);


        return ResponseEntity.ok(model);
    }

}