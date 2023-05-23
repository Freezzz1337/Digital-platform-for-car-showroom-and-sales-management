package com.freezzz.backCourseWork.controllers;

import com.freezzz.backCourseWork.dto.SalesDTO;
import com.freezzz.backCourseWork.models.Sales;
import com.freezzz.backCourseWork.services.SalesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/management")
public class SalesController {

    private final SalesService salesService;

    @Autowired
    public SalesController(SalesService salesService) {
        this.salesService = salesService;
    }

    @GetMapping("/sales")
    public List<Sales> getAll(){
        return salesService.getAll();
    }

    @GetMapping("/salesSummary")
    public double getSum(){
        return salesService.sum();
    }

    @PostMapping("/addSales")
    public ResponseEntity<HttpStatus> addSale(@RequestBody SalesDTO salesDTO) {
        salesService.save(salesDTO);
        return ResponseEntity.ok(HttpStatus.OK);
    }
}
