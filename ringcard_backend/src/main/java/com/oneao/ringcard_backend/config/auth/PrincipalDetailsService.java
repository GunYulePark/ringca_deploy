package com.oneao.ringcard_backend.config.auth;

import com.oneao.ringcard_backend.domain.user.User;
import com.oneao.ringcard_backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

// http://localhost:8080/login => SecurityConfig에서 formlogin disable해놔서 여기서 동작을 안 한다. 직접 때려주는 필터를 만들어야 됨.
@Service
@RequiredArgsConstructor
public class PrincipalDetailsService implements UserDetailsService {

    @Autowired
    private final UserService userService;

//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        Optional<User> userEntity = userService.findByUsername(username);
//        if (userEntity.isPresent()) {
//            return new PrincipalDetails(userEntity.get());
//        }
//        return null;
//    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        User userEntity = userService.findByUsername(username).get();
        Optional userEntityOptional = userService.findByUsername(username);
        User userEntity = (User) userEntityOptional.orElse(null);
//        return new PrincipalDetails(userEntity);
        if(userEntity == null) {
            return null;
        }else {
            return new PrincipalDetails(userEntity);
        }
    }
}
