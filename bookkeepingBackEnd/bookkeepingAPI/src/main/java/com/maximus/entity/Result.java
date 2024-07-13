package com.maximus.entity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @author maximusyoung
 */
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Data
public class Result<T> {
    private Boolean status;

    private Integer code;

    private String message;

    private T data;

    public static <T> Result<T> success(T data) {
        return new Result<>(true, 2000, "响应成功", data);
    }


    public static <T> Result<T> fail(Integer errorCode, String errorMessage) {
        return new Result<>(false, errorCode, errorMessage, null);
    }

}
