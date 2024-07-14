package com.maximus.VO;

import lombok.Data;

/**
 * @author maximusyoung
 */
@Data
public class TxTypeVO {
    private String name;

    private String fatherId;

    private String subName;

    private Boolean isLeaf;

    private Integer kind;

}
