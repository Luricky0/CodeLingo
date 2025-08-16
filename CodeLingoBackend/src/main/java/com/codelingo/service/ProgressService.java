package com.codelingo.service;

import com.codelingo.entity.Progress;
import com.codelingo.repository.ProgressRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ProgressService {

    @Autowired
    private ProgressRepository progressRepository;

    @Transactional
    public List<Progress> uploadProgressByUser(Long userId, List<Progress> progressList) {
        try{
            List<Progress> existing = progressRepository.findByUserId(userId);
            Map<String,Progress> existingMap = existing.stream().
                    collect(Collectors.toMap(Progress::getUnitId,p->p));

            List<Progress> shouldUpdateLocal = new ArrayList<>();
            for(Progress progress : progressList) {
                progress.setUserId(userId);
                if (existingMap.containsKey(progress.getUnitId())) {
                    Progress existed = existingMap.get(progress.getUnitId());
                    if(progress.getCompletedAt().isAfter(existed.getCompletedAt())) {
                        progressRepository.save(progress);
                    }else{
                        shouldUpdateLocal.add(existed);
                    }
                } else {
                    progressRepository.save(progress);

                }
                System.out.println(progress);
            }
            System.out.println("upload successfully");
            return shouldUpdateLocal;

        }catch (Exception e){
            System.out.println("upload Progress Error:"+e.getMessage());
            throw  e;
        }
    }

}
