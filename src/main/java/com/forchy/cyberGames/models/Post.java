package com.forchy.cyberGames.models;

import javax.persistence.*;
import java.text.SimpleDateFormat;
import java.util.Date;

@Entity
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String title, anons;
    @Lob
    private String full_text;
    private Date date = new Date();
    private String actionDate;

    public String dateToString(Date date) {
        SimpleDateFormat format1 = new SimpleDateFormat("dd.MM.yyyy hh:mm");
        return format1.format(date);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAnons() {
        return anons;
    }

    public void setAnons(String anons) {
        this.anons = anons;
    }

    public String getFull_text() {
        return full_text;
    }

    public void setFull_text(String full_text) {
        this.full_text = full_text;
    }

    public String getActionDate() {
        return dateToString(date);
    }

    public void setActionDate(String actionDate) {
        this.actionDate = dateToString(date);
    }

    public Post() {
    }

    public Post(String title, String anons, String full_text) {
        this.title = title;
        this.anons = anons;
        this.full_text = full_text;
        this.actionDate = dateToString(date);
    }
}
