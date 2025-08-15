package com.codelingo.repository;

import com.codelingo.entity.Progress;
import com.codelingo.entity.ProgressId;
import com.codelingo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProgressRepository extends JpaRepository<Progress, ProgressId> {
    List<Progress> findByUserId(Long userId);
}
