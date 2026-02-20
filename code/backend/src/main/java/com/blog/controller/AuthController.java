package com.blog.controller;

import com.blog.common.Result;
import com.blog.dto.request.LoginRequest;
import com.blog.dto.request.AdminUpdateRequest;
import com.blog.dto.request.PasswordUpdateRequest;
import com.blog.dto.response.LoginResponse;
import com.blog.dto.response.AdminResponse;
import com.blog.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public Result<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = authService.login(request);
        return Result.success(response);
    }

    @GetMapping("/profile")
    public Result<AdminResponse> getProfile(@RequestAttribute("adminId") Long adminId) {
        AdminResponse response = authService.getProfile(adminId);
        return Result.success(response);
    }

    @PutMapping("/profile")
    public Result<AdminResponse> updateProfile(
            @RequestAttribute("adminId") Long adminId,
            @Valid @RequestBody AdminUpdateRequest request) {
        AdminResponse response = authService.updateProfile(adminId, request);
        return Result.success(response);
    }

    @PutMapping("/password")
    public Result<Void> updatePassword(
            @RequestAttribute("adminId") Long adminId,
            @Valid @RequestBody PasswordUpdateRequest request) {
        authService.updatePassword(adminId, request);
        return Result.success();
    }
}
