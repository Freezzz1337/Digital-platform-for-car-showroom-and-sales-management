package com.freezzz.backCourseWork.services;

import com.freezzz.backCourseWork.dto.CarDTO;
import com.freezzz.backCourseWork.models.Car;
import com.freezzz.backCourseWork.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.sql.rowset.serial.SerialBlob;
import java.io.ByteArrayInputStream;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.Base64;
import java.util.List;

@Service
@Transactional(readOnly = true)
public class CarService {
    private final CarRepository carRepository;
    private final SupplierService supplierService;

    @Autowired
    public CarService(CarRepository carRepository, SupplierService supplierService) {
        this.carRepository = carRepository;
        this.supplierService = supplierService;
    }

    public List<Car> findAll() {
        return carRepository.findAll();
    }

    @Transactional
    public void save(Car newCar, CarDTO carDTO) {
        newCar.setPicture(convertToByteArray(carDTO.getPicture()));
        newCar.setSupplier(supplierService.findById(carDTO.getSupplier()).get());
        carRepository.save(newCar);
    }

    public Car findById(long id) {
        return carRepository.findById(id);
    }

    @Transactional
    public void saveEditCar(long id, Car editCar, CarDTO carDTO) {
        editCar.setId(id);
        editCar.setSupplier(supplierService.findById(carDTO.getSupplier()).get());

        if (carDTO.getPicture() != null)
            editCar.setPicture(convertToByteArray(carDTO.getPicture()));
        else
            editCar.setPicture(carRepository.findById(id).getPicture());

        carRepository.save(editCar);
    }

    @Transactional
    public void delete(long id) {
        carRepository.deleteById(id);
    }


    private byte[] convertToByteArray(String base64) {
        base64 = base64.replace("data:image/jpeg;base64,", "");
        return Base64.getDecoder().decode(base64);
    }
}