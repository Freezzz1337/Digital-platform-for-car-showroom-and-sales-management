package com.freezzz.backCourseWork.controllers;

import com.freezzz.backCourseWork.dto.CarDTO;
import com.freezzz.backCourseWork.models.Car;
import com.freezzz.backCourseWork.services.CarService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class CarController {

    private final CarService carService;
    private final ModelMapper modelMapper;

    @Autowired
    public CarController(CarService carService, ModelMapper modelMapper) {
        this.carService = carService;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/")
    public List<Car> getAll(){
        return carService.findAll();
    }

    @GetMapping("car/carDetails/{id}")
    public Car carDetails(@PathVariable long id){
        return carService.findById(id);
    }



    private Car convertToSensor(CarDTO carDTO) {
        return modelMapper.map(carDTO, Car.class);
    }
}
