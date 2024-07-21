package com.maximus.dao;

import com.maximus.entity.Booking;
import com.maximus.mapper.AccountMapper;
import com.maximus.mapper.BookingMapper;
import com.maximus.service.BookingService;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

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
        int count1 = bookingService.recordOne(booking);

        int count2 = 0;
        if (booking.getInorout().equals(0)) {
            count2 = accountMapper.updateAmount(booking.getAccountNo(), "-" + booking.getAmount());
        } else if (booking.getInorout().equals(1)) {
            count2 = accountMapper.updateAmount(booking.getAccountNo(), String.valueOf(booking.getAmount()));
        }
        return count1 + count2;
    }
}
