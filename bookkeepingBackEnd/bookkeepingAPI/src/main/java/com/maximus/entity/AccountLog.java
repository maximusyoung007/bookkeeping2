package com.maximus.entity;

import lombok.Data;

/**
 * @author maximusyoung
 */
@Data
public class AccountLog {
    private String id;

    private String systemTime;

    private String accountNo;

    private Double balance;

    private Double amount;
}
