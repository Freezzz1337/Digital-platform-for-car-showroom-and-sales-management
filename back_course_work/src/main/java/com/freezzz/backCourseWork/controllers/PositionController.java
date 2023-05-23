package com.freezzz.backCourseWork.controllers;

import com.freezzz.backCourseWork.models.Position;
import com.freezzz.backCourseWork.services.PositionService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/position")
public class PositionController {

   private final PositionService positionService;

    public PositionController(PositionService positionService) {
        this.positionService = positionService;
    }

    @GetMapping("")
    public List<Position> getAll(){
        return positionService.getAll();
    }

}
