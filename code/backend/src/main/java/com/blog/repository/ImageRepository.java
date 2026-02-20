package com.blog.repository;

import com.blog.entity.Image;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {
    
    List<Image> findAllByOrderByDisplayOrderAsc();
    
    List<Image> findByLocationContainingOrderByDisplayOrderAsc(String location);
    
    @Query("SELECT MAX(i.displayOrder) FROM Image i")
    Integer findMaxDisplayOrder();
    
    @Modifying
    @Query("UPDATE Image i SET i.displayOrder = i.displayOrder + 1 WHERE i.displayOrder BETWEEN :start AND :end")
    void incrementOrdersBetween(@Param("start") Integer start, @Param("end") Integer end);
    
    @Modifying
    @Query("UPDATE Image i SET i.displayOrder = i.displayOrder - 1 WHERE i.displayOrder BETWEEN :start AND :end")
    void decrementOrdersBetween(@Param("start") Integer start, @Param("end") Integer end);
    
    @Modifying
    @Query("UPDATE Image i SET i.displayOrder = i.displayOrder - 1 WHERE i.displayOrder > :order")
    void decrementOrdersAfter(@Param("order") Integer order);
}
