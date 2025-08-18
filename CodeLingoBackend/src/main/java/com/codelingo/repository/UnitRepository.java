package com.codelingo.repository;

import com.codelingo.entity.Chapter;
import com.codelingo.entity.Unit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UnitRepository extends JpaRepository<Unit,String> {
    public List<Unit> findByChapter(Chapter chapter);
}
