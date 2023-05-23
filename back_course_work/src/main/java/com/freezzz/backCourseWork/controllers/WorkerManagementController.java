package com.freezzz.backCourseWork.controllers;

import com.freezzz.backCourseWork.dto.WorkerDTO;
import com.freezzz.backCourseWork.models.Worker;
import com.freezzz.backCourseWork.services.WorkerService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/management/worker")
public class WorkerManagementController {

    private final WorkerService workerService;
    private final ModelMapper modelMapper;
    @Autowired
    public WorkerManagementController(WorkerService workerService, ModelMapper modelMapper) {
        this.workerService = workerService;
        this.modelMapper = modelMapper;
    }

    @GetMapping("")
    public List<Worker> getAll(){
        return workerService.getAll();
    }

    @GetMapping("/edit/{id}")
    public Worker editWorker(@PathVariable long id){
        return workerService.findById(id);
    }

    @PatchMapping("/edit/{id}")
    public ResponseEntity<HttpStatus> editWorker(@PathVariable long id, @RequestBody WorkerDTO workerDTO){
        workerService.saveEdit(id,convertToWorker(workerDTO),workerDTO);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<HttpStatus> save(@RequestBody WorkerDTO workerDTO){
        workerService.save(convertToWorker(workerDTO), workerDTO);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable long id){
        workerService.delete(id);
    }

    private Worker convertToWorker(WorkerDTO workerDTO){
        return modelMapper.map(workerDTO, Worker.class);
    }

}
