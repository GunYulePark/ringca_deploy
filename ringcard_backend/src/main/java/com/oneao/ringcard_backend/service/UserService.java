package com.oneao.ringcard_backend.service;

import com.oneao.ringcard_backend.domain.user.*;
import com.oneao.ringcard_backend.domain.user.DTO.EditEmailAlertDto;
import com.oneao.ringcard_backend.domain.DTO.SendMailDto;
import com.oneao.ringcard_backend.domain.user.DTO.UserEmailUpdateDto;
import com.oneao.ringcard_backend.domain.user.DTO.UserRingcardNameUpdateDto;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {


    private final UserRepository userRepository;


    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public User save(User user) {
        return userRepository.save(user);
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
    public Optional<User> findByUserEmail(String userEmail) {
        return userRepository.findByUserEmail(userEmail);
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

//    public void updateUserInfo(Long userId, UserUpdateDto updateParam) {
//        userRepository.updateUserInfo(userId, updateParam);
//    }
    public void updateUserRingcardName(Long userId, UserRingcardNameUpdateDto updateParam) {
        userRepository.updateUserRingcardName(userId, updateParam);
    }
    public void updateUserEmail(Long userId, UserEmailUpdateDto updateParam) {
        userRepository.updateUserEmail(userId, updateParam);
    }

    public void updateUserPassword(Long userId, String newPassword) {
        userRepository.updateUserPassword(userId, newPassword);
    }

    public void updateUserEmailAlert(Long userId, EditEmailAlertDto emailAlertDto) {
        userRepository.updateUserEmailAlert(userId, emailAlertDto);
    }

    public void deleteAccount(Long userId) {

        userRepository.deleteAccount(userId);
    }

    public SendMailDto createMailAndChangePassword(String userEmail) {
        String str = getTempPassword();
        SendMailDto dto = new SendMailDto();
        dto.setAddress(userEmail);
        dto.setTitle("[링카] 임시비밀번호 안내 이메일 입니다.");
        dto.setMessage("안녕하세요. [링카] 임시비밀번호 안내 관련 이메일 입니다." + " 회원님의 임시 비밀번호는 "
                + str + " 입니다." + "로그인 후에 비밀번호를 변경을 해주세요");
        updatePassword(str,userEmail);
        return dto;
    }

    public void updatePassword(String str, String userEmail){
        String userPassword = bCryptPasswordEncoder.encode(str);
        Long userId = userRepository.findByUserEmail(userEmail).get().getId();
        userRepository.updateUserPassword(userId,userPassword);
    }

    public String getTempPassword(){
        char[] charSet = new char[] { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
                'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' };

        String str = "";

        // 문자 배열 길이의 값을 랜덤으로 10개를 뽑아 구문을 작성함
        int idx = 0;
        for (int i = 0; i < 10; i++) {
            idx = (int) (charSet.length * Math.random());
            str += charSet[idx];
        }

        return str;
    }



    public void clearStore() {
        userRepository.clearStore();
    }
}
