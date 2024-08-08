package com.maximus.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.maximus.SystemEnvironment;
import com.maximus.VO.BookingVO;
import com.maximus.dao.BookingDAO;
import com.maximus.entity.Booking;
import com.maximus.entity.Result;
import com.maximus.entity.TxType;
import com.maximus.mapper.BookingMapper;
import com.maximus.mapper.TxTypeMapper;
import com.maximus.service.BookingService;
import org.apache.dubbo.common.utils.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
    private BookingMapper bookingMapper;

    @Resource
    private BookingService bookingService;

    @Resource
    private BookingDAO bookingDAO;

    @PostMapping("addBooking")
    public Result addBooking(@RequestBody BookingVO bookingVO) {
        try {
            Booking booking = generateBooking(bookingVO);

            if (StringUtils.isEmpty(bookingVO.getAccountNo()) || "000".equals(bookingVO.getAccountNo())) {
                booking.setAccountNo("000");
                int count = bookingService.recordOne(booking);
                if (count == 1) {
                    return Result.success(count);
                }
            }

            int count = bookingDAO.recordABook(booking);
            if (count == 2) {
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
        booking.setInorout(vo.getInOrOut());
        booking.setAmount(vo.getAmount());
        booking.setAccountNo(vo.getAccountNo());

        return booking;
    }

    @PostMapping("getDailyBooking")
    public Result getDailyBooking(@RequestBody BookingVO bookingVO) {
        try {
            Map<String, Object> queryMap = new HashMap<>();
            queryMap.put("tx_time", bookingVO.getDate());

            List<Booking> bookingList = bookingMapper.selectByMap(queryMap);

            List<BookingVO> voList = new ArrayList<>();
            BigDecimal income = new BigDecimal("0.00");
            BigDecimal outCome = new BigDecimal("0.00");
            for (Booking booking : bookingList) {
                BookingVO vo = new BookingVO();
                if (booking.getSubTxType() != null) {
                    vo.setTxTypeName(SystemEnvironment.TX_TYPE_MAP.get(booking.getSubTxType()));
                } else {
                    vo.setTxTypeName(SystemEnvironment.TX_TYPE_MAP.get(booking.getTxType()));
                }
                vo.setTxType(booking.getTxType());

                Double amount = booking.getAmount();
                BigDecimal amountDecimal = new BigDecimal(amount);
                if ("0".equals(booking.getInorout())) {
                    income.add(amountDecimal);
                } else if ("1".equals(booking.getInorout())) {
                    outCome.add(amountDecimal);
                }

                vo.setAmount(booking.getAmount());

                vo.setInOrOut(booking.getInorout());
                vo.setGoodsName(booking.getGoods());
                voList.add(vo);
            }

            Map<String, Object> res = new HashMap<>();
            res.put("bookingVOList", voList);
            res.put("income", income);
            res.put("outcome", outCome);

            return Result.success(voList);
        } catch (Exception e) {
            logger.info("查询异常", e);
            return Result.fail(2001, "查询异常");
        }

    }

    @GetMapping("/test")
    public String test() {
        return "hello world";
    }
}
