package com.blog.service;

import com.blog.dto.request.SystemSettingRequest;
import com.blog.dto.response.SystemSettingResponse;
import com.blog.entity.SystemSetting;
import com.blog.exception.BusinessException;
import com.blog.exception.ErrorCode;
import com.blog.repository.SystemSettingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SystemSettingService {
    
    private final SystemSettingRepository systemSettingRepository;
    
    public List<SystemSettingResponse> getAllSettings() {
        return systemSettingRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }
    
    public SystemSettingResponse getSettingByKey(String key) {
        SystemSetting setting = systemSettingRepository.findByKey(key)
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND, "设置项不存在"));
        return toResponse(setting);
    }
    
    @Transactional
    public SystemSettingResponse saveSetting(SystemSettingRequest request) {
        SystemSetting setting = systemSettingRepository.findByKey(request.getKey())
                .orElse(new SystemSetting());
        
        setting.setKey(request.getKey());
        setting.setValue(request.getValue());
        setting.setDescription(request.getDescription());
        
        SystemSetting savedSetting = systemSettingRepository.save(setting);
        return toResponse(savedSetting);
    }
    
    @Transactional
    public void deleteSetting(String key) {
        SystemSetting setting = systemSettingRepository.findByKey(key)
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND, "设置项不存在"));
        systemSettingRepository.delete(setting);
    }
    
    private SystemSettingResponse toResponse(SystemSetting setting) {
        return new SystemSettingResponse(
                setting.getId(),
                setting.getKey(),
                setting.getValue(),
                setting.getDescription(),
                setting.getUpdatedAt()
        );
    }
}
