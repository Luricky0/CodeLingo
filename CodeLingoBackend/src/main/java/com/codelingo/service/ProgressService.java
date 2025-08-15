package com.codelingo.service;

import com.codelingo.entity.Progress;
import com.codelingo.repository.ProgressRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ProgressService {
    @Autowired
    private ProgressRepository progressRepository;
    @Transactional
    public void uploadProgressByUser(Long userId, List<Progress> progressList) {
        try{
            List<Progress> existing = progressRepository.findByUserId(userId);
            Map<String,Progress> existingMap = existing.stream().
                    collect(Collectors.toMap(Progress::getUnitId,p->p));

            for(Progress progress : progressList) {
                progress.setUserId(userId);
                if (existingMap.containsKey(progress.getUnitId())) {
                    Progress existed = existingMap.get(progress.getUnitId());
                    existed.setValue(progress);
                    progressRepository.save(existed);
                } else {
                    progressRepository.save(progress);
                }
                System.out.println(progress);
            }
            System.out.println("upload successfully");

        }catch (Exception e){
            System.out.println("upload Progress Error:"+e.getMessage());
        }

    }
}
