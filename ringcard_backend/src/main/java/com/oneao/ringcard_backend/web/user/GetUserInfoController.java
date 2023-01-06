package com.oneao.ringcard_backend.web.user;

import com.oneao.ringcard_backend.config.auth.PrincipalDetails;
import com.oneao.ringcard_backend.domain.user.DTO.RegisterUserDto;
import com.oneao.ringcard_backend.domain.user.User;
import com.oneao.ringcard_backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequiredArgsConstructor
@RequestMapping("mypage/info")
public class GetUserInfoController {

    private final UserService userService;
//    @GetMapping("/{userId}")
//    public String showUserInfo(@PathVariable Long userId, Model model) {
//        User user = userService.findById(userId);
//        model.addAttribute("user", user);
//        model.addAttribute("userId", userId);
//        return "mypage/userInfo";
//    }
    @GetMapping()
    public ResponseEntity<RegisterUserDto> showUserInfo(@AuthenticationPrincipal PrincipalDetails loginUser, Model model) {
        User user = loginUser.getUser();
        RegisterUserDto registerUserDto = new RegisterUserDto(user.getUsername(), user.getUserRingcardName(), user.getUserEmail(), user.isEmailAlert());
    //        Long userId = user.getId();
    //        model.addAttribute("user", user);
        return ResponseEntity.ok(registerUserDto);
    }
}
