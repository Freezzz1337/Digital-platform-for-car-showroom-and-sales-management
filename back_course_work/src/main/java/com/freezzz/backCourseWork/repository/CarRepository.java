package com.freezzz.backCourseWork.repository;

import com.freezzz.backCourseWork.models.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {

    @Query(value = "SELECT * FROM car", nativeQuery = true)
    public Iterable<Car> getAllCar();

    public Car findById(long id);

}
