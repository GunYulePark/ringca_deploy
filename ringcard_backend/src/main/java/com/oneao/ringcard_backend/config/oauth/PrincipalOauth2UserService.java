package com.oneao.ringcard_backend.config.oauth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.oneao.ringcard_backend.config.auth.PrincipalDetails;
import com.oneao.ringcard_backend.domain.user.User;
import com.oneao.ringcard_backend.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class PrincipalOauth2UserService extends DefaultOAuth2UserService {
//public class PrincipalOauth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

//    @Autowired
//    private final UserService userService;
//    @Autowired
//    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private UserRepository userRepository;
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        System.out.println("userRequest: "+userRequest);
        System.out.println("getClientRegistration(): " + userRequest.getClientRegistration());
        System.out.println("getAccessToken(): " + userRequest.getAccessToken());
        System.out.println("getAttributes: "+super.loadUser(userRequest).getAttributes());

        OAuth2User oauth2User = super.loadUser(userRequest);

        // 회원 가입을 강제로 진행해볼 예정

        String provider = userRequest.getClientRegistration().getClientId(); // google
        String provideId = oauth2User.getAttribute("sub");
        String userRingcardName = oauth2User.getAttribute("name");
        String username = provider + "_" + provideId; // google_192837891278
//        String password = bCryptPasswordEncoder.encode("겟인데어");
        String password = "test";
        String email = oauth2User.getAttribute("email");
        String role = "ROEL_USER";


        Optional<User> userEntityOptional = userRepository.findByUsername(username);
        User userEntity= userEntityOptional.orElse(null);
        if(userEntity == null){
            userEntity = User.builder()
                    .userRingcardName(userRingcardName)
                    .username(username)
                    .password(password)
                    .roles(role)
                    .build();
            System.out.println(userEntity);
            userRepository.save(userEntity);
            System.out.println("hellooooooo");
        }

        return new PrincipalDetails(userEntity, oauth2User.getAttributes());
    }
//    @SneakyThrows
//    @Override
//    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
//
//        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
//        OAuth2User oAuth2User = delegate.loadUser(userRequest);
//
//        System.out.println(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(userRequest));
//        System.out.println(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(oAuth2User));
//        return oAuth2User;
//    }
}
