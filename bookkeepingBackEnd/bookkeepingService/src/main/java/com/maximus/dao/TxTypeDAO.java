package com.maximus.dao;

import com.maximus.entity.TxType;
import com.maximus.mapper.TxTypeMapper;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

/**
 * @author maximusyoung
 */
@Component("txTypeDAO")
public class TxTypeDAO extends BaseDAO {
    @Resource
    private TxTypeMapper txTypeMapper;

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public int addTxType(TxType txType, TxType subTxType) {
        int count1 = txTypeMapper.insert(txType);
        int count2 = txTypeMapper.insert(subTxType);
        return count1 + count2;
    }
}
