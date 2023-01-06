package com.oneao.ringcard_backend.web.auth;

import com.twitter.clientlib.ApiException;
import com.twitter.clientlib.TwitterCredentialsOAuth2;
import com.twitter.clientlib.api.TwitterApi;
import com.twitter.clientlib.model.Get2TweetsIdResponse;
import com.twitter.clientlib.model.ResourceUnauthorizedProblem;
import io.github.redouane59.twitter.TwitterClient;
import io.github.redouane59.twitter.dto.endpoints.AdditionalParameters;
import io.github.redouane59.twitter.dto.tweet.Tweet;
import io.github.redouane59.twitter.dto.tweet.TweetList;
import io.github.redouane59.twitter.dto.tweet.TweetV2;
import io.github.redouane59.twitter.dto.user.UserV2;
import io.github.redouane59.twitter.signature.Scope;
import io.github.redouane59.twitter.signature.TwitterCredentials;
import lombok.RequiredArgsConstructor;
import org.apache.http.NameValuePair;
import org.apache.http.client.utils.URLEncodedUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.net.URI;
import java.net.URISyntaxException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Controller
@RequiredArgsConstructor
@RequestMapping("oauth3")
public class Oauth3 {
//    TwitterApi apiInstance = new TwitterApi(new TwitterCredentialsOAuth2(
//            System.getenv("TWITTER_OAUTH2_CLIENT_ID"),
//            System.getenv("TWITTER_OAUTH2_CLIENT_SECRET"),
//            System.getenv("TWITTER_OAUTH2_ACCESS_TOKEN"),
//            System.getenv("TWITTER_OAUTH2_REFRESH_TOKEN")));

    // 출처 : https://ayasetaka.tistory.com/12
    // https://github.com/redouane59/twittered

    @GetMapping("/{id}")
    public void oauth2(@PathVariable String id) throws ApiException {
        // 트위터 등록정보
        TwitterClient twitterClient = new TwitterClient(TwitterCredentials.builder()
            .accessToken("1516353113430851586-Qhjz3YpRRL1yFqSa5PYcyjf5gmJhU1")
            .accessTokenSecret("dPvdajDmTYtMybqbj9mOMnTIvbE9SnOuJY8h9uRQjRxln")
            .apiKey("S0FVySANFNnlISMw5D1vSE8P0")
            .apiSecretKey("KCu23eNrVftMqQeefWJTIei5Klju341e78BypImTVfw338Mm0X")
            .build());

        LocalDateTime endLocalDateTime = LocalDateTime.now();
        LocalDateTime startLocalDateTime = endLocalDateTime.minusDays(7);
        // 파라메터 설정
        AdditionalParameters additionalParameters = AdditionalParameters.builder()
                .startTime(startLocalDateTime)
                .endTime(endLocalDateTime)
                .build();

        UserV2 userV2 = twitterClient.getUserFromUserName(id);
        System.out.println("아이디 로딩 체크");
        System.out.println("아이디 : " + userV2.getId());

        TweetList tweetList =
                twitterClient.getUserTimeline(userV2.getId(), additionalParameters);
        System.out.println("트윗 로딩 체크");
        System.out.println("가져온 트윗 수 : " + tweetList.getData().size());
        for(TweetV2.TweetData tweet : tweetList.getData()) {
            System.out.println("Id : " + tweet.getId());
            System.out.println("text : " + tweet.getText());
            System.out.println("==============================");
        }
    }

    // 누구 트위터에 올린다는 걸 안했는데?
//    @PostMapping("2/tweets")
//    public void tweetPost() {
//        TwitterClient twitterClient = new TwitterClient(TwitterCredentials.builder()
//                .accessToken("1516353113430851586-Qhjz3YpRRL1yFqSa5PYcyjf5gmJhU1")
//                .accessTokenSecret("dPvdajDmTYtMybqbj9mOMnTIvbE9SnOuJY8h9uRQjRxln")
//                .apiKey("S0FVySANFNnlISMw5D1vSE8P0")
//                .apiSecretKey("KCu23eNrVftMqQeefWJTIei5Klju341e78BypImTVfw338Mm0X")
//                .build());
//
//       String text = "Test post Tweet V2 at " + LocalDateTime.now() + " #TwitterAPI";
//        Tweet resultPost = twitterClient.postTweet(text);
//        System.out.println("resultPost = " + resultPost);
//    }

    @GetMapping("")
    public void Oauth2PKCETest() throws ApiException, URISyntaxException {

        TwitterClient twitterClient;
        twitterClient = new TwitterClient();
        String clientId = "Um5DbVM3d2dhMXViNHduOER0a2c6MTpjaQ";

        String expectedUrl =
                "https://twitter.com/i/oauth2/authorize?response_type=code&client_id=Um5DbVM3d2dhMXViNHduOER0a2c6MTpjaQ&redirect_uri=https://twitter.com/RedouaneBali&scope=tweet.read%20users.read%20offline.access&state=state&code_challenge=challenge&code_challenge_method=plain";

        List<NameValuePair> expectedParams = URLEncodedUtils.parse(new URI(expectedUrl), StandardCharsets.UTF_8);

        String responseUrl = twitterClient.getRequestHelperV2().getAuthorizeUrl(clientId,
                "https://twitter.com/RedouaneBali",
                "state",
                "challenge",
                "plain",
                Arrays.asList(Scope.TWEET_READ, Scope.USERS_READ, Scope.OFFLINE_ACCESS));
        System.out.println("authorize url : " + responseUrl);
        List<NameValuePair> responseParams = URLEncodedUtils.parse(new URI(responseUrl), StandardCharsets.UTF_8);

        Map<String, String> responseParamsMap = responseParams.stream().collect(
                Collectors.toMap(NameValuePair::getName, NameValuePair::getValue));

        for (NameValuePair param : expectedParams) {
            System.out.println("param.getValue() = " + param.getValue());
            System.out.println("responseParamsMap.get(param.getName()) = " + responseParamsMap.get(param.getName()));
        }
    }

}