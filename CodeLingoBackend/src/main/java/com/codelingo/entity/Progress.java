package com.codelingo.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "progress")
@IdClass(ProgressId.class)
public class Progress {

    @Id
    @Column(name = "user_id")
    private Long userId;

    @Id
    @Column(name = "unit_id")
    private String unitId;

    @Column(name = "is_unlocked", nullable = false)
    private Boolean isUnlocked = false;

    @Column(name = "is_completed", nullable = false)
    private Boolean isCompleted = false;

    @Column(name = "completed_at", nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime completedAt;

    public Progress() {

    }


    public Progress(Long userId, String unitId) {
        this.userId = userId;
        this.unitId = unitId;
    }

    public void setValue(Progress progress) {
        this.userId = progress.getUserId();
        this.unitId = progress.getUnitId();
        this.isUnlocked = progress.getUnlocked();
        this.isCompleted = progress.getCompleted();
        this.completedAt = progress.getCompletedAt();
    }


    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUnitId() {
        return unitId;
    }

    public void setUnitId(String unitId) {
        this.unitId = unitId;
    }

    public Boolean getUnlocked() {
        return isUnlocked;
    }

    public void setUnlocked(Boolean unlocked) {
        isUnlocked = unlocked;
    }

    public Boolean getCompleted() {
        return isCompleted;
    }

    public void setCompleted(Boolean completed) {
        isCompleted = completed;
    }

    public LocalDateTime getCompletedAt() {
        return completedAt;
    }

    public void setCompletedAt(LocalDateTime completedAt) {
        this.completedAt = completedAt;
    }
}
