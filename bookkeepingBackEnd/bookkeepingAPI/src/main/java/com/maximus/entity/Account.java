package com.maximus.entity;

import lombok.Data;

@Data
public class Account {
    //账户编号
    private String accountNo;

    //主账户编号
    private String primaryAccountNo;

    //用户Id
    private String userId;

    //系统时间,格式：yyyyMMddhh24mmss
    private String systemTime;

    //最后更新时间
    private String updateTime;

    //余额（净资产）
    private Long balance;

    //总资产
    private Long property;

    //账户类型
    private String accountType;

    //子账户类型
    private String accountSubType;

    //状态枚举
    private String status;

    //备注
    private String remark;

}
