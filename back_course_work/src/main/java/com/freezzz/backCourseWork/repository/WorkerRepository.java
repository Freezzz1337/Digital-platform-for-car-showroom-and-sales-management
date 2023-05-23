package com.freezzz.backCourseWork.repository;

import com.freezzz.backCourseWork.models.Worker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface WorkerRepository extends JpaRepository<Worker, Long> {
    Optional<Worker> findByLogin(String login);

    Worker findByLoginAndPassword (String login, String password);
}
