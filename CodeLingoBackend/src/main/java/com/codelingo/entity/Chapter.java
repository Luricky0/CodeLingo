package com.codelingo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "chapters")
public class Chapter {

    @Id
    @Column(name = "id", nullable = false)
    private String id;

    @Column(name = "lang")
    private String lang;

    @Column(name = "no")
    private String no;

    @Column(name = "title")
    private String title;

    @Column(name = "units", columnDefinition = "TEXT")
    private String units;

    public Chapter() {}

    public Chapter(String id, String lang, String no, String title, String units) {
        this.id = id;
        this.lang = lang;
        this.no = no;
        this.title = title;
        this.units = units;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getLang() { return lang; }
    public void setLang(String lang) { this.lang = lang; }

    public String getNo() { return no; }
    public void setNo(String no) { this.no = no; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getUnits() { return units; }
    public void setUnits(String units) { this.units = units; }
}