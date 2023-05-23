package com.freezzz.backCourseWork.models;

import lombok.*;

import javax.persistence.*;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "sales", indexes = {@Index(name = "priceIndexSales", columnList = "price")})
public class Sales {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "price")
    private double price;

    @ManyToOne
    @JoinColumn(name = "car_id")
    private Car car;


    @ManyToOne
    @JoinColumn(name = "worker_id")
    private Worker worker;

    public Sales(Car car, Worker worker1, double price) {
        this.car = car;
        this.worker = worker1;
        this.price = price;
    }
}
