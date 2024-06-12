package com.maximus.serviceImpl;

import com.maximus.service.DemoService;
import org.apache.dubbo.config.annotation.DubboService;

/**
 * <pre>
 * Modify Information:
 * Author       Date          Description
 * ============ ============= ============================
 * maximus         2024/6/7      create
 */
@DubboService
public class DemoServiceImpl implements DemoService {

    public String sayHello(String name) {
        return "hello" + name;
    }
}
