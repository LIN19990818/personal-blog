package com.blog.controller;

import com.blog.common.Result;
import com.blog.dto.response.VisitStatResponse;
import com.blog.service.VisitStatService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/stats")
@RequiredArgsConstructor
public class VisitStatController {
    
    private final VisitStatService visitStatService;
    
    @GetMapping
    public Result<List<VisitStatResponse>> getStatsByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        return Result.success(visitStatService.getStatsByDateRange(startDate, endDate));
    }
    
    @GetMapping("/summary")
    public Result<Map<String, Object>> getStatsSummary(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        Map<String, Object> summary = new HashMap<>();
        summary.put("totalPageViews", visitStatService.getTotalPageViews(startDate, endDate));
        summary.put("totalUniqueVisitors", visitStatService.getTotalUniqueVisitors(startDate, endDate));
        return Result.success(summary);
    }
    
    @PostMapping("/record")
    public Result<Void> recordVisit(@RequestParam(required = false) String visitorId) {
        visitStatService.recordVisit(visitorId);
        return Result.success();
    }
}
