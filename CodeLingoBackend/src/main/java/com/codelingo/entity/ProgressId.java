package com.codelingo.entity;

import java.util.Objects;

public class ProgressId {
    private Long userId;
    private String unitId;

    public ProgressId() {}

    public ProgressId(Long userId, String unitId) {
        this.userId = userId;
        this.unitId = unitId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ProgressId)) return false;
        ProgressId that = (ProgressId) o;
        return Objects.equals(userId, that.userId) &&
                Objects.equals(unitId, that.unitId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, unitId);
    }
}
