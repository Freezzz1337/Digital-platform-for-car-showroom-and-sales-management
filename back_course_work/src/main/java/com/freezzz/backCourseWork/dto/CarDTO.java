package com.freezzz.backCourseWork.dto;

import com.freezzz.backCourseWork.models.Supplier;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import javax.persistence.Lob;
import java.time.LocalDate;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CarDTO {
    private String name;
    private String color;
    private String fuel;
    private String description;
    private String equipment;
    private LocalDate dateOfManufacture;
    private double price;
    private double mileage;
    private double engine;
    private String picture;
    private int supplier;
}