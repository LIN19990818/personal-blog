package com.blog.repository;

import com.blog.entity.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CityRepository extends JpaRepository<City, Long> {
    
    List<City> findAllByOrderByVisitCountDesc();
    
    Optional<City> findByName(String name);
    
    boolean existsByName(String name);
}
