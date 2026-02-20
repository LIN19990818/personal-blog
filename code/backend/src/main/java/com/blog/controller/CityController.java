package com.blog.controller;

import com.blog.common.Result;
import com.blog.dto.request.CityCreateRequest;
import com.blog.dto.response.CityResponse;
import com.blog.service.CityService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cities")
@RequiredArgsConstructor
public class CityController {
    
    private final CityService cityService;
    
    @GetMapping
    public Result<List<CityResponse>> getAllCities() {
        return Result.success(cityService.getAllCities());
    }
    
    @GetMapping("/{id}")
    public Result<CityResponse> getCityById(@PathVariable Long id) {
        return Result.success(cityService.getCityById(id));
    }
    
    @PostMapping
    public Result<CityResponse> createCity(@Valid @RequestBody CityCreateRequest request) {
        return Result.success(cityService.createCity(request));
    }
    
    @PutMapping("/{id}")
    public Result<CityResponse> updateCity(@PathVariable Long id, @Valid @RequestBody CityCreateRequest request) {
        return Result.success(cityService.updateCity(id, request));
    }
    
    @DeleteMapping("/{id}")
    public Result<Void> deleteCity(@PathVariable Long id) {
        cityService.deleteCity(id);
        return Result.success();
    }
}
