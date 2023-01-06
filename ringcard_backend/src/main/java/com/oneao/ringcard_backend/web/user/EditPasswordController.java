package com.oneao.ringcard_backend.web.user;

import com.oneao.ringcard_backend.config.auth.PrincipalDetails;
import com.oneao.ringcard_backend.domain.user.DTO.EditPasswordDto;
import com.oneao.ringcard_backend.domain.user.User;
import com.oneao.ringcard_backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Objects;


@RestController
@RequiredArgsConstructor
@RequestMapping("mypage/edit/password")
public class EditPasswordController {

    private final UserService userService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @GetMapping()
    public String editPasswordForm() {
        return "mypage/editPassword";
    }

    // Blank 없는 버전
    @PostMapping()
    public ResponseEntity<HashMap<String, Boolean>> editPasswordV2(@AuthenticationPrincipal PrincipalDetails loginUser, @Valid @RequestBody EditPasswordDto requestBody) {
        User user = loginUser.getUser();
        Long userId = user.getId();
        // 주기능 : 현재 비번 인증 끝나면 새로운 비번으로 업데이트

        String pastPassword = requestBody.getPastPassword();
        String newPassword = requestBody.getNewPassword();
        String newPasswordConfirm = requestBody.getNewPasswordConfirm();

        HashMap<String, Boolean> response = new HashMap<>(3) {{
            put("passwordChanged", false);
            put("passwordSame", false);
            put("newPasswordFalse", false);
            put("pastPasswordFalse", false);
        }};
        // 현재 비밀번호 없음
//        if (pastPassword.isEmpty() || pastPassword.isBlank() ) {
//            System.out.println(pastPassword);
//            response.put("pastPasswordBlank", true);
//            return ResponseEntity.ok(response);
//        }
//        bCryptPasswordEncoder.matches(pastPassword, user.getPassword());
        if (bCryptPasswordEncoder.matches(pastPassword, user.getPassword())) {
            // 새로운 비번 없음
//            if (newPassword.isEmpty() || newPassword.isBlank()){
//                response.put("newPasswordBlank", true);
//                return ResponseEntity.ok(response);
//
//            }
            if (Objects.equals(pastPassword, newPassword)) {
                response.put("passwordSame", true);
            } else if (Objects.equals(newPassword, newPasswordConfirm)) {
                String encNewPassword = bCryptPasswordEncoder.encode(newPassword);
                userService.updateUserPassword(userId, encNewPassword);
                response.put("passwordChanged", true);
                return ResponseEntity.ok(response);
                // TODO: 알림으로 비밀번호 변경되었습니다.
            } else {
                // 현재 비번 인증 안되면, '새 비밀번호와 비밀번호 확인이 일치하지 않습니다.' 알람
                response.put("newPasswordFalse", true);
                return ResponseEntity.ok(response);
            }
            return ResponseEntity.ok(response);
        } else {
            // 현재 비번 인증 안되면, '현재 비밀번호를 정확히 입력해주세요' 알람
            response.put("pastPasswordFalse", true);
            return ResponseEntity.ok(response);
        }
    }

