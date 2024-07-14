package com.maximus.VO;

import lombok.Data;

/**
 * @author maximusyoung
 */
@Data
public class BookingVO {
    private String accountNumber;

    private Double amount;

    private String counterparty;

    private String date;

    private String goodsName;

    private String txType;
}
