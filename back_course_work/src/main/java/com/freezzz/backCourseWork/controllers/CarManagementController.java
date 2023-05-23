package com.freezzz.backCourseWork.controllers;

import com.freezzz.backCourseWork.dto.CarDTO;
import com.freezzz.backCourseWork.models.Car;
import com.freezzz.backCourseWork.services.CarService;
import com.freezzz.backCourseWork.services.SupplierService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/management")
public class CarManagementController {
    private final CarService carService;
    private final SupplierService supplierService;
    private final ModelMapper modelMapper;

    @Autowired
    public CarManagementController(CarService carService, SupplierService supplierService, ModelMapper modelMapper) {
        this.carService = carService;
        this.supplierService = supplierService;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/car")
    public List<Car> getCarList() {
        return carService.findAll();
    }

    @GetMapping("/car/edit/{id}")
    public Car editCar(@PathVariable long id) {
        return carService.findById(id);
    }

    @PatchMapping("/car/edit/{id}")
    public ResponseEntity<HttpStatus> editCar(@PathVariable long id, @RequestBody CarDTO carDTO) {
        if (carService.findById(id) != null && supplierService.findById(carDTO.getSupplier()).isPresent()) {
            carService.saveEditCar(id, convertToCar(carDTO), carDTO);
        }
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PostMapping("/car/add")
    public ResponseEntity<HttpStatus> save(@RequestBody CarDTO carDTO){
        carService.save(convertToCar(carDTO),carDTO);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @DeleteMapping("/car/delete/{id}")
    public void delete(@PathVariable long id) {
        carService.delete(id);
    }

    private Car convertToCar(CarDTO carDTO) {
        return modelMapper.map(carDTO, Car.class);
    }


}
