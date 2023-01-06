package com.oneao.ringcard_backend.web.user;

import com.oneao.ringcard_backend.config.auth.PrincipalDetails;
import com.oneao.ringcard_backend.domain.answer.SpringDataJpaAnswerRepository;
import com.oneao.ringcard_backend.domain.question.Question;
import com.oneao.ringcard_backend.domain.user.DTO.DeleteAccountDto;
import com.oneao.ringcard_backend.domain.user.User;
import com.oneao.ringcard_backend.service.QuestionService;
import com.oneao.ringcard_backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.function.Function;


@RestController
@RequiredArgsConstructor
@RequestMapping("mypage/delete/account")
public class DeleteAccountController {

    private final UserService userService;
    private final QuestionService questionService;
    private final SpringDataJpaAnswerRepository answerRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @GetMapping()
    public String deleteAccountForm() {
        return "mypage/deleteAccount";
    }

    @PostMapping()
    public ResponseEntity<HashMap<String, Boolean>> deleteAccount(@Valid @RequestBody DeleteAccountDto requestBody, @AuthenticationPrincipal PrincipalDetails loginUser, HttpServletRequest request, HttpServletResponse httpServletResponse) {
        HashMap<String, Boolean> response=new HashMap<>(1){{
            put("passwordError",false);
        }};

        String password = requestBody.getPassword();
        String encPassword = bCryptPasswordEncoder.encode(password);

        User user =  loginUser.getUser();
        Long userId = user.getId();
        if (bCryptPasswordEncoder.matches(password, user.getPassword())) {
            for (Question question : questionService.findAllByUserId(userId)) {
                Long questionId = question.getId();
                answerRepository.deleteByQuestionIdLike(questionId);
                questionService.delete(questionId);
            }
            userService.deleteAccount(userId);
            Cookie cookie = new Cookie("Ringcard", null); // Not necessary, but saves bandwidth.
            cookie.setPath("/");
            cookie.setHttpOnly(true);
            cookie.setMaxAge(0); // Don't set to -1 or it will become a session cookie!
            httpServletResponse.addCookie(cookie);

        } else {
            response.put("passwordError", true);
        }
        return ResponseEntity.ok(response);
    }

//    @PostMapping()
//    public ResponseEntity<HashMap<String, Boolean>> deleteAccount(@AuthenticationPrincipal PrincipalDetails loginUser, String password, RedirectAttributes redirectAttributes, HttpServletRequest request) {
//        HashMap<String, Boolean> response=new HashMap<>(1){{
//            put("passwordError",false);
//        }};
//
//        User user =  loginUser.getUser();
//        Long userId = user.getId();
//        if (Objects.equals(password, user.getPassword())) {
//            for (Question question : questionService.findAllByUserId(userId)) {
//                Long questionId = question.getId();
//                answerRepository.deleteByQuestionIdLike(questionId);
//                questionService.delete(questionId);
//            }
//            userService.deleteAccount(userId);
//            response.put("passwordError", true);
//            return ResponseEntity.ok(response);
//        } else {
////            redirectAttributes.addAttribute("passwordFalse", true);
//            return ResponseEntity.ok(response);
//        }
//    }
}
