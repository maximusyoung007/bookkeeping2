package com.maximus.controller;

import com.maximus.VO.TxTypeVO;
import com.maximus.dao.BaseDAO;
import com.maximus.dao.TxTypeDAO;
import com.maximus.entity.Result;
import com.maximus.entity.TxType;
import com.maximus.mapper.TxTypeMapper;
import com.maximus.service.TxTypeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * @author maximusyoung
 */
@RestController
@RequestMapping("/txType")
public class TxTypeController {
    protected static Logger logger = LoggerFactory.getLogger(BaseDAO.class);

    @Resource
    private TxTypeService txTypeService;

    @Resource
    private TxTypeDAO txTypeDAO;

    @Resource
    private TxTypeMapper txTypeMapper;

    @PostMapping("addTxType")
    public Result addTxType(@RequestBody TxTypeVO txTypeVO) {
        try {
            //叶子节点直接保存
            if (txTypeVO.getIsLeaf()) {
                TxType txType = new TxType();
                txType.setId(UUID.randomUUID().toString());
                txType.setFatherId(txTypeVO.getFatherId());
                txType.setIsLeaf(1);
                txType.setName(txTypeVO.getSubName());
                int count = txTypeService.addType(txType);
                if (count == 1) {
                    return Result.success("插入成功");
                }
            } else {
                TxType txType = new TxType();
                TxType subTxType = new TxType();

                txType.setId(UUID.randomUUID().toString());
                txType.setName(txTypeVO.getName());
                txType.setIsLeaf(0);

                subTxType.setId(UUID.randomUUID().toString());
                subTxType.setFatherId(txType.getId());
                subTxType.setName(txTypeVO.getSubName());
                subTxType.setIsLeaf(1);

                try {
                    int count = txTypeDAO.addTxType(txType, subTxType);

                    if (count == 2) {
                        return Result.success("插入成功");
                    }
                } catch (Exception e) {
                    logger.error("数据库异常", e);
                }
            }
        } catch (DuplicateKeyException dke) {
            return Result.fail(2001, "分类名称重复");
        } catch (Exception e) {
            return Result.fail(2001, e.toString());
        }

        return null;
    }

    @GetMapping("getTxType")
    public Result getTxType() {
        Map<String, Object> map = new HashMap<>();
        map.put("isLeaf", false);
        List<TxType> typeList = txTypeMapper.selectByMap(map);
        return Result.success(typeList);
    }
}
