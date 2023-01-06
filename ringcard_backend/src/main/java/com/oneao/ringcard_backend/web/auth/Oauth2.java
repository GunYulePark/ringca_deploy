package com.oneao.ringcard_backend.web.auth;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

import com.oneao.ringcard_backend.config.auth.PrincipalDetails;
import com.oneao.ringcard_backend.domain.user.TwitterLoginAutoDto;
import com.oneao.ringcard_backend.domain.user.User;
import com.oneao.ringcard_backend.domain.user.UserMeTwitterDto;
import com.oneao.ringcard_backend.service.UserService;
import com.twitter.clientlib.TwitterCredentialsBearer;
import com.twitter.clientlib.TwitterCredentialsOAuth2;
import com.twitter.clientlib.ApiException;
import com.twitter.clientlib.api.TwitterApi;
import com.twitter.clientlib.model.*;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping()
public class Oauth2 {

    @Autowired
    private final UserService userService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

//    TwitterApi apiInstance = new TwitterApi(new TwitterCredentialsOAuth2(
//            System.getenv("TWITTER_OAUTH2_CLIENT_ID"),
//            System.getenv("TWITTER_OAUTH2_CLIENT_SECRET"),
//            System.getenv("TWITTER_OAUTH2_ACCESS_TOKEN"),
//            System.getenv("TWITTER_OAUTH2_REFRESH_TOKEN")));


//    @GetMapping("/login/user/me")
//    public void oauth5234s(HttpServletRequest request, HttpServletResponse response){
//        System.out.println("login/user/me GetMapping");
//    }
    @PostMapping("/login/user/me")
        public ResponseEntity<TwitterLoginAutoDto> oauth5234(@RequestBody UserMeTwitterDto requestBody){
        TwitterLoginAutoDto twitterLoginAutoDto = new TwitterLoginAutoDto();
        twitterLoginAutoDto.setLoginFirstTwitter(false);

        System.out.println("/login/user/me/1");
        String username = requestBody.getUsername();
        String usernameTwitter = username + "<twitter>";
        twitterLoginAutoDto.setUsernameTwitter(usernameTwitter);
        if(userService.findByUsername(usernameTwitter).isEmpty()) {
//        System.out.println("Data : user/me=========");
//        String id = requestBody.getId();
        String name = requestBody.getName();

        String userEmailTwitter = username + "@twitter.example";
//        String passwordRandomed = RandomStringUtils.randomAlphanumeric(10);
        String rawPassword = "exySexyMeganFoxy!";
        User userEntity = new User();
        userEntity.setUsername(usernameTwitter);
        userEntity.setUserEmail(userEmailTwitter);
        userEntity.setUserRingcardName(name);
        String encPassword = bCryptPasswordEncoder.encode(rawPassword);
        userEntity.setPassword(encPassword);
        userEntity.setRoles("ROLE_USER");
        twitterLoginAutoDto.setLoginFirstTwitter(true);
        System.out.println("/login/user/me/2");
        userService.save(userEntity);
        System.out.println("/login/user/me/3");
        }
        System.out.println("/login/user/me/4");
//        redirectAttributes.addAttribute("twitterLoginAutoDto", twitterLoginAutoDto);
        return ResponseEntity.ok(twitterLoginAutoDto);
//        return "redirect:/loginForm";
    }

    @GetMapping("/2/users/me")
    public void oauth54536(){

//        try {
//            SingleUserLookupResponse result = apiInstance.users().findMyUser(null, null, null);
//            System.out.println(result);
//        } catch (ApiException e) {
//            System.err.println("Exception when calling UsersApi#findMyUser");
//            System.err.println("Status code: " + e.getCode());
//            System.err.println("Reason: " + e.getResponseBody());
//            System.err.println("Response headers: " + e.getResponseHeaders());
//            e.printStackTrace();
//        }
    }


    @GetMapping("/lo")
    public String oauth5456(){
        return "oauth";
    }

    @GetMapping("/log")
    public @ResponseBody String oauth545678(@AuthenticationPrincipal PrincipalDetails principalDetails){
        System.out.println("principalDetails:" + principalDetails.getUser()) ;
        return "oauth1";
    }



