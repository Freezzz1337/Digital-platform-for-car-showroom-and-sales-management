package com.freezzz.backCourseWork.controllers;

import com.freezzz.backCourseWork.dto.SupplierDTO;
import com.freezzz.backCourseWork.models.Supplier;
import com.freezzz.backCourseWork.services.SupplierService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/management")
public class SupplierManagementController {

    private final SupplierService supplierService;
    private final ModelMapper modelMapper;

    @Autowired
    public SupplierManagementController(SupplierService supplierService, ModelMapper modelMapper) {
        this.supplierService = supplierService;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/supplier")
    public List<Supplier> getAll() {
        return supplierService.getAll();
    }

    @GetMapping("/supplier/edit/{id}")
    public Supplier editSupplier(@PathVariable long id) {
        return supplierService.findById(id).get();
    }

    @PatchMapping("/supplier/edit/{id}")
    public ResponseEntity<HttpStatus> editSupplier(@PathVariable long id, @RequestBody SupplierDTO supplierDTO) {
        supplierService.saveEdit(id, convertToSupplier(supplierDTO));
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PostMapping("/supplier/add")
    public ResponseEntity<HttpStatus> save(@RequestBody SupplierDTO supplierDTO) {
        supplierService.save(convertToSupplier(supplierDTO));
        return ResponseEntity.ok(HttpStatus.OK);
    }


    private Supplier convertToSupplier(SupplierDTO supplierDTO) {
        return modelMapper.map(supplierDTO, Supplier.class);
    }
}
