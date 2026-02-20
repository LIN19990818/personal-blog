package com.blog.repository;

import com.blog.entity.Timeline;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TimelineRepository extends JpaRepository<Timeline, Long> {
    
    List<Timeline> findAllByOrderByDisplayOrderAsc();
    
    @Query("SELECT MAX(t.displayOrder) FROM Timeline t")
    Integer findMaxDisplayOrder();
    
    @Modifying
    @Query("UPDATE Timeline t SET t.displayOrder = t.displayOrder + 1 WHERE t.displayOrder BETWEEN :start AND :end")
    void incrementOrdersBetween(@Param("start") Integer start, @Param("end") Integer end);
    
    @Modifying
    @Query("UPDATE Timeline t SET t.displayOrder = t.displayOrder - 1 WHERE t.displayOrder BETWEEN :start AND :end")
    void decrementOrdersBetween(@Param("start") Integer start, @Param("end") Integer end);
    
    @Modifying
    @Query("UPDATE Timeline t SET t.displayOrder = t.displayOrder - 1 WHERE t.displayOrder > :order")
    void decrementOrdersAfter(@Param("order") Integer order);
}
