package com.freezzz.backCourseWork.repository;

import com.freezzz.backCourseWork.models.Sales;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.stereotype.Repository;

@Repository
public interface SalesRepository extends JpaRepository<Sales,Long> {

    @Procedure(name = "sumPrice")
    double sumPrice();
}
