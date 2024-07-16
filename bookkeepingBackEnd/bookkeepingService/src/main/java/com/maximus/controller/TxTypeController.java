package com.maximus.controller;

import com.maximus.VO.TxTypeVO;
import com.maximus.dao.TxTypeDAO;
import com.maximus.entity.Result;
import com.maximus.entity.TxType;
import com.maximus.mapper.TxTypeMapper;
import com.maximus.service.TxTypeService;
import org.apache.dubbo.common.utils.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DuplicateKeyException;
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
    protected static Logger logger = LoggerFactory.getLogger(TxTypeController.class);

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
                txType.setKind(txTypeVO.getKind());
                int count = txTypeService.addType(txType);
                if (count == 1) {
                    return Result.success("插入成功");
                }
            } else {
                TxType txType = new TxType();
                TxType subTxType = new TxType();

                String name = txTypeVO.getName();
                Map<String, Object> map = new HashMap<>();
                map.put("name", name);
                List<TxType> txTypeList = txTypeMapper.selectByMap(map);

                if (txTypeList == null || txTypeList.isEmpty()) {
                    txType.setId(UUID.randomUUID().toString());
                    txType.setName(txTypeVO.getName());
                    txType.setIsLeaf(0);
                    txType.setKind(txTypeVO.getKind());

                    if (StringUtils.isNotEmpty(txTypeVO.getSubName())) {
                        subTxType.setId(UUID.randomUUID().toString());
                        subTxType.setFatherId(txType.getId());
                        subTxType.setName(txTypeVO.getSubName());
                        subTxType.setIsLeaf(1);
                        subTxType.setKind(txTypeVO.getKind());

                        try {
                            int count = txTypeDAO.addTxType(txType, subTxType);

                            if (count == 2) {
                                return Result.success("插入成功");
                            }
                        } catch (Exception e) {
                            logger.error("数据库异常", e);
                        }
                    } else {
                        int count = txTypeService.addType(txType);
                        if (count == 1) {
                            return Result.success("插入成功");
                        }
                    }
                } else {
                    subTxType.setId(UUID.randomUUID().toString());
                    subTxType.setFatherId(txType.getFatherId());
                    subTxType.setIsLeaf(1);
                    subTxType.setName(txTypeVO.getSubName());
                    subTxType.setKind(txTypeVO.getKind());
                    int count = txTypeService.addType(subTxType);
                    if (count == 1) {
                        return Result.success("插入成功");
                    }
                }
            }
        } catch (DuplicateKeyException dke) {
            logger.info("分类名称重复", dke);
            return Result.fail(2001, "分类名称重复");
        } catch (Exception e) {
            logger.info("系统异常", e);
            return Result.fail(2001, e.toString());
        }

        return null;
    }

    @PostMapping("getTxType")
    public Result getTxType(@RequestBody TxTypeVO txTypeVO) {
        Map<String, Object> map = new HashMap<>();
        if (txTypeVO.getIsLeaf() != null) {
            map.put("is_leaf", txTypeVO.getIsLeaf());
        }
        map.put("kind", txTypeVO.getKind());
        List<TxType> typeList = txTypeMapper.selectByMap(map);

        return Result.success(typeList);
    }
}
