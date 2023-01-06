package com.oneao.ringcard_backend.web.user;

import com.oneao.ringcard_backend.config.auth.PrincipalDetails;
import com.oneao.ringcard_backend.domain.user.DTO.EditEmailAlertDto;
import com.oneao.ringcard_backend.domain.user.DTO.RegisterUserDto;
import com.oneao.ringcard_backend.domain.user.User;
import com.oneao.ringcard_backend.domain.user.DTO.UserEmailUpdateDto;
import com.oneao.ringcard_backend.domain.user.DTO.UserRingcardNameUpdateDto;
import com.oneao.ringcard_backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Objects;
import java.util.Optional;


@Controller
@RequiredArgsConstructor
@RequestMapping("mypage/info")
public class EditUserInfoController {

    private final UserService userService;

    @GetMapping("/edit")
    public ResponseEntity<RegisterUserDto> editUserInfoForm(@AuthenticationPrincipal PrincipalDetails loginUser, Model model) {
        User user = loginUser.getUser();
        RegisterUserDto registerUserDto = new RegisterUserDto(user.getUsername(), user.getUserRingcardName(), user.getUserEmail(), user.isEmailAlert());
        return ResponseEntity.ok(registerUserDto);
    }


    @PostMapping("/edit/userRingcardName")
    public ResponseEntity<HashMap<String, Boolean>> editUserRingcardName(@AuthenticationPrincipal PrincipalDetails loginUser, @Valid @RequestBody UserRingcardNameUpdateDto requestBody) {
        User user = loginUser.getUser();
        Long userId = user.getId();

        String username = user.getUsername();

        HashMap<String, Boolean> response=new HashMap<>(1){{
            put("overlappedUsername",false);
        }};

        userService.updateUserRingcardName(userId, requestBody);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/edit/userEmail")
    public ResponseEntity<HashMap<String, Boolean>> editUserEmail(@AuthenticationPrincipal PrincipalDetails loginUser, @Valid @RequestBody UserEmailUpdateDto requestBody) {
        User user = loginUser.getUser();
        Long userId = user.getId();

        HashMap<String, Boolean> response=new HashMap<>(2){{
            put("sameUserEmail",false);
            put("overlappedUserEmail",false);
        }};

        String InputUserEmail = requestBody.getUserEmail();

        // 기존 이메일과 변경 할 이메일이 같을 때.
        if (Objects.equals(InputUserEmail, user.getUserEmail())){
            response.put("sameUserEmail",true);
            return ResponseEntity.ok(response);
        } else{
            // 기존 이메일과 변경 할 이메일이 같을 때 findByUserEmail에 Error 발생하기 때문에 else로 빼줌.
            Optional<User> findUserEmail = userService.findByUserEmail(InputUserEmail);

            if (findUserEmail.isPresent() && findUserEmail.get() == user){
                response.put("sameUserEmail",true);
                return ResponseEntity.ok(response);
            }
            else if (findUserEmail.isPresent() && findUserEmail.get() != user) {
                response.put("overlappedUserEmail",true);
                return ResponseEntity.ok(response);
            } else {
                userService.updateUserEmail(userId, requestBody);
                return ResponseEntity.ok(response);
            }
        }

    }
    @PostMapping("/edit/emailAlert")
    public ResponseEntity<RegisterUserDto> editEmailAlert(@AuthenticationPrincipal PrincipalDetails loginUser, @Valid @RequestBody EditEmailAlertDto requestBody) {
        User user = loginUser.getUser();
        Long userId = user.getId();

        boolean isEmailAlert = requestBody.isEmailAlert();

        userService.updateUserEmailAlert(userId, requestBody);
        RegisterUserDto response = new RegisterUserDto(user.getUsername(), user.getUserRingcardName(), user.getUserEmail(), user.isEmailAlert());
        return ResponseEntity.ok(response);

    }

}