package com.blog.exception;

import lombok.Getter;

@Getter
public enum ErrorCode {
    
    PARAM_ERROR(40001, "参数校验失败"),
    PARAM_FORMAT_ERROR(40002, "参数格式错误"),
    
    UNAUTHORIZED(40101, "未登录"),
    TOKEN_EXPIRED(40102, "Token已过期"),
    TOKEN_INVALID(40103, "Token无效"),
    
    FORBIDDEN(40301, "无权限访问"),
    
    NOT_FOUND(40401, "资源不存在"),
    
    INTERNAL_ERROR(50001, "服务器内部错误");
    
    private final Integer code;
    private final String message;
    
    ErrorCode(Integer code, String message) {
        this.code = code;
        this.message = message;
    }
}
