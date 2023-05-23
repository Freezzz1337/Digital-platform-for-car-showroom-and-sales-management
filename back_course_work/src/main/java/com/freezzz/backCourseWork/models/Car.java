package com.freezzz.backCourseWork.models;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "car",indexes = {@Index(name = "nameAndPrice", columnList = "name,price")})
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "color")
    private String color;
    @Column(name = "fuel")
    private String fuel;
    @Column(name = "description",length = 1000)
    private String description;
    @Column(name = "equipment")
    private String equipment;
    @Column(name = "date_of_manufacture")
    private LocalDate dateOfManufacture;

    @Column(name = "price")
    private double price;

    @Column(name = "mileage")
    private double mileage;
    @Column(name = "engine")
    private double engine;

    @Lob
    @Column(name = "picture")
    private byte[] picture;

    @ManyToOne
    @JoinColumn(name = "supplier_id")
    private Supplier supplier;

    public Car(String name, Supplier supplier, String color, String fuel, String description, String equipment, LocalDate dateOfManufacture, double price, double mileage, double engine, byte[] picture) {
        this.name = name;
        this.supplier = supplier;
        this.color = color;
        this.fuel = fuel;
        this.description = description;
        this.equipment = equipment;
        this.dateOfManufacture = dateOfManufacture;
        this.price = price;
        this.mileage = mileage;
        this.engine = engine;
        this.picture = picture;
    }
}
