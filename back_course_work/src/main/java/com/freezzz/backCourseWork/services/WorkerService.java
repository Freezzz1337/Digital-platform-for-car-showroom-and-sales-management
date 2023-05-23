package com.freezzz.backCourseWork.services;

import com.freezzz.backCourseWork.dto.LoginDTO;
import com.freezzz.backCourseWork.dto.WorkerDTO;
import com.freezzz.backCourseWork.models.Worker;
import com.freezzz.backCourseWork.repository.PositionRepository;
import com.freezzz.backCourseWork.repository.WorkerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class WorkerService {
    private final WorkerRepository workerRepository;
    private final PositionRepository positionRepository;
    @Autowired
    public WorkerService(WorkerRepository workerRepository, PositionRepository positionRepository) {
        this.workerRepository = workerRepository;
        this.positionRepository = positionRepository;
    }
    public Worker findById(long id){
        return workerRepository.findById(id).get();
    }
    @Transactional
    public void saveEdit(long id, Worker worker , WorkerDTO workerDTO){
        worker.setId(id);
        worker.setPosition(positionRepository.findById(workerDTO.getPosition()).get());
        workerRepository.save(worker);
    }

    @Transactional
    public void save(Worker newWorker, WorkerDTO workerDTO){
        newWorker.setPosition(positionRepository.findById(workerDTO.getPosition()).get());
        workerRepository.save(newWorker);
    }

    @Transactional
    public void delete(long id){
        workerRepository.deleteById(id);
    }
    public List<Worker> getAll(){
        return workerRepository.findAll();
    }


    public String getRole(LoginDTO loginDTO){
        return workerRepository.findByLoginAndPassword(loginDTO.getUsername(), loginDTO.getPassword()).getPosition().getName();
    }
}
