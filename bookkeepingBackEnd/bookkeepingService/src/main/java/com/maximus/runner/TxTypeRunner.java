package com.maximus.runner;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.maximus.SystemEnvironment;
import com.maximus.entity.TxType;
import com.maximus.mapper.TxTypeMapper;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author maximusyoung
 * 加载交易类型缓存
 */
@Component
@Order(value = 1)
public class TxTypeRunner implements ApplicationRunner {
    @Resource
    private TxTypeMapper txTypeMapper;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        QueryWrapper<TxType> wrapper = new QueryWrapper<>();
        List<TxType> txTypeList = txTypeMapper.selectList(wrapper);

        for (TxType txType : txTypeList) {
            SystemEnvironment.TX_TYPE_MAP.put(txType.getId(), txType.getName());
        }

    }
}
