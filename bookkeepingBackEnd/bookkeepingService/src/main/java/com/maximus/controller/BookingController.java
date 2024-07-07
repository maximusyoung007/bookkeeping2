package com.maximus.controller;

import com.maximus.entity.Booking;
import com.maximus.service.BookingService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
@RequestMapping("/booking")
public class BookingController {
    @Resource
    private BookingService bookingService;

    @PostMapping("addBooking")
    public int addBooking(@RequestBody Booking booking) {
        return bookingService.recordOne(booking);
    }

    @GetMapping("/test")
    public String test() {
        return "hello world";
    }
}
