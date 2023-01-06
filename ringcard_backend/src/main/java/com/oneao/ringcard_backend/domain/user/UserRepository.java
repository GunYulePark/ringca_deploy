package com.oneao.ringcard_backend.domain.user;


import com.oneao.ringcard_backend.domain.user.DTO.EditEmailAlertDto;
import com.oneao.ringcard_backend.domain.user.DTO.UserEmailUpdateDto;
import com.oneao.ringcard_backend.domain.user.DTO.UserRingcardNameUpdateDto;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface UserRepository {

    User save(User user);

    Optional<User> findById(Long id);

    Optional<User> findByUsername(String username);

    Optional<User> findByUserEmail(String userEmail);

    List<User> findAll();

    void updateUserRingcardName(Long userId, UserRingcardNameUpdateDto updateParam);

    void updateUserEmail(Long userId, UserEmailUpdateDto updateParam);

    void updateUserPassword(Long userId, String newPassword);

    void updateUserEmailAlert(Long userId, EditEmailAlertDto updateParam);

    @Transactional
    void deleteAccount(Long userId);

    void clearStore();

}
