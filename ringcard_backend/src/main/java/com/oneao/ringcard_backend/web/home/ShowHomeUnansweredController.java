package com.oneao.ringcard_backend.web.home;

import com.oneao.ringcard_backend.config.auth.PrincipalDetails;
import com.oneao.ringcard_backend.domain.question.JpaQuestionRepository;
import com.oneao.ringcard_backend.domain.question.Question;
import com.oneao.ringcard_backend.domain.question.QuestionSearchCond;
import com.oneao.ringcard_backend.domain.question.SpringDataJpaQuestionRepository;
import com.oneao.ringcard_backend.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;


@Controller
@RequiredArgsConstructor
public class ShowHomeUnansweredController {
    private final QuestionService questionService;
    private final SpringDataJpaQuestionRepository springDataJpaQuestionRepository;
    private final JpaQuestionRepository jpaQuestionRepository;
//    @GetMapping("home/unanswered/{page}")
//    public ResponseEntity<Page<Question>> showHomeUnAnswered(@AuthenticationPrincipal PrincipalDetails loginUser, @PathVariable int page) {
//        Long userId = loginUser.getUser().getId();
//        QuestionSearchCond questionSearchCond = new QuestionSearchCond(false, false);
//
//        PageRequest pageRequest = PageRequest.of(page, 5, Sort.by("uploadTime").descending());
//        Page<Question> questions =questionService.findAll(userId, questionSearchCond, pageRequest);
//
//        return ResponseEntity.ok(questions);
//    }
    @GetMapping("home/unanswered")
    public ResponseEntity<Model> showHomeUnAnswered(@AuthenticationPrincipal PrincipalDetails loginUser, @PageableDefault(size=7, sort="uploadTime", direction = Sort.Direction.DESC) Pageable pageable, Model model) {
        Long userId = loginUser.getUser().getId();
        String userName = loginUser.getUsername();
        QuestionSearchCond questionSearchCond = new QuestionSearchCond(false, false);
        Page<Question> questions =questionService.findAll(userId, questionSearchCond, pageable);
        model.addAttribute("userName", userName);
        model.addAttribute("questions", questions);

        return ResponseEntity.ok(model);
    }

//    @GetMapping("home/unanswered")
//    public ResponseEntity<Page<Question>> showHomeAnswered(@AuthenticationPrincipal PrincipalDetails loginUser, Model model, @PageableDefault(size=5) Pageable pageable) {
//        System.out.println("loginUser = " + loginUser);
//        Long userId = loginUser.getUser().getId();
//        QuestionSearchCond questionSearchCond = new QuestionSearchCond(false, false);
////        List<Question> questions = questionService.findAll(userId, questionSearchCond, pageRequest);
//
//        PageRequest pageRequest = PageRequest.of(2, 5);
////        PageRequest pageRequest = PageRequest.of(0, 5);
//        Page<Question> questions =questionService.findAll(userId, questionSearchCond, pageable);
////        System.out.println("eee=" + questions);
////        Criteria cri = new Criteria();
////        cri.setPageNum(2);
//////        List<Question> list = springDataJpaQuestionRepository.getListPaging(cri);
////        List<Question> list = jpaQuestionRepository.getListPaging(cri);
////        list.forEach(board -> System.out.println("" + board));
//
////        System.out.println(questions);
////        model.addAttribute("questions", questions);
//
//        return ResponseEntity.ok(questions);
//    }
}
