package com.oneao.ringcard_backend.web.suggestion;

import com.oneao.ringcard_backend.config.auth.PrincipalDetails;
import com.oneao.ringcard_backend.domain.suggestion.Suggestion;
import com.oneao.ringcard_backend.domain.suggestion.SuggestionSendDto;
import com.oneao.ringcard_backend.domain.user.User;
import com.oneao.ringcard_backend.service.SuggestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Objects;

@Controller
@RequiredArgsConstructor
@RestController
public class SendSuggestionToStaffController {

    private final SuggestionService suggestionService;

    @GetMapping("/suggestion")
    public ResponseEntity<Model> addSuggestionForm(@AuthenticationPrincipal PrincipalDetails loginUser, Model model) {
        User sender = loginUser.getUser();
        Long senderUserId = sender.getId();
        String senderUsername = sender.getUsername();
        String senderUserRingcardName = sender.getUserRingcardName();

        model.addAttribute("senderUserId", senderUserId);
        model.addAttribute("senderUsername", senderUsername);
        model.addAttribute("senderUserRingcardName", senderUserRingcardName);

        return ResponseEntity.ok(model);
    }

    @PostMapping("/suggestion")
    public void sendSuggestion(@AuthenticationPrincipal PrincipalDetails loginUser,@RequestBody SuggestionSendDto requestBody) {
        User sender = loginUser.getUser();
        Long senderUserId = sender.getId();
        String senderUsername = sender.getUsername();
        if (Objects.equals(senderUserId, requestBody.getSenderUserId()) && Objects.equals(senderUsername, requestBody.getSenderUsername())) {
            String suggestionContents = requestBody.getContents();
            Suggestion suggestion = new Suggestion(senderUserId, senderUsername, suggestionContents);
            suggestionService.save(suggestion);
        }
    }
}