    // Blank 있는 버전
//    @PostMapping()
//    public ResponseEntity<HashMap<String, Boolean>> editPasswordV2(@AuthenticationPrincipal PrincipalDetails loginUser, @Valid @RequestBody EditPasswordDto requestBody, HttpServletRequest request) {
//        User user = loginUser.getUser();
//        Long userId = user.getId();
//        // 주기능 : 현재 비번 인증 끝나면 새로운 비번으로 업데이트
//
//        String pastPassword = requestBody.getPastPassword();
//        String newPassword = requestBody.getNewPassword();
//        String newPasswordConfirm = requestBody.getNewPasswordConfirm();
//
//        HashMap<String, Boolean> response=new HashMap<>(5){{
//            put("pastPasswordBlank",false);
//            put("newPasswordBlank",false);
//            put("passwordChanged",false);
//            put("newPasswordFalse",false);
//            put("pastPasswordFalse",false);
//        }};
//        System.out.println("f1");
//        // 현재 비밀번호 없음
//        if (pastPassword.isEmpty() || pastPassword.isBlank() ) {
//            System.out.println(pastPassword);
//            response.put("pastPasswordBlank", true);
//            return ResponseEntity.ok(response);
//        }
//        System.out.println("f2");
//        bCryptPasswordEncoder.matches(pastPassword, user.getPassword());
//        System.out.println("f3");
//        if (bCryptPasswordEncoder.matches(pastPassword, user.getPassword())) {
//            // 새로운 비번 없음
//            System.out.println("f4");
//            if (newPassword.isEmpty() || newPassword.isBlank()){
//                response.put("newPasswordBlank", true);
//                return ResponseEntity.ok(response);
//
//            }
//            else if (Objects.equals(newPassword, newPasswordConfirm)) {
//                String encNewPassword = bCryptPasswordEncoder.encode(newPassword);
//                userService.updateUserPassword(userId, encNewPassword);
//                response.put("passwordChanged", true);
//                return ResponseEntity.ok(response);
//                // TODO: 알림으로 비밀번호 변경되었습니다.
//            } else {
//                // 현재 비번 인증 안되면, '새 비밀번호와 비밀번호 확인이 일치하지 않습니다.' 알람
//                response.put("newPasswordFalse", true);
//                return ResponseEntity.ok(response);
//
//            }
//        } else {
//            System.out.println("f5");
//            // 현재 비번 인증 안되면, '현재 비밀번호를 정확히 입력해주세요' 알람
//            response.put("pastPasswordFalse", true);
//            System.out.println("f6");
//            return ResponseEntity.ok(response);
//        }
//    }

//    @PostMapping()
//    public ResponseEntity<HashMap<String, Boolean>> editPasswordV1(@AuthenticationPrincipal PrincipalDetails loginUser, @Valid @RequestBody EditPasswordDto requestBody, HttpServletRequest request) {
//        User user = loginUser.getUser();
//        Long userId = user.getId();
//        // 주기능 : 현재 비번 인증 끝나면 새로운 비번으로 업데이트
//
//        String pastPassword = requestBody.getPastPassword();
//        String newPassword = requestBody.getNewPassword();
//        String newPasswordConfirm = requestBody.getNewPasswordConfirm();
//
//        if (pastPassword.isEmpty() || pastPassword.isBlank() ) {
//            System.out.println(pastPassword);
//            return ResponseEntity.ok(response);
//        }
//        bCryptPasswordEncoder.matches(pastPassword, user.getPassword());
//        if (bCryptPasswordEncoder.matches(pastPassword, user.getPassword())) {
//            // 새로운 비번 없음
//            if (newPassword.isEmpty() || newPassword.isBlank()){
//                redirectAttributes.addAttribute("newPasswordBlank", true);
//                return "redirect:" + request.getHeader("Referer");
//            }
//            else if (Objects.equals(newPassword, newPasswordConfirm)) {
//                String encNewPassword = bCryptPasswordEncoder.encode(newPassword);
//                userService.updateUserPassword(userId, encNewPassword);
//                return "redirect:/mypage/info/edit";
//                // TODO: 알림으로 비밀번호 변경되었습니다.
//            } else {
//                // 현재 비번 인증 안되면, '새 비밀번호와 비밀번호 확인이 일치하지 않습니다.' 알람
//                redirectAttributes.addAttribute("newPasswordFalse", true);
//                return "redirect:" + request.getHeader("Referer");
//            }
//        } else {
//            // 현재 비번 인증 안되면, '현재 비밀번호를 정확히 입력해주세요' 알람
//            redirectAttributes.addAttribute("pastPasswordFalse", true);
//            return "redirect:" + request.getHeader("Referer");
//        }
//    }
}
