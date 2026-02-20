package com.blog.service;

import com.blog.dto.response.VisitStatResponse;
import com.blog.entity.VisitStat;
import com.blog.repository.VisitStatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VisitStatService {
    
    private final VisitStatRepository visitStatRepository;
    
    public List<VisitStatResponse> getStatsByDateRange(LocalDate startDate, LocalDate endDate) {
        return visitStatRepository.findByDateRange(startDate, endDate).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }
    
    public Long getTotalPageViews(LocalDate startDate, LocalDate endDate) {
        Long total = visitStatRepository.sumPageViewsByDateRange(startDate, endDate);
        return total != null ? total : 0L;
    }
    
    public Long getTotalUniqueVisitors(LocalDate startDate, LocalDate endDate) {
        Long total = visitStatRepository.sumUniqueVisitorsByDateRange(startDate, endDate);
        return total != null ? total : 0L;
    }
    
    @Transactional
    public void recordVisit(String visitorId) {
        LocalDate today = LocalDate.now();
        VisitStat stat = visitStatRepository.findByVisitDate(today)
                .orElseGet(() -> {
                    VisitStat newStat = new VisitStat();
                    newStat.setVisitDate(today);
                    newStat.setPageViews(0);
                    newStat.setUniqueVisitors(0);
                    return newStat;
                });
        
        stat.setPageViews(stat.getPageViews() + 1);
        visitStatRepository.save(stat);
    }
    
    private VisitStatResponse toResponse(VisitStat stat) {
        return new VisitStatResponse(
                stat.getVisitDate(),
                stat.getPageViews(),
                stat.getUniqueVisitors()
        );
    }
}
