package com.example.coursework.client;

import ch.qos.logback.core.net.server.Client;
import com.example.coursework.answer.Answer;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api")
@AllArgsConstructor
public class ClientController {
    private final Answer<Client> answerClient;

//    @PostMapping("client")
//    public String newAnalysis(@RequestBody User user) throws JsonProcessingException {
//        return answer.json(Status.OK, generalInformation);
//    }
}
