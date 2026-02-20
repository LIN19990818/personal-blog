package com.blog.service;

import com.blog.dto.request.CityCreateRequest;
import com.blog.dto.response.CityResponse;
import com.blog.entity.City;
import com.blog.exception.BusinessException;
import com.blog.exception.ErrorCode;
import com.blog.repository.CityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CityService {
    
    private final CityRepository cityRepository;
    
    public List<CityResponse> getAllCities() {
        return cityRepository.findAllByOrderByVisitCountDesc().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }
    
    public CityResponse getCityById(Long id) {
        City city = cityRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND, "城市不存在"));
        return toResponse(city);
    }
    
    @Transactional
    public CityResponse createCity(CityCreateRequest request) {
        if (cityRepository.existsByName(request.getName())) {
            throw new BusinessException("城市已存在");
        }
        
        City city = new City();
        city.setName(request.getName());
        city.setLatitude(request.getLatitude());
        city.setLongitude(request.getLongitude());
        city.setVisitCount(request.getVisitCount());
        city.setFirstVisit(request.getFirstVisit());
        city.setNotes(request.getNotes());
        
        City savedCity = cityRepository.save(city);
        return toResponse(savedCity);
    }
    
    @Transactional
    public CityResponse updateCity(Long id, CityCreateRequest request) {
        City city = cityRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND, "城市不存在"));
        
        if (!city.getName().equals(request.getName()) && cityRepository.existsByName(request.getName())) {
            throw new BusinessException("城市名称已存在");
        }
        
        city.setName(request.getName());
        city.setLatitude(request.getLatitude());
        city.setLongitude(request.getLongitude());
        city.setVisitCount(request.getVisitCount());
        city.setFirstVisit(request.getFirstVisit());
        city.setNotes(request.getNotes());
        
        City updatedCity = cityRepository.save(city);
        return toResponse(updatedCity);
    }
    
    @Transactional
    public void deleteCity(Long id) {
        if (!cityRepository.existsById(id)) {
            throw new BusinessException(ErrorCode.NOT_FOUND, "城市不存在");
        }
        cityRepository.deleteById(id);
    }
    
    private CityResponse toResponse(City city) {
        return new CityResponse(
                city.getId(),
                city.getName(),
                city.getLatitude(),
                city.getLongitude(),
                city.getVisitCount(),
                city.getFirstVisit(),
                city.getNotes(),
                city.getCreatedAt(),
                city.getUpdatedAt()
        );
    }
}
