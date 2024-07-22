package com.maximus.VO;

import lombok.Data;

/**
 * @author maximusyoung
 */
@Data
public class BookingVO {
    private String accountNo;

    private Double amount;

    private String counterparty;

    private String date;

    private String goodsName;

    private String txType;

    private String txTypeName;

    private int inOrOut;
}
