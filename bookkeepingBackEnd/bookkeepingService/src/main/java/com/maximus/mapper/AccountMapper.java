package com.maximus.mapper;

import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.maximus.entity.Account;
import org.apache.ibatis.annotations.Update;

/**
 * @author maximusyoung
 */
public interface AccountMapper extends BaseMapper<Account> {

    default int updateAmount(String accountNo, String amount) {
        LambdaUpdateWrapper<Account> updateWrapper = new LambdaUpdateWrapper<>();
        updateWrapper.setSql("balance = balance - " + amount);
        updateWrapper.eq(Account::getAccountNo, accountNo);
        return this.update(null, updateWrapper);
    }
}
