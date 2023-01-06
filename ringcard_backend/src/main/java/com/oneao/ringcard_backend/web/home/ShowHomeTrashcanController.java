package com.oneao.ringcard_backend.web.home;

import com.oneao.ringcard_backend.config.auth.PrincipalDetails;
import com.oneao.ringcard_backend.domain.question.Question;
import com.oneao.ringcard_backend.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;


@Controller
@RequiredArgsConstructor
public class ShowHomeTrashcanController {
    private final QuestionService questionService;

    @GetMapping("home/trashcan")
    public ResponseEntity<Model> showHomeAnswered(@AuthenticationPrincipal PrincipalDetails loginUser, @PageableDefault(size=7, sort="uploadTime", direction = Sort.Direction.DESC) Pageable pageable, Model model) {
        // list 합치기
        //CF: https://hianna.tistory.com/560 2.Collections.addAll()
//        List<Question> questions = new ArrayList<>();         // list 합치기        Collections.addAll(mergedList, list1.toArray(new String[0]));        Collections.addAll(mergedList, list2.toArray(new String[0]));
//        Long userId = loginUser.getId();
        Long userId = loginUser.getUser().getId();
        String userName = loginUser.getUsername();

        Page<Question> questions =questionService.findAllInTrash(userId, pageable);
        model.addAttribute("userName", userName);
        model.addAttribute("questions", questions);

//        List<Question> questions = questionService.findAllInTrash(userId);        // list 합치기        Collections.addAll(mergedList, list1.toArray(new String[0]));        Collections.addAll(mergedList, list2.toArray(new String[0]));
        return ResponseEntity.ok(model);
    }
}
