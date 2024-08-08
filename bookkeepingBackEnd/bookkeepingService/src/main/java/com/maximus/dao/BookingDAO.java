package com.maximus.dao;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.maximus.entity.Account;
import com.maximus.entity.AccountLog;
import com.maximus.entity.Booking;
import com.maximus.mapper.AccountMapper;
import com.maximus.mapper.BookingMapper;
import com.maximus.service.BookingService;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.util.UUID;

/**
 * @author maximusyoung
 */
@Component("BookingDAO")
public class BookingDAO extends BaseDAO {
    @Resource
    private BookingService bookingService;

    @Resource
    private AccountMapper accountMapper;

    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
    public int recordABook(Booking booking) {
        //记一笔账
        int count1 = bookingService.recordOne(booking);

        QueryWrapper<Account> queryWrapper = new QueryWrapper<>();
        queryWrapper.ge("account_no", booking.getAccountNo());
        Account account = accountMapper.selectOne(queryWrapper);
        //修改账户余额
        int count2 = 0;
        if (booking.getInorout().equals(0)) {
            BigDecimal
            count2 = accountMapper.updateAmount(booking.getAccountNo(), "-" + booking.getAmount());
        } else if (booking.getInorout().equals(1)) {
            count2 = accountMapper.updateAmount(booking.getAccountNo(), String.valueOf(booking.getAmount()));
        }

        //增加一笔账户变更记录
        AccountLog accountLog = new AccountLog();
        accountLog.setId(UUID.randomUUID().toString());
        accountLog.setAccountNo(booking.getAccountNo());
        accountLog.setAmount(booking.getAmount());
        accountLog.setBalance();

        return count1 + count2;
    }
}
