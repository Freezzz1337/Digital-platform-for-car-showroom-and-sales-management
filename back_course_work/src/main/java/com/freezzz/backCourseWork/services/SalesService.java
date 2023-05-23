package com.freezzz.backCourseWork.services;

import com.freezzz.backCourseWork.dto.SalesDTO;
import com.freezzz.backCourseWork.dto.WorkerDTO;
import com.freezzz.backCourseWork.models.Car;
import com.freezzz.backCourseWork.models.Sales;
import com.freezzz.backCourseWork.models.Worker;
import com.freezzz.backCourseWork.repository.CarRepository;
import com.freezzz.backCourseWork.repository.SalesRepository;
import com.freezzz.backCourseWork.repository.WorkerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class SalesService {
    private final SalesRepository salesRepository;
    private final CarRepository carRepository;
    private final WorkerRepository workerRepository;

    @Autowired
    public SalesService(SalesRepository salesRepository, CarRepository carRepository, WorkerRepository workerRepository) {
        this.salesRepository = salesRepository;
        this.carRepository = carRepository;
        this.workerRepository = workerRepository;
    }

    public List<Sales> getAll() {
        return salesRepository.findAll();
    }

    @Transactional
    public double sum() {
        return salesRepository.sumPrice();
    }

    @Transactional
    public void save(SalesDTO salesDTO) {
        Car car = carRepository.findById(salesDTO.getCar());
        Worker worker = workerRepository.findById(salesDTO.getWorker()).get();
        salesRepository.save(new Sales(car, worker, salesDTO.getPrice()));
    }

}
