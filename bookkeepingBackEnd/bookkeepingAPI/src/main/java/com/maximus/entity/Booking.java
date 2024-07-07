package com.maximus.entity;

import lombok.Data;

@Data
public class Booking {
    /**
     * 系统流水号
     */
    private String systemNo;

    //交易时间,格式：yyyyMMddhh24mmss
    private String txTime;

    //交易类型枚举
    private String txType;

    //二级交易类型
    private String subTxType;

    //标签
    private String tag;

    //交易对方
    private String counterparty;

    //商品
    private String goods;

    //收/支，0-收 1-支
    private String inorout;

    //金额
    private Long amount;

    //账户号码，2024年7月之前的数据只存档，不关联到账户信息上
    private String accountNo;

    //状态枚举
    private String status;

    //备注
    private String remark;

}

