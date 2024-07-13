package com.maximus.serviceImpl;

import com.maximus.entity.TxType;
import com.maximus.mapper.TxTypeMapper;
import com.maximus.service.TxTypeService;
import org.apache.dubbo.config.annotation.DubboService;

import javax.annotation.Resource;

/**
 * @author maximusyoung
 */
@DubboService
public class TxTypeServiceImpl implements TxTypeService {
    @Resource
    private TxTypeMapper txTypeMapper;

    @Override
    public int addType(TxType txType) {
        return txTypeMapper.insert(txType);
    }
}
