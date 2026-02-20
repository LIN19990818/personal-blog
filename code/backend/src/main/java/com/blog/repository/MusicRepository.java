package com.blog.repository;

import com.blog.entity.Music;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MusicRepository extends JpaRepository<Music, Long> {
    
    List<Music> findAllByOrderByDisplayOrderAsc();
    
    @Query("SELECT MAX(m.displayOrder) FROM Music m")
    Integer findMaxDisplayOrder();
    
    @Modifying
    @Query("UPDATE Music m SET m.displayOrder = m.displayOrder + 1 WHERE m.displayOrder BETWEEN :start AND :end")
    void incrementOrdersBetween(@Param("start") Integer start, @Param("end") Integer end);
    
    @Modifying
    @Query("UPDATE Music m SET m.displayOrder = m.displayOrder - 1 WHERE m.displayOrder BETWEEN :start AND :end")
    void decrementOrdersBetween(@Param("start") Integer start, @Param("end") Integer end);
    
    @Modifying
    @Query("UPDATE Music m SET m.displayOrder = m.displayOrder - 1 WHERE m.displayOrder > :order")
    void decrementOrdersAfter(@Param("order") Integer order);
}
