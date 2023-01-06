package com.oneao.ringcard_backend.domain.user;

import com.oneao.ringcard_backend.domain.user.DTO.EditEmailAlertDto;
import com.oneao.ringcard_backend.domain.user.DTO.UserEmailUpdateDto;
import com.oneao.ringcard_backend.domain.user.DTO.UserRingcardNameUpdateDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
@Transactional
@RequiredArgsConstructor
public class JpaUserRepository implements UserRepository {

    private final SpringDataJpaUserRepository repository;

    @Override
    public User save(User user) {
        return repository.save(user);
    }

    @Override
    public Optional<User> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return repository.findByUsername(username);
    }

    @Override
    public Optional<User> findByUserEmail(String userEmail) {
        return repository.findByUserEmail(userEmail);
    }

    @Override
    public List<User> findAll() {
        return repository.findAll();
    }

    @Override
    public void updateUserRingcardName(Long userId, UserRingcardNameUpdateDto updateParam) {
        User findUser = repository.findById(userId).orElseThrow();
//        findUser.setUsername(updateParam.getUsername());
//        findUser.setPassword(updateParam.getPassword());
        findUser.setUserRingcardName(updateParam.getUserRingcardName());
//        findUser.setUserEmail(updateParam.getUserEmail());
//        findUser.setTwitterId(updateParam.getTwitterId());
//        findUser.setUserPicture(updateParam.getUserPicture());
    }

    @Override
    public void updateUserEmail(Long userId, UserEmailUpdateDto updateParam) {
        User findUser = repository.findById(userId).orElseThrow();
//        findUser.setUsername(updateParam.getUsername());
//        findUser.setPassword(updateParam.getPassword());
//        findUser.setUserRingcardName(updateParam.getUserRingcardName());
        findUser.setUserEmail(updateParam.getUserEmail());
//        findUser.setTwitterId(updateParam.getTwitterId());
//        findUser.setUserPicture(updateParam.getUserPicture());
    }

    @Override
    public void updateUserPassword(Long userId, String newPassword) {
        User findUser = findById(userId).get();

        findUser.setPassword(newPassword);
    }

    @Override
    public void updateUserEmailAlert(Long userId, EditEmailAlertDto updateParam) {
        User findUser = findById(userId).get();

        findUser.setEmailAlert(updateParam.isEmailAlert());
    }

    @Override
    public void deleteAccount(Long userId) {
        repository.delete(repository.findById(userId).get());
    }

    @Override
    public void clearStore() {
        repository.deleteAll();
    }



}
