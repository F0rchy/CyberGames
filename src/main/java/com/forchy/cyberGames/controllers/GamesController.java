package com.forchy.cyberGames.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.ui.Model;

@Controller
public class GamesController {

    @GetMapping("/games/2048")
    public String games2048(Model model) {
        model.addAttribute("title", "2048");
        return "2048";
    }
}
