package com.freezzz.backCourseWork.services;

import com.freezzz.backCourseWork.models.Position;
import com.freezzz.backCourseWork.repository.PositionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.w3c.dom.stylesheets.LinkStyle;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class PositionService {
    private final PositionRepository positionRepository;

    @Autowired
    public PositionService(PositionRepository positionRepository) {
        this.positionRepository = positionRepository;
    }

    public List<Position> getAll(){
        return positionRepository.findAll();
    }
}
