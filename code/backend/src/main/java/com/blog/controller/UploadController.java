package com.blog.controller;

import com.blog.common.Result;
import com.blog.dto.response.UploadResponse;
import com.blog.service.UploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
public class UploadController {

    @Autowired
    private UploadService uploadService;

    @PostMapping("/admin/upload")
    public Result<UploadResponse> upload(
            @RequestAttribute("adminId") Long adminId,
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "type", required = false, defaultValue = "covers") String type) {
        UploadResponse response = uploadService.uploadFile(file, type);
        return Result.success(response);
    }
}
