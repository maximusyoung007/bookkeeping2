package com.maximus.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.maximus.VO.BookingVO;
import com.maximus.entity.Booking;
import com.maximus.entity.Result;
import com.maximus.entity.TxType;
import com.maximus.mapper.TxTypeMapper;
import com.maximus.service.BookingService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.UUID;

/**
 * @author maximusyoung
 */
@RestController
@RequestMapping("/booking")
public class BookingController {
    protected static Logger logger = LoggerFactory.getLogger(BookingController.class);

    @Resource
    private TxTypeMapper txTypeMapper;

    @Resource
    private BookingService bookingService;

    @PostMapping("addBooking")
    public Result addBooking(@RequestBody BookingVO bookingVO) {
        try {
            Booking booking = generateBooking(bookingVO);

            int count = bookingService.recordOne(booking);
            if (count == 1) {
                return Result.success(count);
            } else {
                return Result.fail(2001, "系统内部异常");
            }
        } catch (Exception e) {
            logger.info("系统内部异常", e);
            return Result.fail(2001, "系统内部异常");
        }
    }

    public Booking generateBooking(BookingVO vo) {
        Booking booking = new Booking();
        booking.setSystemNo(UUID.randomUUID().toString());
        booking.setTxTime(vo.getDate());

        QueryWrapper<TxType> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("id", vo.getTxType());
        TxType txType = txTypeMapper.selectOne(queryWrapper);
        //一级分类
        if (txType.getId().equals(txType.getFatherId())) {
            booking.setTxType(txType.getId());
        } else {
            booking.setTxType(txType.getFatherId());;
            booking.setSubTxType(txType.getId());
        }
        booking.setCounterparty(vo.getCounterparty());
        booking.setGoods(vo.getGoodsName());
        booking.setInorout(1);
        booking.setAmount(vo.getAmount());
        booking.setAccountNo(vo.getAccountNumber());

        return booking;
    }

    @GetMapping("/test")
    public String test() {
        return "hello world";
    }
}
