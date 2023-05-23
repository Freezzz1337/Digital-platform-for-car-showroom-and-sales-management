package com.freezzz.backCourseWork.services;

import com.freezzz.backCourseWork.models.Supplier;
import com.freezzz.backCourseWork.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class SupplierService {
    private final SupplierRepository supplierRepository;

    @Autowired
    public SupplierService(SupplierRepository supplierRepository) {
        this.supplierRepository = supplierRepository;
    }

    public Optional<Supplier> findById(long id){
        return supplierRepository.findById(id);
    }

    @Transactional
    public void saveEdit(long id, Supplier supplierEdit){
        supplierEdit.setId(supplierRepository.findById(id).get().getId());
        supplierRepository.save(supplierEdit);
    }

    @Transactional
    public void save(Supplier supplier){
        supplierRepository.save(supplier);
    }

    public List<Supplier> getAll(){
        return supplierRepository.findAll();
    }
}
