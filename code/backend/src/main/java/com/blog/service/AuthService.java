package com.blog.service;

import java.time.LocalDateTime;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.blog.dto.request.AdminUpdateRequest;
import com.blog.dto.request.LoginRequest;
import com.blog.dto.request.PasswordUpdateRequest;
import com.blog.dto.response.AdminResponse;
import com.blog.dto.response.LoginResponse;
import com.blog.entity.Admin;
import com.blog.exception.BusinessException;
import com.blog.exception.ErrorCode;
import com.blog.repository.AdminRepository;
import com.blog.util.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
    
    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final HttpServletRequest httpRequest;
    
    private static final int MAX_LOGIN_FAIL_COUNT = 5;
    private static final int LOCK_MINUTES = 30;
    
    @Transactional
    public LoginResponse login(LoginRequest request) {
        Admin admin = adminRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND, "用户名或密码错误"));
        
        if (admin.getLockedUntil() != null && admin.getLockedUntil().isAfter(LocalDateTime.now())) {
            long remainingMinutes = java.time.Duration.between(
                    LocalDateTime.now(), admin.getLockedUntil()).toMinutes() + 1;
            throw new BusinessException(ErrorCode.FORBIDDEN, 
                    "账户已锁定，请 " + remainingMinutes + " 分钟后重试");
        }
        
        if (!passwordEncoder.matches(request.getPassword(), admin.getPassword())) {
            int failCount = admin.getLoginFailCount() + 1;
            admin.setLoginFailCount(failCount);
            
            if (failCount >= MAX_LOGIN_FAIL_COUNT) {
                admin.setLockedUntil(LocalDateTime.now().plusMinutes(LOCK_MINUTES));
                adminRepository.save(admin);
                throw new BusinessException(ErrorCode.FORBIDDEN, 
                        "登录失败次数过多，账户已锁定 " + LOCK_MINUTES + " 分钟");
            }
            
            adminRepository.save(admin);
            int remaining = MAX_LOGIN_FAIL_COUNT - failCount;
            throw new BusinessException(ErrorCode.NOT_FOUND, 
                    "用户名或密码错误，还剩 " + remaining + " 次尝试机会");
        }
        
        admin.setLoginFailCount(0);
        admin.setLockedUntil(null);
        admin.setLastLoginAt(LocalDateTime.now());
        admin.setLastLoginIp(getClientIp());
        adminRepository.save(admin);
        
        String token = jwtUtil.generateToken(admin.getId(), admin.getUsername());
        
        AdminResponse adminResponse = convertToAdminResponse(admin);
        return new LoginResponse(token, 86400L, adminResponse);
    }
    
    private String getClientIp() {
        String ip = httpRequest.getHeader("X-Forwarded-For");
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = httpRequest.getHeader("X-Real-IP");
        }
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = httpRequest.getRemoteAddr();
        }
        if (ip != null && ip.contains(",")) {
            ip = ip.split(",")[0].trim();
        }
        return ip;
    }
    
    @Transactional(readOnly = true)
    public AdminResponse getProfile(Long adminId) {
        Admin admin = adminRepository.findById(adminId)
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND, "管理员不存在"));
        return convertToAdminResponse(admin);
    }
    
    @Transactional
    public AdminResponse updateProfile(Long adminId, AdminUpdateRequest request) {
        Admin admin = adminRepository.findById(adminId)
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND, "管理员不存在"));
        
        if (request.getNickname() != null) {
            admin.setNickname(request.getNickname());
        }
        if (request.getAvatar() != null) {
            admin.setAvatar(request.getAvatar());
        }
        
        Admin savedAdmin = adminRepository.save(admin);
        return convertToAdminResponse(savedAdmin);
    }
    
    @Transactional
    public void updatePassword(Long adminId, PasswordUpdateRequest request) {
        Admin admin = adminRepository.findById(adminId)
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND, "管理员不存在"));
        
        if (!passwordEncoder.matches(request.getOldPassword(), admin.getPassword())) {
            throw new BusinessException(ErrorCode.PARAM_ERROR, "旧密码错误");
        }
        
        admin.setPassword(passwordEncoder.encode(request.getNewPassword()));
        adminRepository.save(admin);
    }
    
    private AdminResponse convertToAdminResponse(Admin admin) {
        AdminResponse response = new AdminResponse();
        response.setId(admin.getId());
        response.setUsername(admin.getUsername());
        response.setNickname(admin.getNickname());
        response.setAvatar(admin.getAvatar());
        response.setCreatedAt(admin.getCreatedAt());
        return response;
    }
}
