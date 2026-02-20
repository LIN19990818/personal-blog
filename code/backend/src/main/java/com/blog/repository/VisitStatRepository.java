package com.blog.repository;

import com.blog.entity.VisitStat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface VisitStatRepository extends JpaRepository<VisitStat, Long> {
    
    Optional<VisitStat> findByVisitDate(LocalDate visitDate);
    
    @Query("SELECT v FROM VisitStat v WHERE v.visitDate BETWEEN :startDate AND :endDate ORDER BY v.visitDate DESC")
    List<VisitStat> findByDateRange(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
    
    @Query("SELECT SUM(v.pageViews) FROM VisitStat v WHERE v.visitDate BETWEEN :startDate AND :endDate")
    Long sumPageViewsByDateRange(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
    
    @Query("SELECT SUM(v.uniqueVisitors) FROM VisitStat v WHERE v.visitDate BETWEEN :startDate AND :endDate")
    Long sumUniqueVisitorsByDateRange(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
}
