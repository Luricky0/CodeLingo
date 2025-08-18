package com.codelingo.controller;

import com.codelingo.entity.Unit;
import com.codelingo.service.UnitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/unit")
public class UnitController {

    @Autowired
    private UnitService unitService;

    @RequestMapping("/download")
    ResponseEntity<List<Unit>> downloadUnit() {
        List<Unit> units = unitService.downloadUnits();
        return ResponseEntity.ok().body(units);
    }
}
