package com.maximus.entity;

import lombok.Data;

/**
 * 交易类型
 * @author maximusyoung
 */
@Data
public class TxType {
    private String id;

    private String name;

    private String fatherId;

    /**
     * 是否是二级分类
     */
    private Integer isLeaf;

    private Integer kind;

}
