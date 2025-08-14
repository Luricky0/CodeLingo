package com.codelingo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "units")
public class Unit {

    @Id
    @Column(name = "id", nullable = false)
    private String id;

    @Column(name = "title")
    private String title;

    @Column(name = "questions", columnDefinition = "TEXT")
    private String questions;

    @ManyToOne
    @JoinColumn(name = "chapter_id", referencedColumnName = "id")
    private Chapter chapter;

    @Column(name = "`order`")
    private Integer order;

    public Unit() {}

    public Unit(String id, String title, String questions, Chapter chapter, Integer order) {
        this.id = id;
        this.title = title;
        this.questions = questions;
        this.chapter = chapter;
        this.order = order;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getQuestions() { return questions; }
    public void setQuestions(String questions) { this.questions = questions; }

    public Chapter getChapter() { return chapter; }
    public void setChapter(Chapter chapter) { this.chapter = chapter; }

    public Integer getOrder() { return order; }
    public void setOrder(Integer order) { this.order = order; }
}