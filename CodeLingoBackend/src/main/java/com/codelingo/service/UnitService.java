package com.codelingo.service;

import com.codelingo.entity.Unit;
import com.codelingo.repository.UnitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UnitService {
    @Autowired
    private UnitRepository unitRepository;

    @Cacheable(value = "units", key = "T(com.codelingo.Application).VERSION + '_units'")
    public List<Unit> downloadUnits(){
        return unitRepository.findAll();
    }
}
