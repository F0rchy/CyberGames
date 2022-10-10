package com.forchy.cyberGames.controllers;

import com.forchy.cyberGames.models.Post;
import com.forchy.cyberGames.repo.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.quartz.QuartzTransactionManager;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;

@Controller
public class MainController {

    @Autowired
    private PostRepository postRepository;

    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("title", "Главная страница");
        Iterable<Post> posts = postRepository.findAll();
        model.addAttribute("posts", posts);
        return "home";
    }

    @GetMapping("/devblog/add")
    public String devblogAdd(Model model) {
        model.addAttribute("title", "Добавление новости");
        return "devblog-add";
    }

    @PostMapping("/devblog/add")
    public String devblogPostAdd(@RequestParam String title, @RequestParam String anons, @RequestParam String full_text, Model model) {
        Post post = new Post(title, anons, full_text);
        postRepository.save(post);
        return "redirect:/";
    }

    @GetMapping("/devblog/{id}")
    public String devblogDetails(@PathVariable(value = "id") long id, Model model) {
        model.addAttribute("title", "Детальнее");
        if(!postRepository.existsById(id)) {
            return "redirect:/";
        }
        Optional<Post> post = postRepository.findById(id);
        ArrayList<Post> res = new ArrayList<>();
        post.ifPresent(res::add);
        model.addAttribute("post", res);
        return "devblog";
    }

    @GetMapping("/devblog/{id}/edit")
    public String devblogEdit(@PathVariable(value = "id") long id, Model model) {
        model.addAttribute("title", "Изменить запись");
        if(!postRepository.existsById(id)) {
            return "redirect:/";
        }
        Optional<Post> post = postRepository.findById(id);
        ArrayList<Post> res = new ArrayList<>();
        post.ifPresent(res::add);
        model.addAttribute("post", res);
        return "devblog-edit";
    }

    @PostMapping("/devblog/{id}/edit")
    public String devblogPostUpdate(@PathVariable(value = "id") long id, @RequestParam String title, @RequestParam String anons, @RequestParam String full_text, Model model) {
        Post post = postRepository.findById(id).orElseThrow();
        post.setTitle(title);
        post.setAnons(anons);
        post.setFull_text(full_text);
        postRepository.save(post);
        return "redirect:/";
    }

    @PostMapping("/devblog/{id}/remove")
    public String devblogPostDelete(@PathVariable(value = "id") long id, Model model) {
        Post post = postRepository.findById(id).orElseThrow();
        postRepository.delete(post);
        return "redirect:/";
    }

    @GetMapping("/games")
    public String games(Model model) {
        model.addAttribute("title", "Игры");
        return "games";
    }

    @GetMapping("/about")
    public String about(Model model) {
        model.addAttribute("title", "О нас");
        return "about";
    }
}