    @GetMapping("/test/login")
    public @ResponseBody String testLogin(Authentication authentication){
        System.out.println("/test/login================");
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        System.out.println("authentication: " + principalDetails.getUser());
        return "세션 정보 확인";
    }
    @GetMapping("/2/tweets/{id}")
    public void oauth2(@PathVariable String id) throws ApiException {
        TwitterApi apiInstance = new TwitterApi(new TwitterCredentialsOAuth2(
                "OHZuVXNLOU9Yd2xEZTM1Q3pSTl86MTpjaQ",
                "R5LrpInanUZYCRH8l9aq5oUGBoxfAHNQTPjs8vhqB2zGjKI29m",
                "1516353113430851586-Qhjz3YpRRL1yFqSa5PYcyjf5gmJhU1",
                "", false));

        Set<String> tweetFields = new HashSet<>();
        tweetFields.add("author_id");
        tweetFields.add("id");
        tweetFields.add("created_at");

        try {
            // findTweetById
            Get2TweetsIdResponse result = apiInstance.tweets().findTweetById(id)
                    .tweetFields(tweetFields)
                    .execute();
            if(result.getErrors() != null && result.getErrors().size() > 0) {
                System.out.println("Error:");

                result.getErrors().forEach(e -> {
                    System.out.println(e.toString());
                    if (e instanceof ResourceUnauthorizedProblem) {
                        System.out.println(((ResourceUnauthorizedProblem) e).getTitle() + " " + ((ResourceUnauthorizedProblem) e).getDetail());
                    }
                });
            } else {
                System.out.println("findTweetById - Tweet Text: " + result.toString());
            }
        } catch(ApiException e) {
            System.err.println("Status code: " + e.getCode());
            System.err.println("Reason: " + e.getResponseBody());
            System.err.println("Response headers: " + e.getResponseHeaders());
            e.printStackTrace();
        }
    }






//        // http://localhost:8080/2/tweets/1460323737035677698
//        // https://developer.twitter.com/en/docs/twitter-api/tweets/lookup/api-reference/get-tweets-id
//        // 성공
//
//        TwitterApi apiInstance = new TwitterApi(new TwitterCredentialsBearer("AAAAAAAAAAAAAAAAAAAAAOWsiwEAAAAADbR%2FLCPhXEE5vHgf%2BCli0CgKOjk%3DMjxq0SR9yVxDzuVCiN5sjmeiG26QYTSrIu6BM2sQozQY3ViVtd"));
//
//        Set<String> tweetFields = new HashSet<>();
//        tweetFields.add("author_id");
//        tweetFields.add("id");
//        tweetFields.add("created_at");
//
//        try {
//            // findTweetById
//            Get2TweetsIdResponse result = apiInstance.tweets().findTweetById(id)
//                    .tweetFields(tweetFields)
//                    .execute();
//            if (result.getErrors() != null && result.getErrors().size() > 0) {
//                System.out.println("Error:");
//
//                result.getErrors().forEach(e -> {
//                    System.out.println(e.toString());
//                    if (e instanceof ResourceUnauthorizedProblem) {
//                        System.out.println(((ResourceUnauthorizedProblem) e).getTitle() + " " + ((ResourceUnauthorizedProblem) e).getDetail());
//                    }
//                });
//            } else {
//                System.out.println("findTweetById - Tweet Text: " + result.toString());
//            }
//        } catch (ApiException e) {
//            System.err.println("Status code: " + e.getCode());
//            System.err.println("Reason: " + e.getResponseBody());
//            System.err.println("Response headers: " + e.getResponseHeaders());
//            e.printStackTrace();
//        }


//    try {
//        // findTweetById
//        Get2TweetsIdResponse result = apiInstance.tweets().findTweetById("20")
//                .tweetFields(tweetFields)
//                .execute();
//        if(result.getErrors() != null && result.getErrors().size() > 0) {
//            System.out.println("Error:");
//
//            result.getErrors().forEach(e -> {
//                System.out.println(e.toString());
//                if (e instanceof ResourceUnauthorizedProblem) {
//                    System.out.println(((ResourceUnauthorizedProblem) e).getTitle() + " " + ((ResourceUnauthorizedProblem) e).getDetail());
//                }
//            });
//        } else {
//            System.out.println("findTweetById - Tweet Text: " + result.toString());
//        }
//    } catch(ApiException e) {
//        System.err.println("Status code: " + e.getCode());
//        System.err.println("Reason: " + e.getResponseBody());
//        System.err.println("Response headers: " + e.getResponseHeaders());
//        e.printStackTrace();
//    }
    }
