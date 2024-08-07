package com.maximus.serviceImpl;

import com.maximus.entity.Booking;
import com.maximus.mapper.BookingMapper;
import com.maximus.service.BookingService;
import org.apache.dubbo.config.annotation.DubboService;

import javax.annotation.Resource;

@DubboService
public class BookingServiceImpl implements BookingService {
    @Resource
    private BookingMapper bookingMapper;

    @Override
    public int recordOne(Booking booking) {
        return bookingMapper.insert(booking);
    }
}
