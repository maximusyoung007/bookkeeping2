package com.maximus.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.maximus.SystemEnvironment;
import com.maximus.VO.AccountVO;
import com.maximus.entity.Account;
import com.maximus.entity.Result;
import com.maximus.entity.TxType;
import com.maximus.mapper.AccountMapper;
import com.maximus.mapper.TxTypeMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * @author maximusyoung
 */
@RestController
@RequestMapping("/account")
public class AccountController {
    protected static Logger logger = LoggerFactory.getLogger(BookingController.class);

    @Resource
    private AccountMapper accountMapper;

    @Resource
    private TxTypeMapper txTypeMapper;

    /**
     * 查询所有的账本
     */
    @PostMapping("getAccount")
    public Result getAccount() {
        try {
            QueryWrapper<Account> queryWrapper = new QueryWrapper<>();
            List<Account> accountList = accountMapper.selectList(queryWrapper);

            List<AccountVO> accountVOList = new ArrayList<>();
            Double totalAmount = 0d;
            for (Account account : accountList) {
                AccountVO accountVO = new AccountVO();
                BeanUtils.copyProperties(account, accountVO);

                if (account.getAccountSubType() != null) {
                    accountVO.setAccountTypeName(SystemEnvironment.TX_TYPE_MAP.get(account.getAccountSubType()));
                } else if (account.getAccountType() != null) {
                    accountVO.setAccountTypeName(SystemEnvironment.TX_TYPE_MAP.get(account.getAccountType()));
                } else {
                    logger.info("账户号为：" + account.getAccountNo() + "的账户，账本类型错误");
                    return Result.fail(2001, "账本类型错误");
                }
                totalAmount += Double.parseDouble(account.getBalance());

                accountVOList.add(accountVO);
            }
            Map<String, Object> data = new HashMap<>();
            data.put("totalBalance", totalAmount);
            data.put("list", accountVOList);
            return Result.success(data);
        } catch (Exception e) {
            logger.info("程序异常", e);
        }
        return null;
    }

    /**
     * 增加账户
     * @return
     */
    @PostMapping("addAccount")
    public Result addAccount(@RequestBody AccountVO accountVO) {
        try {
            Account account = new Account();
            BeanUtils.copyProperties(accountVO, account);

            account.setAccountNo(UUID.randomUUID().toString());
            account.setSystemTime(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss")));
            account.setUpdateTime(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss")));
            account.setStatus("10");
            String accountType = accountVO.getAccountType();
            QueryWrapper<TxType> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("id", accountType);
            TxType txType = txTypeMapper.selectOne(queryWrapper);
            if (txType.getId().equals(txType.getFatherId())) {
                account.setAccountType(accountType);
                account.setAccountSubType(accountType);
            } else {
                account.setAccountSubType(accountType);
                account.setAccountType(txType.getFatherId());
            }

            int count = accountMapper.insert(account);
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
}
